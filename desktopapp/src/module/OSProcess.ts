const { spawn } = require("child_process");

const spawnSync = require('child-process-promise').spawn;
import store from "../store/modules/project";
import storeProcess from "../store";
import { strict } from "assert";
import { OsType } from "../models/EnvProject";
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";
const events = require("events");
import logger from "../module/Logger";
import ChainCodeProcess from "./ChainCodeProcess";
import DockerProcess from "./DockerProcess";
import FileManager from "./FileManager";
import StdoutCapture from "./OSProcess/StdoutCapture";
import { removeColorCode } from "./StringBuilder";
import ProjectConfig from "@/models/ProjectConfig";


class OSProcess {
  emitter: any;
  constructor() {
    this.emitter = new events();
  }

  run(path: string, args: string[]) {
    const child = spawn("minifab.cmd", args, {
      shell: true,
      cwd: path,
      // stdio: "inherit",
    });
    logger.log("info", "OSProcess running: " + args + " at:" + path);
    return child;
  }
  run_new(args: string[], type: OsType): any {
    let ls: any;
    //set to minifab output
    let projectPath = ProjectConfig.getPathResolve(store.state.id);
    args.push("-f")
    args.push("minifab")
    switch (type) {
      case OsType.WINDOW:
        try {
          ls = spawnSync("minifab.cmd", args, { shell: true, cwd: projectPath, capture: ['stdout', 'stderr'] });
          logger.log("info", "OSProcess running Minifab Window: " + args + " at:" + path);
          storeProcess.commit("setProcess", ls.childProcess);
          // this.callback(ls.childProcess);
          return ls.then((res: any) => {

            //console.log(StdoutCapture.checkStatus(res.stdout.toString()));
            let result = StdoutCapture.checkStatus(res.stdout.toString())
            storeProcess.commit("setResult", result);
            return result
          })
        } catch {
          //TODO: write return con
          console.log("child running");
          return null;
        }
      case OsType.WSL:
        ls = spawn("minifab", args, { shell: true, cwd: path });
        console.log("end run");
        return ls;
    }
  }
  //TODO:Override  for CC
  //to capture docker output for chainCode
  run_CC_output( args: string[], type: OsType, methodName: string,version:any): any {
    let ls: any;
    //set to minifab output
    let projectPath = ProjectConfig.getPathResolve(store.state.id);
    args.push("-f")
    args.push("minifab")
    let scriptFile = "cc" + methodName + ".sh"
    let sourceDir = path.join(projectPath, "vars", "run", scriptFile)
    FileManager.createFile(sourceDir)
    switch (type) {
      case OsType.WINDOW:
        try {
          ls = spawnSync("minifab", args, { shell: true, cwd: projectPath, capture: ['stdout', 'stderr'] });
          logger.log("info", "OSProcess running Minifab Window: " + args + " at:" + projectPath);
          storeProcess.commit("setProcess", ls.childProcess);
          //console.log(sourceDir)
          // FileManager.createFile(sourceDir)
          // let watcher = FileManager.WaitToReadFile(sourceDir)
          //console.log(watcher)
          let payloadData: any[] = []
          this.callbackCC(ls.childProcess,sourceDir, payloadData,version);
          let message: any[] = []
          return ls.then((res: any) => {
            // console.log(payloadData)
            message.push(StdoutCapture.checkStatus(res.stdout.toString()))
            message.push(payloadData)
            return message
          })
        } catch {
          //TODO: write return con
          console.log("child running");
          return null;
        }

      case OsType.WSL:
        ls = spawn("minifab", args, { shell: true, cwd: path });
        console.log("end run");
        return ls;
    }
  }


  callback(ls: any) {
    ls.stdout.on("data", (data: any) => {

      data = data.toString();
      console.log(`${removeColorCode(data)}`);

    });

    ls.stderr.on("data", (data: any) => {

      data = data.toString();
      console.error(`stderr: ${data}`);

    });

    ls.on("close", (code: any) => {
      code = code.toString();
      console.log(`child process exited with code ${code}`);
    });
  }
  //TODO:Override  for CC
  //to capture docker output for chainCode
  callbackCC(ls: any,sourceDir:string,payloadData: any[],version:any) {
    let watcher = FileManager.WaitToReadFile(sourceDir)
    //  let sourceDir: string;
    let streamPipe: any
    watcher.on('change', async function name(e: any) {
      watcher.close()
    });

    watcher.on('close', async function name() {
      let container = await ChainCodeProcess.findFirstEndorser(sourceDir,version)
      streamPipe = await DockerProcess.callbackAttach(container, payloadData)
      //  console.log("watcher die bitch")
    });

    // ls.stdout.on("data", async (data: any) => {      //  const regex = new RegExp(/changed: \[minifab]*/);
    //   data = data.toString();
    //   console.log(`${removeColorCode(data)}`);
    // });
    
    ls.stderr.on("data", (data: any) => {
      data = data.toString();
      console.error(`stderr: ${data}`);
    });
    // //end pipe
    // streamPipe.on('end', function () {
    //   console.log("from stream Pipe die bitch");
    // });
    ls.on("close", (code: any) => {

      code = code.toString();
      DockerProcess.killStreamPipe(streamPipe)

      //console.log(streamPipe[1]);
      console.log(`child process exited with code ${code}`);
      return streamPipe[1]
    });
  }
}
export default new OSProcess();
