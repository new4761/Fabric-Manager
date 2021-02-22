import OSProcess from "./OSProcess"
import { OsType, CCtype, CCstate, netWorkConfigPath, ccOutputPayload } from "../models/EnvProject";
const path = require('path');
const process = require('process');
const isDevelopment = process.env.NODE_ENV !== "production"
import { DirBuilder } from "./DirBuilder"
import FileManager from "./FileManager"
import { ChainCode } from "../models/ChainCode";
import NetworkConfig from "../models/NetworkConfig";
import ArgsWrapper from "../models/ArgsWrapper";
import DockerProcess from "@/module/DockerProcess";
import { stdoutPayLoad } from "@/lib/payload-data";

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
            let org = "test3.test";
            // await OSProcess.run_new(this.testPath, ['netup', '-e', 'true'], this.osType);
            await OSProcess.run_new(this.testPath, ['netup', '-o', org, '-e', 'true'], this.osType);
            await OSProcess.run_new(this.testPath, ['create', '-c', 'testchannel'], this.osType);
            await OSProcess.run_new(this.testPath, ['join'], this.osType);
            await OSProcess.run_new(this.testPath, ['anchorupdate'], this.osType);
            await OSProcess.run_new(this.testPath, ['explorerup'], this.osType);
        }
    }

    async testClean() {
        if (isDevelopment) {
            //console.log("test clean");
            let org = "test3.test";
            await OSProcess.run_new(this.testPath, ['cleanup', '-o', org], this.osType);
        }
    }

    //end test
    // basic setup
    setupFolder(projectPath: string, ccObj: ChainCode): ChainCode {
        let ccDir = ""
        // console.log(srcPath + ":from ccSetup")
        try {
            if (isDevelopment) {
                ccDir = path.join(this.testPath, "vars", "chaincode", ccObj.name, ccObj.type)
            }
            else {
                //to do use project path for replace testPath
                ccDir = path.join(projectPath, "vars", "chaincode", ccObj.name, ccObj.type)
            }
            //this.dirBuilder.createDir_path(ccDir);
            FileManager.copyFilesDir(ccObj.directory, ccDir)
            ccObj.state = CCstate.setupDir;
            this.updateNetworkConfig(ccObj);
        }
        catch {
            //to doccObj
        }
        return ccObj

    }

    //  init command CC
    installCC(projectPath: string, ccObj: ChainCode): ChainCode {
        let args: any = [];
        args.push("install")
        args = ArgsWrapper.basicCCWrapper(args, ccObj)
        if (ccObj.state == CCstate.setupDir) {
            if (isDevelopment) {
                return OSProcess.run_new(this.testPath, args, this.osType).then(() => {
                    ccObj.state = CCstate.installCC;
                    return ccObj
                });
            }
            else {
                return OSProcess.run_new(projectPath, args, this.osType).then(() => {
                    ccObj.state = CCstate.installCC;
                    return ccObj
                });
            }
        }
        else {
            //console.log("pls setup dir")
            return ccObj
        }
    }

    approve(projectPath: string, ccObj: ChainCode): ChainCode {
        let args: any = [];
        args.push("approve")
        args = ArgsWrapper.basicCCWrapper(args, ccObj)
        if (ccObj.state == CCstate.installCC)
            if (isDevelopment) {
                return OSProcess.run_new(this.testPath, args, this.osType)
                    .then(() => {
                        ccObj.state = CCstate.approveCC;
                        this.updateNetworkConfig(ccObj);
                        return ccObj
                    });
            }
            else {
                //fix to real path

                return OSProcess.run_new(projectPath, args, this.osType)
                    .then(() => {
                        ccObj.state = CCstate.approveCC;
                        this.updateNetworkConfig(ccObj);
                        return ccObj
                    });
            }
        else {
            return ccObj
        }

    }
    commit(projectPath: string, ccObj: ChainCode): ChainCode {
        let args: any = [];
        args.push("commit")
        args = ArgsWrapper.basicCCWrapper(args, ccObj)
        if (ccObj.state == CCstate.approveCC) {
            if (isDevelopment) {
                return OSProcess.run_new(this.testPath, args, this.osType)
                    .then(() => {
                        ccObj.state = CCstate.commitCC;
                        this.updateNetworkConfig(ccObj);
                        return ccObj
                    });
            }
            else {
                //fix to real path
                return OSProcess.run_new(projectPath, args, this.osType)
                    .then(() => {
                        ccObj.state = CCstate.commitCC;
                        this.updateNetworkConfig(ccObj);
                        return ccObj
                    });
            }
        } else {
            //console.log("pls approve cc")
            return ccObj
        }
    }
    //end setup
    // updateNetworkConfig() {
    updateNetworkConfig(ccObj: ChainCode) {
        //console.log("from update")
        //console.log(ccObj)
        let target = NetworkConfig.getValue(netWorkConfigPath.ccPath).findIndex((res: ChainCode) => res.id == ccObj.id);
        //let target = NetworkConfig.getValue(netWorkConfigPath.ccPath).findIndex(res => res.id == 2 );
        // console.log(target)
        let path = netWorkConfigPath.ccPath + "." + target;
        //   console.log(path)
        // console.log(NetworkConfig.getValue(path))
        //  NetworkConfig.updateNetworkConfig(path,CCstate.setupDir);
        NetworkConfig.updateNetworkConfig(path, ccObj);

    }

    initNetworkConfig(name: string, ccType: CCtype, directory: string, channel: string): ChainCode {
        //  console.log("inti called")
        let id = NetworkConfig.getValue(netWorkConfigPath.ccPath);
        // console.log(id)
        let cc: ChainCode;
        if (id == undefined) {
            cc = new ChainCode(1, name, ccType, directory, channel)
        }
        else {
            let maxID = 0;
            id.forEach((res: ChainCode) => {
                if (res.id > maxID) maxID = res.id
            });
            cc = new ChainCode(maxID + 1, name, ccType, directory, channel)
        }
        NetworkConfig.pushValueToArray(netWorkConfigPath.ccPath, cc)
        return cc
    }
    getNetworkConfig(id: string) {
        // to do  wait for env project file 

    }
    async deployCCtoFabric(projectPath: string, ccObj: ChainCode, useInti: boolean, args: any) {
        ccObj = await this.setupFolder(projectPath, ccObj);
        ccObj = await this.installCC(projectPath, ccObj)
        ccObj = await this.approve(projectPath, ccObj)
        ccObj = await this.commit(projectPath, ccObj)
        if (useInti) {
            ccObj = await this.initCC(projectPath, ccObj, args)
        }
    }
    // user  command
    updateCC() {

    }
    initCC(projectPath: string, ccObj: ChainCode, ccArgs: any): ChainCode {
        let args: any = [];
        args = ["initialize"].concat(ArgsWrapper.basicCCWrapper(args, ccObj).concat(ArgsWrapper.argsCCWrapper(ccArgs)))

        //console.log(args)
        if (ccObj.state == CCstate.commitCC) {
            if (isDevelopment) {
                return OSProcess.run_new(this.testPath, args, this.osType)
                    .then(() => {
                        ccObj.state = CCstate.initCC;
                        this.updateNetworkConfig(ccObj);
                        return ccObj
                    });
            }
            else {
                //fix to real path
                return OSProcess.run_new(projectPath, args, this.osType)
                    .then(() => {
                        ccObj.state = CCstate.initCC;
                        this.updateNetworkConfig(ccObj);
                        return ccObj
                    });
            }
        } else {
            //console.log("pls approve cc")
            return ccObj
        }
    }
    //invoke group
    invoke(projectPath: string, ccObj: ChainCode, ccArgs: any, startTime: string) {
        let args: any = [];
        let output = new ccOutputPayload();
        args.push("invoke")
        args = ArgsWrapper.basicCCWrapper(args, ccObj).concat(ArgsWrapper.argsCCWrapper(ccArgs));
        if (ccObj.state == CCstate.initCC) {
            if (isDevelopment) {
                return OSProcess.run_new(this.testPath, args, this.osType)
                    .then(async (res: stdoutPayLoad) => {
                        //TODO write update Console 
                        let container = await this.findFirstEndorser(this.testPath)
                        output.rawData = await this.getCallBackData(container, startTime)
                        if (res.status) { output.fabricPayload = res.message }
                        else {
                            output.fabricPayload = res.message
                        }
                        output.response = this.getResponse(output.rawData, startTime)
                        return output
                        //  return output
                        // return res
                        // ccObj.state = CCstate.commitCC;
                        // this.updateNetworkConfig(ccObj);
                        // return ccObj
                    });
            }
            else {
                //fix to real path
                return OSProcess.run_new(projectPath, args, this.osType)
                    .then((res: any) => {
                        //TODO: testReal Case
                        let container = this.findFirstEndorser(projectPath)
                        this.getCallBackData(container, startTime)
                    });
            }
        } else {
            //console.log("pls approve cc")
            return output
        }

    }

    async findFirstEndorser(projectPath: string) {
        let sourceDir;
        if (isDevelopment) {
            sourceDir = path.join(path.resolve(process.cwd()), "tests", "vars", "run", "ccinvoke.sh");
        }
        else {
            sourceDir = path.join(path.resolve(projectPath), "tests", "vars", "run", "ccinvoke.sh");
        }

        let data = FileManager.readFile(sourceDir)
        //console.log(data)
        let name
        if (typeof data === 'string')
            name = this.getEndorserNameByRegex(data)
        return await DockerProcess.findFirstContainerByRegex("dev-" + name, "")


    }
    getEndorserNameByRegex(data: string) {
        let regex = /tlsRootCertFiles.\/[a-z1-9.A-Z]*\/[a-z1-9.A-Z]*\/[a-z1-9.A-Z]*\/[a-z1-9.A-Z]*\/[a-z1-9.A-Z]*\/([a-z1-9.A-Z]*)\//
        let name = data.match(regex);
        if (name != null) {
            return name[1].toString()
        }
        else {

            return false
        }
    }
    async getCallBackData(container: any, startTime: string) {
        startTime = startTime.replace(/T|Z/g, ".");
        startTime = startTime.slice(0, -7) + ".*UTC.*->.*\n";
        let regexStartTime = new RegExp(startTime, "gs")
        //console.log(regexStartTime)
        let res = await DockerProcess.callback(container);
        let message = res.match(regexStartTime);
        if (message != null) {
            console.log(message[0])
            //   startTime = startTime.slice(0, -20) + ".*UTC.*->.*";
            let regexAddNewline = /\n/gms
            message = message[0].replace(regexAddNewline, '\r\n');
            console.log(message)
            return message
        }
        else {

            return "Unknown Error from  CCCallBack"
        }


    }
    getResponse(data: string, startTime: string) {
        startTime = startTime.slice(0, -20) + ".*UTC.*->.*";
        let regexStartTime = new RegExp(startTime, "g")
        //console.log("regx:"+regexStartTime)
        //console.log(data)

        data = data.replace(regexStartTime, "");


        return data
    }
    // console.log(data)
    // if (message != null) {
    //     console.log(message.toString())
    // }
    // else {

    //     return "Unknown Error from  Minifabric"
    // }

    query(projectPath: string, ccObj: ChainCode, ccArgs: any) {
    }
    discover(projectPath: string, ccObj: ChainCode) {

        // // get channel endorser 
        // if (ccObj.state == CCstate.readyCC) {
        //     let args = [];
        //     args.push("discover")
        //     args = ArgsWrapper.basicCCWrapper(args, ccObj)
        //     //TODO:get env version from cc setting
        //     if (isDevelopment) {
        //         OSProcess.run_new(this.testPath, args, this.osType);
        //     }
        //     else {

        //         OSProcess.run_new(this.testPath, args, this.osType);
        //     }
        // }
    }

}

export default new ChainCodeProcess();