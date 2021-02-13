import OSProcess from "./OSProcess"
import { OsType, CCtype, CCstate } from "../models/EnvProject";
const path = require('path');
const process = require('process');
const isDevelopment = process.env.NODE_ENV !== "production"
import { DirBuilder } from "./DirBuilder"
import FileManager from "./FileManager"
import {ChainCode} from "../models/ChainCode";
import NetworkConfig from "../models/NetworkConfig";
class ChainCodeProcess {
    // call dirBuilder module
    dirBuilder = new DirBuilder()
    // private variable for set CC command
    private osType: OsType = OsType.WINDOW;

    testPath: any;
    constructor() {
        if (isDevelopment) {
            this.testPath = path.join(path.resolve(process.cwd()), "tests");
            //console.log(this.testPath);
        }
    }
    //get set function
    getOsType() {
        return this.osType
    }
    setOsType(_osType: OsType) {
        this.osType = _osType; 
    }
    // test function 
    async testFunction() {
        if (isDevelopment) {

            await OSProcess.run_new(this.testPath, ['netup'], this.osType);
            await OSProcess.run_new(this.testPath, ['create', '-c', 'testchannel'], this.osType);
            await OSProcess.run_new(this.testPath, ['join'], this.osType);
            await OSProcess.run_new(this.testPath, ['anchorupdate'], this.osType);
            await OSProcess.run_new(this.testPath, ['explorerup'], this.osType);
        }
    }

    async testClean() {
        if (isDevelopment) {
            //console.log("test clean");
            await OSProcess.run_new(this.testPath, ['cleanup'], this.osType);
        }
    }

    //end test
    // basic setup


     setupFolder(ccName: string, ccType: CCtype,srcPath:string): CCstate {
        let ccDir = ""
        console.log(srcPath + ":from ccSetup")
        if (isDevelopment) {
            ccDir = path.join(this.testPath, "vars", "chaincode", ccName, ccType)
        }
        else {
            //to do use project path for replace testPath
            ccDir = path.join(this.testPath, "vars", "chaincode", ccName, ccType)
        }
        this.dirBuilder.createDir_path(ccDir);
        return CCstate.setupDir

    }

    //  init command CC
     deployCC(ccName: string, cctype: CCtype, ccState: CCstate):CCstate {
        if (ccState == CCstate.setupDir) {
            let arg = [];
            //arg for call fabric command
            arg.push("install")
            // cc name
            arg.push("-n")
            arg.push(ccName)
            //cc language
            arg.push("-l")
            arg.push(cctype)
            //cc version
            //to do get env version from cc setting
            arg.push("-v")
            arg.push("1.0")
            if (isDevelopment) {
                OSProcess.run_new(this.testPath, arg, this.osType);
                return CCstate.installCC
            }
            else{
                OSProcess.run_new(this.testPath, arg, this.osType);
                return CCstate.installCC
            }
        }
        else {
            //console.log("pls setup dir")
            return ccState
        }
    }

     approve(ccState: CCstate): CCstate  {
        if (ccState == CCstate.installCC)
            if (isDevelopment) {
                return  OSProcess.run_new(this.testPath, ['approve'], this.osType).then(() => { return CCstate.approveCC });
            }
            else {
                console.log("pls install cc")
                return ccState
            }

    }
     commit(ccState: CCstate): CCstate {
        if (ccState == CCstate.approveCC) {
            if (isDevelopment) {
                return  OSProcess.run_new(this.testPath, ['commit'], this.osType).then(() => { return CCstate.commitCC });
            }
        } else {
            console.log("pls approve cc")
            return ccState
        }

    }

    //end setup

    /*
    chaincode:[]

    */
    // update networkConfig
    //define json obj path
    pathObj ="chain_codes"
    updateNetworkConfig(name:string,ccType:CCtype,ccState:CCstate){
    

    }
    initNetworkConfig(name:string,ccType:CCtype,directory:string){
        console.log("inti called")
        let cc = new ChainCode(1,name,ccType,directory)
        //console.log( NetworkConfig.getValue(this.pathObj))
        NetworkConfig.pushValueToArray(this.pathObj,cc)
       // NetworkConfig.updateNetworkConfig(this.pathObj,cc)
    }
    getNetworkConfig(id:string) {
        // to do  wait for env project file 

    }
    // user  command
    upGradeCC() {

    }
    init() {
        // to do write init condition
    }
    invoke() { }
    query() {
    }
    discover(ccName: string, cctype: CCtype, ccState: CCstate) {

        // get channel endorser 
        if (ccState == CCstate.readyCC) {
            let arg = [];
            //arg for call fabric command
            arg.push("discover")
            // cc name
            arg.push("-n")
            arg.push(ccName)
            //cc language
            arg.push("-l")
            arg.push(cctype)
            //cc version
            //to do get env version from cc setting
            if (isDevelopment) {
                OSProcess.run_new(this.testPath, arg, this.osType);
            }
        }
    }


}
export default new ChainCodeProcess();