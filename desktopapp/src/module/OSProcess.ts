const  { exec }  = require("child_process");

class OSProcess {
  constructor() {}
  testfunction(outputPath: string,command: string) {
   
    let netupCMD = "minifab netup -o org0.example.com";
    console.log(outputPath);
    console.log(netupCMD);
    exec(
      netupCMD,
      { cwd: outputPath },
      (error: any, data: any, getter: any) => {
        if (error) {
          console.log("error", error.message);
          return;
        }
        if (getter) {
          console.log("data", data);
          return;
        }
        console.log("data", data);
      }
    );
  }

}
export default new OSProcess();
