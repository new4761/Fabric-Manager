import OSProcess from "./OSProcess"
import { OsType, CCtype, CCstate } from "../models/EnvProject";
const path = require('path');
const process = require('process');
const isDevelopment = process.env.NODE_ENV !== "production"
import { DirBuilder } from "./DirBuilder"
import Uploader from "./Uploader"


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
    testCCgo() {
        if (isDevelopment) {
            // run test go Deploy with simple cc

        }
    }
    async testUpLoad() {
        if (isDevelopment) {
            console.log("CC go");
            let ccName = "testName";
            let ccType = "go";
            let ccDir = path.join(this.testPath, "vars", "chaincode", ccName, ccType)
            await this.dirBuilder.createDir_path(ccDir);
            Uploader.upLoadDir(ccDir).then((des: any) => console.log(des))
            //Uploader.upLoadFile(ccDir)
        }
    }
    //end test
    // basic setup
    getEnvSetting() {
        // to do  wait for env project file 

    }

    async setupFolder(ccName: string, ccType: CCtype): CCstate {
        let ccDir = ""
        if (isDevelopment) {
            ccDir = path.join(this.testPath, "vars", "chaincode", ccName, ccType)
        }
        else {
            //to do use project path for replace testPath
            ccDir = path.join(this.testPath, "vars", "chaincode", ccName, ccType)
        }
        this.dirBuilder.createDir_path(ccDir);
        return await Uploader.upLoadDir(ccDir)
            .then((des: any) => {
                //console.log(des)
                if (des != undefined) {
                    console.log(des)
                    return CCstate.setupDir
                }
                else {
                    console.log("get error");
                    return CCstate.unSetupCC
                }
            }).catch((err: any) => { console.log(err) })

    }

    //  init command CC
    async deployCC(ccName: string, cctype: CCtype, ccState: CCstate): CCstate {
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
                return await OSProcess.run_new(this.testPath, arg, this.osType).then(() => { return CCstate.installCC });
            }
        }
        else {
            console.log("pls setup dir")
            return ccState
        }
    }

    async approve(ccState: CCstate): CCstate {
        if (ccState == CCstate.installCC)
            if (isDevelopment) {
                return await OSProcess.run_new(this.testPath, ['approve'], this.osType).then(() => { return CCstate.approveCC });
            }
            else {
                console.log("pls install cc")
                return ccState
            }

    }
    async commit(ccState: CCstate): CCstate {
        if (ccState == CCstate.approveCC) {
            if (isDevelopment) {
                return await OSProcess.run_new(this.testPath, ['commit'], this.osType).then(() => { return CCstate.commitCC });
            }
        } else {
            console.log("pls approve cc")
            return ccState
        }

    }

    //end setup
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