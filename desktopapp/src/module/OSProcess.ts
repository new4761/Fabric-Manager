const { spawn } = require("child_process");
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";

class OSProcess {
  constructor() {}

  run(path: string, args: string[]) {
    const child = spawn("minifab.cmd", args, {
      shell: true,
      cwd: path,
    });

    return child


  }
}
export default new OSProcess();
