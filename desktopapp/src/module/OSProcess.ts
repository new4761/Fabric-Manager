
import { OsType } from "../models/EnvProject";
const EventEmitter = require('events');
//const { spawn } = require("child_process");
const path = require("path");
const spawn = require('child-process-promise').spawn;
const isDevelopment = process.env.NODE_ENV !== "production";
class OSProcess {
  constructor() { }
  //default
  run(path: string, args: string[]): any {
    const child = spawn("minifab.cmd", args, {
      shell: true,
      cwd: path,
    });

    return child;

    // child.stdout.on("data", (data: any) => {
    //   this.emitter.emit("data", data.toString());
    // });

    // child.stderr.on("data", (data: any) => {
    //   this.emitter.emit("data", data.toString());
    // });
  }
  run_new(path: string, args: string[], type: OsType): any {
    let ls: any;

    switch (type) {

      case OsType.WINDOW:
        // console.log("spawn window bat")
        try {
          ls = spawn("minifabwin.bat", args, { cwd: path })
          this.callback(ls.childProcess);
          //this.callback(ls);
          // await ls
          return ls.then(() => { console.log('end run') })
            .finally(() => { return ls });
        }
        catch {
          console.log('child running');
          return null
        }
      case OsType.WSL:
        ls = spawn("minifab", args, { cwd: path });
        console.log('end run')
        return ls
    }
  }

  callback(ls: any) {
    ls.stdout.on('data', (data: any) => {
      data = data.toString();
      console.log(`${data}`);
    });

    ls.stderr.on('data', (data: any) => {
      data = data.toString();
      console.error(`stderr: ${data}`);
    });

    ls.on('close', (code: any) => {
      code = code.toString();
      console.log(`child process exited with code ${code}`);

    });

  }
}
export default new OSProcess();

