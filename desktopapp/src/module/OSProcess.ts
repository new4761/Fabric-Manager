const { exec } = require("child_process");
const { spawn } = require('child_process');
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";

class OSProcess {
  constructor() {}

  run(path: string, args:string[]) {

    const dir = spawn('minifab.cmd',args, {shell: true,cwd: path });


    dir.stdout.on('data', (data: any) => {
      console.log(`${data}`);
    });
  
    dir.stderr.on('data', (data: any) => {
      console.log(`spawn stderr: ${data}`);
    });
  
    dir.on('error', (code: any) => {
      console.log(`spawn error: ${code}`);
    });
  
    dir.on('close', (code: any) => {
      console.log(`spawn child process closed with code ${code}`);
    });
  
    dir.on('exit', (code: any) => {
      console.log(`spawn child process exited with code ${code}`);
    });

  }
}
export default new OSProcess();
