import { CapabilitiesData } from "ConfigData";
import { Orderer, Application, Channel } from "../models/ConfigtxConfig";
import { Organizations } from "../module/OrganizationsConfig"
export class Gennesis_Solo {
    Orderer: any = {};
    Consortiums: any = {};
    ["<<"]: Channel;
    constructor(channelDefault: Channel, orderer: Orderer, ordererOrgList: Organizations[],ordererCap:CapabilitiesData, nameConsortium: string, consrtiumsOrgList: Organizations[]) {

        this["<<"] = channelDefault;
        let orglist = this.cloneArray(consrtiumsOrgList);
        this.Consortiums[nameConsortium]= {Organizations:orglist}
        this.Orderer["<<"] = orderer;
        this.Orderer["Organizations"] = this.cloneArray(ordererOrgList);
        this.Orderer["Capabilities"] = ordererCap;
    }
    cloneArray(data: Organizations[]) {
        let temp: Organizations[] = [];
        data.forEach(val => temp.push(val));
        return temp;
    }

}
export class ProfileChannel_Cap {
    Consortium: string;
    ["<<"]: Channel;
    Application:any ={} ;
    constructor(consortiumName:string,channelDefault:Channel,applicationDefault:Application,orglist:Organizations[],capabilitie:CapabilitiesData){
    this.Consortium =consortiumName;
    this["<<"] = channelDefault;
    this.Application["<<"] = applicationDefault;
    this.Application["Organizations"] =this.cloneArray(orglist);
    this.Application["Capabilities"] =capabilitie; 
    }
cloneArray(data: Organizations[]) {
        let temp: Organizations[] = [];
        data.forEach(val => temp.push(val));
        return temp;
    }
}
