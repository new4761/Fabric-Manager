import { EventEmitter } from "stream";

const { spawn } = require("child_process");
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";

class OSProcess {
  constructor() {}

  run(path: string, args: string[]) {
    var emitter = new EventEmitter();
    const child = spawn("minifab.cmd", args, {
      shell: true,
      cwd: path,
    });

    child.stdout.setEncoding('utf8');

    child.stdout.on("data", (data: any) => {
      console.log('stdout: ' + data.toString());
    });

    child.stderr.on("data", (data: any) => {
      console.log(`spawn stderr: ${data}`);
    });

    child.on("error", (code: any) => {
      console.log(`spawn error: ${code}`);
    });

    child.on("close", (code: any) => {
      console.log(`spawn child process closed with code ${code}`);
    });

    child.on("exit", (code: any) => {
      console.log(`spawn child process exited with code ${code}`);
    });
  }
}
export default new OSProcess();
