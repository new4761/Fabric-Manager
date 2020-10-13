// Class for create configtx,yaml for NetworkConfig
const yaml = require('js-yaml');
import { YamlConfig } from "yaml-config";
import { FileYamlBuilder } from "../module/FileYamlBuilder";
class OrgConfig extends FileYamlBuilder implements YamlConfig {
    //**********************************
    // variable for export file 
    fileName: string;
    defaultOutputPath: string;
    //****************************************
    // self class variable

    PeerOrgs: Array<Peers> = new Array();


    constructor() {
        super();
        this.fileName = "crypto-config-org1.yaml";
        this.defaultOutputPath = "./tests";
    }
    getUserInput() { }
    createFile() {

        let src = "\n # This file is Generate from YamlClass \n";
        this.PeerOrgs.push(new Peers);
        src += yaml.safeDump({ PeerOrgs: this.PeerOrgs });
        return (src);
        //this.saveFile(this.defaultOutputPath, src, this.fileName);
    }
    editFile() { }
    updateNetworkConfig() { }
}

class Peers {
    Name: string = "Org1";
    Domain: string = "org1.example.com";
    EnableNodeOUs: boolean = true;
    Template: object = {
        Count: 5,
        SANS: ['localhost']
    }
    Users: object = {
        Count: 1
    }
}

export default new OrgConfig();
