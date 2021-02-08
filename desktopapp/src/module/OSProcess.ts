const { spawn } = require("child_process");
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";
const events = require("events");

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

    return child;

    // child.stdout.on("data", (data: any) => {
    //   this.emitter.emit("data", data.toString());
    // });

    // child.stderr.on("data", (data: any) => {
    //   this.emitter.emit("data", data.toString());
    // });
  }
}
export default new OSProcess();
