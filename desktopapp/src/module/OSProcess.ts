const { spawn } = require("child_process");

const spawnSync = require('child-process-promise').spawn;
 
import { OsType } from "../models/EnvProject";
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";
const events = require("events");
import logger from "../module/Logger";
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
    });
    logger.log("info", "OSProcess running: " + args + " at:" + path);
    return child;
  }

  run_new(path: string, args: string[], type: OsType): any {
    let ls: any;
    switch (type) {
      case OsType.WINDOW:
        try {
          ls = spawnSync("minifabwin.bat", args, {shell: true, cwd: path,capture: [ 'stdout', 'stderr' ] });
          logger.log("info", "OSProcess running Minifab Window: " + args + " at:" + path);
          this.callback(ls.childProcess); 
          return ls.then((res:any) => {
          
           // console.log(StdoutCapture.checkStatus(res.stdout.toString()));
              return StdoutCapture.checkStatus(res.stdout.toString())
            })
        } catch {
          //TODO: write return con
          console.log("child running");
          return null;
        }
      case OsType.WSL:
        ls = spawn("minifab", args, { shell: true,cwd: path });
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
}
export default new OSProcess();
