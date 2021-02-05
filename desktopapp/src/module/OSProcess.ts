import { spawnSync } from "child_process";
import { OsType } from "../models/EnvProject";

const { spawn } = require("child_process");
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";
class OSProcess {
  constructor() { }
  //default
  run(path: string, args: string[]): any {
    const child = spawn("minifab.cmd", args, {
      shell: true,
      cwd: path,
    });

    return child


  }
  // Run case with option 
  run_new(path: string, args: string[], type: OsType): any {
    switch (type) {
      case OsType.WINDOW:
       // console.log("spawn window bat")
       return spawn("minifabwin.bat", args, {cwd: path});
      // return spawn("minifabwin.bat", args, {   detached: true,stdio:  ['inherit', 'pipe', 'pipe'],cwd: path});
      case OsType.WSL:
        return spawn("minifab.cmd", args, { shell: true, cwd: path, });
    }
  }
}
export default new OSProcess();

