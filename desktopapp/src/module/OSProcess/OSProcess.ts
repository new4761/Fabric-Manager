const { spawn } = require("child_process");

const spawnSync = require("child-process-promise").spawn;
import store from "../../store/modules/project";
import storeProcess from "../../store";
import { strict } from "assert";
import { getProjectPath, OsType } from "../../models/EnvProject";
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";
const events = require("events");
import logger from "../Logger";
import ChainCodeProcess from "../ChainCode/ChainCodeProcess";
import DockerProcess from "../DockerProcess";
import FileManager from "../FileManager";
import StdoutCapture from "./StdoutCapture";
import { removeColorCode } from "./StringBuilder";
import ProjectConfig from "@/models/ProjectConfig";

class OSProcess {
  emitter: any;
  constructor() {
    this.emitter = new events();
  }

  run_new(args: string[], projectPath?: string): any {
    let ls: any;
    //set to minifab output
    if (projectPath == null) {
      projectPath = ProjectConfig.getPathResolve(store.state.id);
    }
    args.push("-f");
    args.push("minifab");
   // console.log(args);
        try {
          ls = spawnSync("minifab.cmd", args, {
            shell: true,
            cwd: projectPath,
            capture: ["stdout", "stderr"],
          });
          logger.log(
            "info",
            "OSProcess running Minifab Window: " + args + " at:" + path
          );
          storeProcess.commit("setProcess", ls.childProcess);
          // this.callback(ls.childProcess);
          return ls.then((res: any) => {
            //console.log(StdoutCapture.checkStatus(res.stdout.toString()));
            let result = StdoutCapture.checkStatus(res.stdout.toString());
            storeProcess.commit("setResult", result);
            return result;
          });
        } catch (error) {
          //TODO: write return con
          console.log("OSProcess error:"+(error));
          return null;
        }
  }
    //TODO:Override  for CC
    //to capture docker output for chainCode
    run_CC_output(args: string[],methodName: string,version: any): any {
      let ls: any;
      //set to minifab output
      let projectPath = getProjectPath()
      args.push("-f");
      args.push("minifab");
      let scriptFile = "cc" + methodName + ".sh";
      let sourceDir = path.join(projectPath, "vars", "run", scriptFile);
      FileManager.createFile(sourceDir);
          try {
            ls = spawnSync("minifab", args, {
              shell: true,
              cwd: projectPath,
              capture: ["stdout", "stderr"],
            });
            logger.log(
              "info",
              "OSProcess running Minifab Window: " + args + " at:" + projectPath
            );
            storeProcess.commit("setProcess", ls.childProcess);
            let payloadData: any[] = [];
            this.callbackCC(ls.childProcess, sourceDir, payloadData, version);
            let message: any[] = [];
            return ls.then((res: any) => {
              // console.log(payloadData)
              message.push(StdoutCapture.checkStatus(res.stdout.toString()));
              message.push(payloadData);
              return message;
            });
          } catch (error) {
            //TODO: write return con
            console.log("OSProcess error:"+(error));
            return null;
          }

    }
      callback(ls: any) {
        ls.stdout.on("data", (data: any) => {
          data = data.toString();
        //  console.log(`${removeColorCode(data)}`);
        });

        ls.stderr.on("data", (data: any) => {
          data = data.toString();
         // console.error(`stderr: ${data}`);
        });

        ls.on("close", (code: any) => {
          code = code.toString();
       //   console.log(`child process exited with code ${code}`);
        });
      }
      //TODO:Override  for CC
      //to capture docker output for chainCode
      callbackCC(ls: any, sourceDir: string, payloadData: any[], version: any) {
        let watcher = FileManager.WaitToReadFile(sourceDir);
        //  let sourceDir: string;
        let streamPipe: any;
        watcher.on("change", async function name(e: any) {
          watcher.close();
        });

        watcher.on("close", async function name() {
          let container = await ChainCodeProcess.findFirstEndorser(
            sourceDir,
            version
          );
          streamPipe = await DockerProcess.callbackAttach(container, payloadData);
          //  console.log("watcher die bitch")
        });
        ls.stderr.on("data", (data: any) => {
          data = data.toString();
         // console.error(`stderr: ${data}`);
        });
        ls.on("close", (code: any) => {
          code = code.toString();
          DockerProcess.killStreamPipe(streamPipe);

          //console.log(streamPipe[1]);
         // console.log(`child process exited with code ${code}`);
          return streamPipe[1];
        });
      }
    }
    export default new OSProcess();
