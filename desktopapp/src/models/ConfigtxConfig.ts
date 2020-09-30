// Class for create configtx,yaml for NetworkConfig
const yaml = require('js-yaml');
import { YamlConfig } from "yaml-config";
import {FileYamlBuilder} from "../module/FileYamlBuilder"
class ConfigtxConfig extends FileYamlBuilder implements YamlConfig {
    //**********************************
    // variable for export file 
    fileName:string;
    defaultOutputPath:string;

    //****************************************
    // self class variable

    constructor () {
        super();
        this.fileName = "configtx.yaml";
        this.defaultOutputPath = "bin"
    }
    getUserInput(){}
    createFile(){}
    editFile(){}
    updateNetworkConfig(){}
}
// default data for yaml file 
class Capabilities {
}
