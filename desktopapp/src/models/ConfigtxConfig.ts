// Class for create configtx,yaml for NetworkConfig
const yaml = require('js-yaml');
import { YamlConfig } from "yaml-config";
import { FileYamlBuilder } from "../module/FileYamlBuilder";
import { CapabilitiesData} from "ConfigData";
import {OrdererOrg, Organization, PeerOrg} from "../module/OrganizationsConfig"
import {Gennesis_Solo, ProfileChannel_Cap} from "../module/ProfileConfig"
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
      //  this.application = new Application(this.capabilities.Application);
        this.application = new Application();
        let demoOrg0 = new  OrdererOrg("Orderer","test.com",7050);
        this.addOrganization(demoOrg0);
        let demoOrg1 = new PeerOrg ("Peer","test2.com",7053);
        this.addOrganization(demoOrg1);
       this.orderer = new Orderer(demoOrg0.OrdererEndpoints)
      let orgList1 = this.createOrgList(demoOrg0,demoOrg1); 
      let orderGen = new Gennesis_Solo (this.channel,this.orderer,orgList1,this.capabilities.Orderer,"testCon",orgList1);
      let channelDemo = new ProfileChannel_Cap("testCon",this.channel,this.application,orgList1,this.capabilities.Application);
      this.setProfile("testGenesis",orderGen ) ;
      this.setProfile("demoChannel", channelDemo);
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
        this.saveFileWithReplace(this.defaultOutputPath, src, this.fileName,/'<<'/gi,"<<");
    }
    editFile() { }
    updateNetworkConfig() { }
    addOrganization(org:Organization){
        this.organizations.push(org);
    }
    setProfile(name:string,data:any){
    this.ConfigtxData.Profiles[name]=data;
    }
    createOrgList(...orgs:Organization[]){
      let data =[]
      for (let org of orgs){
      data.push(org);
      }
      console.log("orglist:"+data)
      return data;
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
export class Application {
    Organization:string|null = null;
}
class ConfigtxData {
    Organizations:any[]= [];
    Capabilities = {};
    Application = {};
    Orderer ={};
    Channel = {};
    Profiles:any = {};
}
export class Channel {
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

export class Orderer {
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
    this.Addresses = this.cloneArray(address);
    }
    cloneArray(data: string[]) {
        let temp: string[] = [];
        data.forEach(val => temp.push(val));
        return temp;
    }}

export default new ConfigtxConfig();
