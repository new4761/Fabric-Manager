// Class for create configtx,yaml for NetworkConfig
const yaml = require('js-yaml');
import { YamlConfig } from "yaml-config";
import { FileYamlBuilder } from "../module/FileYamlBuilder";
import { CapabilitiesData} from "ConfigData";
import {OrdererOrg, Organization, PeerOrg} from "../module/OrganizationsConfig"
const path = require('path');
class ConfigtxConfig extends FileYamlBuilder implements YamlConfig {
    //**********************************
    // variable for export file 
    fileName: string;
    defaultOutputPath: string;
    //****************************************
    // self class variable
    capabilities: Capabilities;
    application:Application;
    channel:Channel;
    orderer:Orderer;
   organizations:Organization[]=[];
    ConfigtxData = new ConfigtxData();
    constructor() {
        super();
        this.fileName = "configtx.yaml";
        this.defaultOutputPath = "bin";
        this.capabilities = new Capabilities("V2_0");
        this.channel = new Channel(this.capabilities.Channel);
      let demoOrg0 = new  OrdererOrg("Orderer","test.com",7050);
        this.addOrganization(demoOrg0);
        let demoOrg1 = new PeerOrg ("Peer","test2.com",7053);
        this.addOrganization(demoOrg1);
       this.orderer = new Orderer(demoOrg0.OrdererEndpoints)
       
      //  this.application = new Application(this.capabilities.Application);
        this.application = new Application();
        this.ConfigtxData.Capabilities = this.capabilities;
        this.ConfigtxData.Organizations = this.organizations;
        this.ConfigtxData.Application  = this.application;
        this.ConfigtxData.Channel = this.channel;
        this.ConfigtxData.Orderer =this.orderer;
    }
    getUserInput() { }
    createFile() {
        let src = "\n # This file is Generate from YamlClass \n";
        //       src += yaml.safeDump({"sas":this.Organization})
        src += yaml.safeDump(this.ConfigtxData);
        this.saveFile(this.defaultOutputPath, src, this.fileName);
    }
    editFile() { }
    updateNetworkConfig() { }
    addOrganization(org:Organization){
        this.organizations.push(org);
    }
}
// default data for yaml file
class Capabilities {
    Channel: CapabilitiesData;
    Orderer: CapabilitiesData;
    Application: CapabilitiesData;
    constructor(version: string) {
        this.Channel = { [version]: true };
        this.Orderer = { [version]: true };
        this.Application = { [version]: true };
    }
}
class Application {
    Organization:string|null = null;
 //   Polices:Polices;
 //   Capabilities:CapabilitiesData;
 //   constructor(capabilitie:CapabilitiesData){
 //      this.Organization = null,
 //       this.Polices ={        Readers:
 //           { Type: "ImplicitMeta",
 //           
 //               Rule: "ANY Readers"
 //       },
 //       Writers:{
 //           Type: "ImplicitMeta",
 //           Rule: "ANY Writers"
 //       },
 //       Admins:{
 //           Type: "ImplicitMeta",
 //           Rule: "MAJORITY Admins"
 //       },
 //       LifecycleEndorsement:{
 //           Type: "ImplicitMeta",
 //           Rule: "MAJORITY Endorsement"
 //       },
 //       Endorsement:{
 //           Type: "ImplicitMeta",
 //           Rule: "MAJORITY Endorsement"
 //       }
 //       }
 //     this.Capabilities = capabilitie;
 //}  
}
class ConfigtxData {
    Organizations:any[]= [];
    Capabilities = {};
    Application = {};
    Orderer ={};
    Channel = {};
    Profiles = {};
}
class Channel {
    Polices = {       Readers:
            { Type: "ImplicitMeta",
            
                Rule: "ANY Readers"
        },
        Writers:{
            Type: "ImplicitMeta",
            Rule: "ANY Writers"
        },
        Admins:{
            Type: "ImplicitMeta",
            Rule: "MAJORITY Admins"
        }
    }
    Capabilities:CapabilitiesData;
    constructor(capabilitie:CapabilitiesData){
    this.Capabilities =capabilitie;
    }

}

class Orderer {
    OrdererType = "solo";
    Addresses:string[]=[];
    BatchTimeout = "2s";
    BatchSize = {
     MaxMessageCount:10,
     AbsoluteMaxBytes:"99 MB",
     PreferredMaxBytes:"2 MB"
    }
    Organization =null;
    constructor(address:string[]){
    this.Addresses = address;
    }
    addAddresses(host:string,port:number){
        this.Addresses.push(host+":"+port);
    }
}
export default new ConfigtxConfig();
