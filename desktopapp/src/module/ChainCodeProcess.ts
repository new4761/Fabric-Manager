import OSProcess from "./OSProcess"
import { OsType } from "../models/EnvProject";
const path = require('path');
const process = require('process');
const isDevelopment = process.env.NODE_ENV !== "production"

const { Readable } = require('stream')



class ChainCodeProcess {


    testPath: any;
    constructor() {
        if (isDevelopment) {
            this.testPath = path.join(path.resolve(process.cwd()), "tests");
            //console.log(this.testPath);
        }
    }
    // test function 
    testFunction() {
        if (isDevelopment) {
            console.log("test ChainCode");
            //console.log(path.dirname(__dirname))
            //let testPath = path.resolve(process.cwd());
            //testPath = path.join(testPath, "tests");
            //console.log(testPath, "tests");
            //let ls = OSProcess.run_new(this.testPath, ['netup'], OsType.WINDOW);
            let ls = OSProcess.run_new(this.testPath, ['netup'], OsType.WINDOW);
           
            this.callback(ls);
            // pro.stdout.on('data', function (data:any) {
            // console.log(data.toString());
            //});

        }
        //   console.log("testCalled");

    }
     callback(ls:any){
        //readable.setEncoding('utf8');
       ls.stdout.on('data', (data:any) => {
        process.stdout.write(data.toString());
                });
     console.log(process.stdout)
        
    }
    // callback(ls: any) {
        
    //      ls.stdout.on('data', (data:any) => {
    //         data = data.toString();
    //         console.log(`stdout: ${data}`);
    //     });

    //     ls.stderr.on('data', (data:any) => {
    //         data = data.toString();
    //         console.error(`stderr: ${data}`);
    //     });

    //     ls.on('close', (code:any) => {
    //          data = data.toString();
    //         console.log(`child process exited with code ${code}`);
    //     });
    
    //   }
    testClean() {
        if (isDevelopment) {
            console.log("test clean");
            let ls = OSProcess.run_new(this.testPath, ['cleanup'], OsType.WINDOW);
            //console.log(ls.output);
           this.callback(ls);
        }
    }
    //end test
    // basic setup
    getEnvSetting() { }
    setupFolder() { }

    // user command CC
    deployCC() {

    }
    approve() { }
    commit() { }
    init() { }
    invoke() { }
    query() {
    }
    discover() {
    }

}
export default new ChainCodeProcess();