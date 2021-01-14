const yaml = require("js-yaml");
import { FileYamlBuilder } from "@/module/FileYamlBuilder";
import { YamlConfig } from "yaml-config";
import OrgData from "@/models/OrgData";
const isDevelopment = process.env.NODE_ENV !== "production";
const path = require("path");
import fs from "fs";
class SpecConfig extends FileYamlBuilder implements YamlConfig {
  fileName: string;
  orgList: OrgData[] = [];
  defaultOutputPath: string;
  CAList: string[] = [];
  peerList: string[] = [];
  orderers: string[] = [];
  setting: string[] = [];
  src: string = "";

  constructor() {
    super();
    this.fileName = "spec.yaml";
    this.defaultOutputPath = "bin";
  }
  createFile() {
    console.log("call createed");
    this.addOrdererOrg();
    this.cerateCAOrg();
    this.getCAList();
    this.getPeerList();
    let fabric = {
      cas: this.CAList,
      peers: this.peerList,
      orderers: this.orderers,
      settings:[
     {ca:"FABRIC_LOGGING_SPEC: DEBUG"},
     {peer:"FABRIC_LOGGING_SPEC: DEBUG"},
     {orderer:"FABRIC_LOGGING_SPEC: DEBUG"},
      ]
    };
    this.src = yaml.safeDump({ fabric: fabric });
    console.log(this.src);
    this.resetData();
  }

  saveFile(outputPath: string, inputFileData: string, fileName: string) {
    try {
      // // check dev mode function
      // // used this style for base to write function who work with files
      // console.log(this.src)
      let filePath = path.join(outputPath, fileName);
      fs.writeFileSync(filePath, inputFileData, "utf-8");
    } catch (e) {
      console.log(e);
    }
  }
  setUpFileStructure(outputPath: string) {
    let minifabFileName = "minifab.cmd";
    //let minifabFileName ="minifab"
    let minifabPath = path.join(
      process.cwd(),
      "src",
      "assets",
      "minifab",
      minifabFileName
    );
    //console.log(minifabPath);
    fs.copyFileSync(minifabPath, path.join(outputPath, minifabFileName));
    // fs.copyFile();
    this.saveFile(outputPath, this.src, this.fileName);
    //this.updateNetworkConfig(outputPath);
  }


  cerateCAOrg() {
    this.orgList.forEach((item) => {
      if (item.useCA == true) {
        item.addCA();
      }
    });
  }


  getCAList() {
    this.orgList.forEach((item) => {
      if (item.isOrderer == false) {
        this.CAList = this.CAList.concat(item.CAList);
      }
    });
  }


  getPeerList() {
    this.orgList.forEach((item) => {
      if (item.isOrderer == false) {
        // console.log(this.peerList);
        this.peerList = this.peerList.concat(item.peerList);
      }
    });
  }

  editFile() {


  }

  updateNetworkConfig() {


  }

  getUserInput() {


  }


  newOrg(name: string, isOrderer: boolean) {
    let data;
    data = new OrgData(name, isOrderer);
    this.orgList.push(data);
    return data;
  }

  checkOrgName(name: string): boolean {
    let bool: boolean = false;
    this.orgList.forEach((item) => {
      if (item.name === name) {
        bool = true;
      }
    });
    return bool;
  }
  switchOrgRole(target: OrgData) {
    if (target.isOrderer == true) {
      target.setToPeer();
    } else {
      target.setToOrderer();
    }
  }

  addOrdererOrg() {
    this.orgList.forEach((item) => {
      if (item.isOrderer == true) {
        this.orderers.push(
          "orderer" + (this.orderers.length + 1) + "." + item.name
        );
      }
    });
  }
  resetData() {
    this.orgList = [];
    this.CAList = [];
    this.peerList = [];
    this.orderers = [];

  }
  removeOrg(target: OrgData) {
    //     console.log("test Remove")
    this.orgList = this.orgList.filter((item) => item !== target);
  }

}
export default new SpecConfig();
