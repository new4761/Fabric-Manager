import OSProcess from "./OSProcess";
import {
  OsType,
  CCtype,
  CCstate,
  netWorkConfigPath,
  ccOutputPayload,
} from "../models/EnvProject";
const path = require("path");
const process = require("process");
const isDevelopment = process.env.NODE_ENV !== "production";
import { DirBuilder } from "./DirBuilder";
import FileManager from "./FileManager";
import ChainCode from "../models/ChainCode";
import NetworkConfig from "../models/NetworkConfig";
import ArgsWrapper from "../models/ArgsWrapper";
import DockerProcess from "@/module/DockerProcess";
import store from "../store/modules/project";
import ProjectConfig from "@/models/ProjectConfig";

class ChainCodeProcess {
  // call dirBuilder module
  dirBuilder = new DirBuilder();
  // private variable for set CC command
  private osType: OsType = OsType.WINDOW;

  constructor() {}
  //get set function
  getOsType() {
    return this.osType;
  }
  setOsType(_osType: OsType) {
    this.osType = _osType;
  }
  // test function
  async testFunction() {
    if (isDevelopment) {
      //  let org = "test3.test";
      let org = "org1.example.com";
      // await OSProcess.run_new(this.testPath, ['netup', '-e', 'true'], this.osType);
      await OSProcess.run_new(["netup", "-o", org, "-e", "true"], this.osType);
      await OSProcess.run_new(["create", "-c", "testchannel"], this.osType);
      await OSProcess.run_new(["join"], this.osType);
      await OSProcess.run_new(["anchorupdate"], this.osType);
      await OSProcess.run_new(["explorerup"], this.osType);
    }
  }
  getPath() {
    return ProjectConfig.getPathResolve(store.state.id);
  }
  async testClean() {
    if (isDevelopment) {
      let org = "org1.example.com";
      await OSProcess.run_new(["cleanup", "-o", org], this.osType);
    }
  }

  //end test
  // basic setup
  setupFolder(ccObj: ChainCode): ChainCode {
    let ccDir = "";
    let projectPath = this.getPath();
    // console.log(srcPath + ":from ccSetup")
    try {
      //to do use project path for replace testPath
      ccDir = path.join(
        projectPath,
        "vars",
        "chaincode",
        ccObj.name,
        ccObj.type
      );
      //this.dirBuilder.createDir_path(ccDir);
      FileManager.copyFilesDir(ccObj.directory, ccDir);
      ccObj.state = CCstate.setupDir;
      this.updateNetworkConfig(ccObj);
    } catch {
      //to doccObj
    }
    return ccObj;
  }
  upDateFolder(ccObj: ChainCode): ChainCode {
    let ccDir = "";
    // console.log(srcPath + ":from ccSetup")
    let projectPath = this.getPath();
    try {
      //to do use project path for replace testPath
      ccDir = path.join(
        projectPath,
        "vars",
        "chaincode",
        ccObj.name,
        ccObj.type
      );

      //this.dirBuilder.createDir_path(ccDir);
      // FileManager.removeDir(ccDir)
      FileManager.copyFilesDir(ccObj.directory, ccDir);
      ///FileManager.copyFilesDir(ccObj.directory, ccDir)
      ccObj.state = CCstate.setupDir;
      this.updateNetworkConfig(ccObj);
    } catch {
      //to doccObj
    }
    return ccObj;
  }

  //  init command CC
  installCC(ccObj: ChainCode, org: string): ChainCode {
    let args: any = [];
    //  let projectPath = this.getPath()
    args.push("install");
    args = ArgsWrapper.basicCCWrapper(args, ccObj, org);
    if (ccObj.state == CCstate.setupDir) {
      return OSProcess.run_new(args, this.osType).then(() => {
        ccObj.state = CCstate.installCC;
        return ccObj;
      });
    } else {
      //console.log("pls setup dir")
      return ccObj;
    }
  }

  approve(ccObj: ChainCode, org: string): ChainCode {
    let args: any = [];
    args.push("approve");
    //   let projectPath = this.getPath()
    args = ArgsWrapper.basicCCWrapper(args, ccObj, org);
    if (ccObj.state == CCstate.installCC)
      return OSProcess.run_new(args, this.osType).then(() => {
        ccObj.state = CCstate.approveCC;
        this.updateNetworkConfig(ccObj);
        return ccObj;
      });
    else {
      return ccObj;
    }
  }
  commit(ccObj: ChainCode, org: string): ChainCode {
    //   let projectPath = this.getPath()
    let args: any = [];
    args.push("commit");
    args = ArgsWrapper.basicCCWrapper(args, ccObj, org);
    if (ccObj.state == CCstate.approveCC) {
      return OSProcess.run_new(args, this.osType).then(() => {
        ccObj.state = CCstate.commitCC;
        this.updateNetworkConfig(ccObj);
        return ccObj;
      });
    } else {
      //console.log("pls approve cc")
      return ccObj;
    }
  }
  //end setup
  // updateNetworkConfig() {
  updateNetworkConfig(ccObj: ChainCode) {
    //console.log("from update")
    //console.log(ccObj)
    let target = NetworkConfig.getValue(netWorkConfigPath.ccPath).findIndex(
      (res: ChainCode) => res.id == ccObj.id
    );
    //let target = NetworkConfig.getValue(netWorkConfigPath.ccPath).findIndex(res => res.id == 2 );
    // console.log(target)
    let path = netWorkConfigPath.ccPath + "." + target;
    //   console.log(path)
    // console.log(NetworkConfig.getValue(path))
    //  NetworkConfig.updateNetworkConfig(path,CCstate.setupDir);
    NetworkConfig.updateNetworkConfig(path, ccObj);
  }

  initNetworkConfig(
    name: string,
    ccType: CCtype,
    directory: string,
    channel: string
  ): ChainCode {
    //  console.log("inti called")
    let id = NetworkConfig.getValue(netWorkConfigPath.ccPath);
    // console.log(id)
    let cc: ChainCode;
    if (id == undefined) {
      cc = new ChainCode(1, name, ccType, directory, channel);
    } else {
      let maxID = 0;
      id.forEach((res: ChainCode) => {
        if (res.id > maxID) maxID = res.id;
      });
      cc = new ChainCode(maxID + 1, name, ccType, directory, channel);
    }
    NetworkConfig.pushValueToArray(netWorkConfigPath.ccPath, cc);
    return cc;
  }
  getNetworkConfig(id: string) {
    // to do  wait for env project file
  }
  async deployCCtoFabric(
    ccObj: ChainCode,
    useInti: boolean,
    args: any,
    org: string
  ) {
    ccObj = await this.setupFolder(ccObj);
    ccObj = await this.installCC(ccObj, org);
    ccObj = await this.approve(ccObj, org);
    ccObj = await this.commit(ccObj, org);
    if (useInti) {
      ccObj.useInit = true;
      this.setInitArgs(ccObj, args);
      ccObj = await this.initCC(ccObj, args, org);
    }
  }
  // user  command
  async updateCCtoFabric(ccObj: any, org: string) {
    this.setDate(ccObj);
    this.updateVersion(ccObj);
    // console.log(ccObj)
    ccObj = await this.upDateFolder(ccObj);
    ccObj = await this.installCC(ccObj, org);
    ccObj = await this.approve(ccObj, org);
    ccObj = await this.commit(ccObj, org);
    if (ccObj.useInit == true) {
      ccObj = await this.initCC(ccObj, ccObj.initArgs, org);
    }
  }
  setInitArgs(ccObj: ChainCode, args: any) {
    ccObj.initArgs = args;
  }
  setDate(ccObj: ChainCode) {
    ccObj.lastUpdate = +new Date();
  }
  updateVersion(ccObj: ChainCode) {
    ccObj.version += 1.0;
  }
  initCC(ccObj: ChainCode, ccArgs: any, org: string): ChainCode {
    let args: any = [];
    let projectPath = this.getPath();
    args = ["initialize"].concat(
      ArgsWrapper.basicCCWrapper(args, ccObj, org).concat(
        ArgsWrapper.argsCCWrapper(ccArgs)
      )
    );
    //console.log(args)
    if (ccObj.state == CCstate.commitCC) {
      return OSProcess.run_new(args, this.osType).then(() => {
        ccObj.state = CCstate.initCC;
        this.updateNetworkConfig(ccObj);
        return ccObj;
      });
    } else {
      //console.log("pls approve cc")
      return ccObj;
    }
  }

  callCC_command(ccObj: any, ccArgs: any, command: string, org: string) {
    let args: any = [];

    args.push(command);
    args = ArgsWrapper.basicCCWrapper(args, ccObj, org).concat(
      ArgsWrapper.argsCCWrapper(ccArgs)
    );
    //if (ccObj.state == CCstate.initCC) {
    return OSProcess.run_CC_output(
      args,
      this.osType,
      command,
      ccObj.version
    ).then((res: any[]) => {
      return this.getCallBackData(res);
    });
  }

  async findFirstEndorser(projectPath: string, version: any) {
    //console.log(projectPath)
    let data = await FileManager.readFile(projectPath);
    //console.log(data)
    let endorser = this.getEndorserNameByRegex(data);
    let CCname = this.getCCNameByRegex(data);
    return await DockerProcess.findFirstContainerByRegex(
      "dev-" + endorser + "-" + CCname + "_" + version,
      ""
    );
  }
  getEndorserNameByRegex(data: string) {
    let regex = /tlsRootCertFiles.\/[a-z1-9.A-Z]*\/[a-z1-9.A-Z]*\/[a-z1-9.A-Z]*\/[a-z1-9.A-Z]*\/[a-z1-9.A-Z]*\/([a-z1-9.A-Z]*)\//;
    let name = data.match(regex);
    if (name != null) {
      return name[1].toString();
    } else {
      return false;
    }
  }
  getCCNameByRegex(data: string) {
    let regex = /-n.([\S]*)/;
    let name = data.match(regex);
    if (name != null) {
      return name[1].toString();
    } else {
      return false;
    }
  }
  getCallBackData(payload: any) {
    //console.log(payload)
    let output = new ccOutputPayload();
    output.rawData = payload[1];
    output.fabricPayload = payload[0].message;
    output.response = this.getResponse(output.rawData);
    return output;
  }
  getResponse(data: Array<string>) {
    // startTime = startTime.replace(/T|Z/g, ".");
    // startTime = startTime.slice(0, -20) + ".*UTC.*->.*";
    //  let regexStartTime = new RegExp(startTime)
    let regexStartTime = new RegExp(".*UTC.*->.*");
    //console.log("regx:" + regexStartTime)
    //console.log(data)
    let newData: Array<string> = [];
    data.forEach((res: any, index: number) => {
      //  console.log("from " + index + ":" + regexStartTime.test(res))
      if (!regexStartTime.test(res)) {
        //newData.splice(index,1)
        newData.push(res);
        //console.log(data)
      }
    });
    // data = data.replace(regexStartTime, "");
    return newData;
  }

  discover(ccObj: ChainCode) {
    // // get channel endorser
    // if (ccObj.state == CCstate.readyCC) {
    //     let args = [];
    //     args.push("discover")
    //     args = ArgsWrapper.basicCCWrapper(args, ccObj,org)
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
