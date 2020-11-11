const { exec } = require('child_process');
const path = require('path');
const process = require('process');

class OSProcess {
    constructor() {

    }
    testfunction(outputPath:string) {
    let netupCMD = "minifab netup -o orgDefault"
    //let netupCMD = "wsl ./minifab netup -o orgDefault"
    
    //  outputPath =outputPath.replace(/\\/g, "/");
        console.log(outputPath);
       // process.chdir(outputPath);
        exec(netupCMD,{cwd:outputPath}, (error:any, data:any, getter:any) => {
            if(error){
                console.log("error",error.message);
                return;
            }
            if(getter){
                console.log("data",data);
                return;
            }
            console.log("data",data);
        
        });
         
    }
}
export default new OSProcess();

