import { CapabilitiesData } from "ConfigData";
import { Orderer, Application, Channel } from "../models/ConfigtxConfig";
import { Organization } from "../module/OrganizationsConfig"
export class Gennesis_Solo {
    Orderer: any = {};
    Consortiums: any = {};
    ["<<"]: Channel;
    constructor(channelDefault: Channel, orderer: Orderer, ordererOrgList: Organization[],ordererCap:CapabilitiesData, nameConsortium: string, consrtiumsOrgList: Organization[]) {

        this["<<"] = channelDefault;
        this.Consortiums[nameConsortium] = this.cloneArray(consrtiumsOrgList);
        this.Orderer["<<"] = orderer;
        this.Orderer["Organizations"] = this.cloneArray(ordererOrgList);
        this.Orderer["Capabilities"] = ordererCap;
    }
    cloneArray(data: Organization[]) {
        let temp: Organization[] = [];
        data.forEach(val => temp.push(val));
        return temp;
    }

}
export class ProfileChannel_Cap {
    Consortiums: string;
    ["<<"]: Channel;
    Application:any ={} ;
    constructor(consortiumName:string,channelDefault:Channel,applicationDefault:Application,orglist:Organization[],capabilitie:CapabilitiesData){
    this.Consortiums =consortiumName;
    this["<<"] = channelDefault;
    this.Application["<<"] = applicationDefault;
    this.Application["Organization"] =this.cloneArray(orglist);
    this.Application["Capabilities"] =capabilitie; 
    }
cloneArray(data: Organization[]) {
        let temp: Organization[] = [];
        data.forEach(val => temp.push(val));
        return temp;
    }
}
