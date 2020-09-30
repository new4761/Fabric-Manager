
// Class for create Config.yaml for Ca Sererver Config
// type of ca = root TLS | CA / intermediate CA
import fs from 'fs';
//import YAML from 'yaml';
const path = require('path');
const Database = require('better-sqlite3');
const yaml = require('js-yaml');
// check is  isDevelopment?
const isDevelopment = process.env.NODE_ENV !== 'production'
import { YamlConfig } from "yaml-config";

class ConfigtxConfig implements YamlConfig {
    //**********************************
    // variable for export file 
    fileName:string;
    defaultOutputPath:string;

    //****************************************
    // self class variable

    constructor () {
        this.fileName = "configtx.yaml";
        this.defaultOutputPath = "bin"
    }
    getUserInput(){}
    createFile(){}
    saveFile(){}
    editFile(){}
    updateNetworkConfig(){}
}