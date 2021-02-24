const { spawn } = require("child_process");

const spawnSync = require('child-process-promise').spawn;

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
  run_new(path: string, args: string[], type: OsType): any {
    let ls: any;
    //set to minifab output
    args.push("-f")
    args.push("minifab")
    switch (type) {
      case OsType.WINDOW:
        try {
          ls = spawnSync("minifabwin.bat", args, { shell: true, cwd: path, capture: ['stdout', 'stderr'] });
          logger.log("info", "OSProcess running Minifab Window: " + args + " at:" + path);
          this.callback(ls.childProcess);
          return ls.then((res: any) => {

            // console.log(StdoutCapture.checkStatus(res.stdout.toString()));
            return StdoutCapture.checkStatus(res.stdout.toString())
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
  run_CC_output(projectPath: string, args: string[], type: OsType, methodName: string,version:any): any {
    let ls: any;
    //set to minifab output
    args.push("-f")
    args.push("minifab")
    let scriptFile = "cc" + methodName + ".sh"
    switch (type) {
      case OsType.WINDOW:
        try {
          ls = spawnSync("minifabwin.bat", args, { shell: true, cwd: projectPath, capture: ['stdout', 'stderr'] });
          logger.log("info", "OSProcess running Minifab Window: " + args + " at:" + projectPath);
          let sourceDir = path
          if (isDevelopment) {
            sourceDir = path.join(path.resolve(process.cwd()), "tests", "vars", "run", scriptFile)
          }
          else {
            //TODO :real path
            sourceDir = path.join(path.resolve(projectPath), "tests", "vars", "run", scriptFile)
          }
          let watcher = FileManager.WaitToReadFile(sourceDir)
          let payloadData: any[] = []
          this.callbackCC(ls.childProcess, sourceDir, watcher, payloadData,version);
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
  callbackCC(ls: any, projectPath: string, watcher: any, payloadData: any[],version:any) {
    //  let sourceDir: string;
    let streamPipe: any
    watcher.on('change', async function name(e: any) {
      watcher.close()
    });

    watcher.on('close', async function name() {
      let container = await ChainCodeProcess.findFirstEndorser(projectPath,version)
      streamPipe = await DockerProcess.callbackAttach(container, payloadData)
      //  console.log("watcher die bitch")
    });
    ls.stdout.on("data", async (data: any) => {      //  const regex = new RegExp(/changed: \[minifab]*/);
      data = data.toString();
      console.log(`${removeColorCode(data)}`);
    });
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
