import OSProcess from "./OSProcess"
import { OsType, CCtype, CCstate, netWorkConfigPath } from "../models/EnvProject";
const path = require('path');
const process = require('process');
const isDevelopment = process.env.NODE_ENV !== "production"
import { DirBuilder } from "./DirBuilder"
import FileManager from "./FileManager"
import { ChainCode } from "../models/ChainCode";
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


    setupFolder(ccObj: ChainCode):ChainCode {
     // console.log("setupcalled")
        let ccDir = ""
       // console.log(srcPath + ":from ccSetup")
        try {
            if (isDevelopment) {
                ccDir = path.join(this.testPath, "vars", "chaincode", ccObj.name, ccObj.type)
            }
            else {
                //to do use project path for replace testPath
                ccDir = path.join(this.testPath, "vars", "chaincode", ccObj.name, ccObj.type)
            }
            //this.dirBuilder.createDir_path(ccDir);
            //FileManager.copyFilesDir(ccObj.directory,ccDir)
         
        }
        catch {
            //to doccObj
        }
        ccObj.state = CCstate.setupDir;
        this.updateNetworkConfig(ccObj)
        return ccObj

    }

    //  init command CC
    installCC(projectPath: string, ccObj: ChainCode): CCstate {
        if (ccObj.state == CCstate.setupDir) {
            let arg = [];
            //arg for call fabric command
            arg.push("install")
            // cc name
            arg.push("-n")
            arg.push(ccObj.name)
            //cc language
            arg.push("-l")
            arg.push(ccObj.type)
            //cc version
            //to do get env version from cc setting
            arg.push("-v")
            arg.push("1.0")
            if (isDevelopment) {
                OSProcess.run_new(this.testPath, arg, this.osType);
                return CCstate.installCC
            }
            else {
                OSProcess.run_new(projectPath, arg, this.osType);
                return CCstate.installCC
            }
        }
        else {
            //console.log("pls setup dir")
            return ccObj.state
        }
    }

    approve(projectPath: string, ccObj: ChainCode): CCstate {
        if (ccObj.state == CCstate.installCC)
            if (isDevelopment) {
                return OSProcess.run_new(this.testPath, ['approve'], this.osType).then(() => { return CCstate.approveCC });
            }
            else {
                //fix to real path
                return OSProcess.run_new(projectPath, ['approve'], this.osType).then(() => { return CCstate.approveCC });
            }
        else {
            return ccObj.state
        }

    }
    commit(projectPath: string, ccObj: ChainCode): CCstate {
        if (ccObj.state == CCstate.approveCC) {
            if (isDevelopment) {
                return OSProcess.run_new(this.testPath, ['commit'], this.osType).then(() => { return CCstate.commitCC });
            }
            else {
                //fix to real path
                return OSProcess.run_new(projectPath, ['commit'], this.osType).then(() => { return CCstate.approveCC });
            }
        } else {
            console.log("pls approve cc")
            return ccObj.state
        }
    }
    //end setup
   // updateNetworkConfig() {
   updateNetworkConfig(ccObj:ChainCode) {
    console.log("from update")
    console.log(ccObj)
       let target = NetworkConfig.getValue(netWorkConfigPath.ccPath).findIndex(res => res.id == ccObj.id );
       //let target = NetworkConfig.getValue(netWorkConfigPath.ccPath).findIndex(res => res.id == 2 );
       console.log(target)
       let path = netWorkConfigPath.ccPath +"."+target;
    
         console.log(path)
       console.log(NetworkConfig.getValue(path))
    //  NetworkConfig.updateNetworkConfig(path,CCstate.setupDir);
       NetworkConfig.updateNetworkConfig(path, ccObj);

    }

    initNetworkConfig(name: string, ccType: CCtype, directory: string): ChainCode {
        //  console.log("inti called")
        let id = NetworkConfig.getValue(netWorkConfigPath.ccPath);
        // console.log(id)
        let cc: ChainCode;
        if (id == undefined) {
            cc = new ChainCode(1, name, ccType, directory)
        }
        else {
            let maxID = 0;
            id.forEach((res: ChainCode) => {
                if (res.id > maxID) maxID = res.id
            });
            cc = new ChainCode(maxID + 1, name, ccType, directory)
        }
        NetworkConfig.pushValueToArray(netWorkConfigPath.ccPath, cc)
        return cc
    }
    getNetworkConfig(id: string) {
        // to do  wait for env project file 

    }
    deployCCtoFabric(projectPath: string, ccObj: ChainCode) {
        this.setupFolder(ccObj)
    }
    // user  command
    updateCC() {

    }
    init() {
        // to do write init condition
    }
    invoke() { }
    query() {
    }
    discover(projectPath: string, ccObj: ChainCode) {

        // get channel endorser 
        if (ccObj.state == CCstate.readyCC) {
            let arg = [];
            //arg for call fabric command
            arg.push("discover")
            // cc name
            arg.push("-n")
            arg.push(ccObj.name)
            //cc language
            arg.push("-l")
            arg.push(ccObj.type)
            //cc version
            //to do get env version from cc setting
            if (isDevelopment) {
                OSProcess.run_new(this.testPath, arg, this.osType);
            }
            else {

                OSProcess.run_new(this.testPath, arg, this.osType);
            }
        }
    }


}
export default new ChainCodeProcess();