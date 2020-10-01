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
   Organization =[testData];
	let testData= {
		"test":{
			Name:"test",
			SkipiAsForeign:false,
			ID:"test",
			MSPDir:"msp"
		}
	}
    constructor () {
        super();
        this.fileName = "configtx.yaml";
        this.defaultOutputPath = "bin"
    }
    getUserInput(){}
	createFile(){
		let src = "\n # This file is Generate from YamlClass";
		src += yaml.dump({'Organization':this.Organization})
	this.saveFile(this.defaultOutputPath,src,this.fileName);
	}
    editFile(){}
    updateNetworkConfig(){}
}
// default data for yaml file 
class Capabilities {
}
