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
    upDateFolder(projectPath: string, ccObj: ChainCode): ChainCode {
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
            // FileManager.removeDir(ccDir)
            FileManager.copyFilesDir(ccObj.directory, ccDir)
            ///FileManager.copyFilesDir(ccObj.directory, ccDir)
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
            ccObj.useInit = true
            ccObj = await this.initCC(projectPath, ccObj, args)
        }
    }
    // user  command
    async updateCCtoFabric(projectPath: string, ccObj: ChainCode, args: any) {
        console.log("updateCCtoFabric")
        ccObj.version += 1.0;
        ccObj = await this.upDateFolder(projectPath, ccObj);
        ccObj = await this.installCC(projectPath, ccObj)
        ccObj = await this.approve(projectPath, ccObj)
        ccObj = await this.commit(projectPath, ccObj)
        if (ccObj.useInit == true) {
            ccObj = await this.initCC(projectPath, ccObj, args)
        }
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


    callCC_command(projectPath: string, ccObj: ChainCode, ccArgs: any, command: string) {
        let args: any = [];

        args.push(command)
        args = ArgsWrapper.basicCCWrapper(args, ccObj).concat(ArgsWrapper.argsCCWrapper(ccArgs));
        //if (ccObj.state == CCstate.initCC) {
        if (isDevelopment) {
            // setTimeout(() => {
            //   }, 1000);
            // let startTime = new Date(Date.now()).toISOString()
            return OSProcess.run_CC_output(this.testPath, args, this.osType, command,ccObj.version)
                .then((res: any[]) => {
                    //TODO write update Console 
                    // output.rawData = res[1]
                    // output.fabricPayload = res[0].message
                    // output.response = this.getResponse(output.rawData)
                    return this.getCallBackData(res)
                }

                )
        }
        else {
            //fix to real path
            return OSProcess.run_new(projectPath, args, this.osType)
                .then((res: any) => {
                    //TODO: testReal Case
                    // let container = this.findFirstEndorser(projectPath)

                    //this.getCallBackData(container)
                });
        }
    }



    async findFirstEndorser(projectPath: string,version:any) {
        //console.log(projectPath)
        let data = await FileManager.readFile(projectPath)
        //console.log(data)
        let endorser = this.getEndorserNameByRegex(data)
        let CCname = this.getCCNameByRegex(data)
        return await DockerProcess.findFirstContainerByRegex("dev-" + endorser + "-" + CCname+"_"+version, "")

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
    getCCNameByRegex(data: string) {
        let regex = /-n.([\S]*)/
        let name = data.match(regex);
        if (name != null) {
            return name[1].toString()
        }
        else {

            return false
        }
    }
    getCallBackData(payload: any) {
        //console.log(payload)
        let output = new ccOutputPayload();
        output.rawData = payload[1]
        output.fabricPayload = payload[0].message
        output.response = this.getResponse(output.rawData)
        return output
    }
    getResponse(data: Array<string>) {
        // startTime = startTime.replace(/T|Z/g, ".");
        // startTime = startTime.slice(0, -20) + ".*UTC.*->.*";
        //  let regexStartTime = new RegExp(startTime)
        let regexStartTime = new RegExp(".*UTC.*->.*")
        //console.log("regx:" + regexStartTime)
        //console.log(data)
        let newData: Array<string> = []
        data.forEach((res: any, index: number) => {
            //  console.log("from " + index + ":" + regexStartTime.test(res))
            if (!regexStartTime.test(res)) {
                //newData.splice(index,1)
                newData.push(res)
                //console.log(data)
            }
        })
        // data = data.replace(regexStartTime, "");
        return newData
    }
    // console.log(data)
    // if (message != null) {
    //     console.log(message.toString())
    // }
    // else {

    //     return "Unknown Error from  Minifabric"
    // }

    // query(projectPath: string, ccObj: ChainCode, ccArgs: any) {
    // }
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