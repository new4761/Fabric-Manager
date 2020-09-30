// // Class for create Config.yaml for Client Config
// //import YAML from 'yaml';
// const yaml = require('js-yaml');
// import { YamlConfig } from "yaml-config";
// import {TlsSettingConfig,CSRConfig,BCCSPConfig}  from "../lib/fabric-ca/index";
// // check is  isDevelopment?
// const isDevelopment = process.env.NODE_ENV !== 'production';

// class CaClientConfig implements YamlConfig{

//    //*************************************************
//    // variables for export file
//     fileName: string;
//     defaultOutputPath: string
//    //***************************************************
//    //self Class Variables
//    url:string = "http://localhost:7054";
//    mspdir:string = "msp"
//    tls:TlsSettingConfig = new TlsSettingConfig();
//    //YamlConfig defalut Function
//     constructor() {
//       // define file name and dafault path
//       this.fileName = "fabric-ca-client-config.yaml";
//       this.defaultOutputPath = "./tests";
//     }
//    // call funtion to get user input
//    getUserInput(userInput: CaClientConfig) {
//       console.log(userInput);
//    }
//    createFile() {

//    }

//     saveFile: (outputPath: string, inputFileData: string) {

//     }

//     editFile: (filePath: string, inputFileData: object) {

//     }

//     updateNetworkConfig: () {}
// }

