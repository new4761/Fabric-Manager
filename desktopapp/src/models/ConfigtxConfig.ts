// Class for create configtx,yaml for NetworkConfig
const yaml = require('js-yaml');
import { YamlConfig } from "yaml-config";
import { FileYamlBuilder } from "../module/FileYamlBuilder"
class ConfigtxConfig extends FileYamlBuilder implements YamlConfig {
    //**********************************
    // variable for export file 
    fileName: string;
    defaultOutputPath: string;
    //****************************************
    // self class variable
    testData = {
        Name:"sad",
        SkipiAsForeign: false,
        ID: "asad",
        MSPDir: "msp"
    }
    Organization = [this.testData,this.testData];
    constructor() {
        super();
        this.fileName = "configtx.yaml";
        this.defaultOutputPath = "bin"
    }
    getUserInput() { }
    createFile() {
        let src = "\n # This file is Generate from YamlClass \n";
 //       src += yaml.safeDump({"sas":this.Organization})
        src += yaml.safeDump({"Channle":this.Organization})     
         
 this.saveFile(this.defaultOutputPath, src, this.fileName);
    }
    editFile() { }
    updateNetworkConfig() { }
}
// default data for yaml file
class  ChannelCapabilities {
  constructor(version:string,value:boolean){
  }
}
export default new ConfigtxConfig();
