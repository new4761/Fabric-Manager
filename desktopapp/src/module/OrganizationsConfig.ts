
import {AnchorPees} from "ConfigData";
import { OrganizationData, } from "ConfigData";
export class Organizations implements OrganizationData{
    Name:string;
    ID:string;
    MSPDir:string;
   // Polices:Polices;  wait to update
    constructor(name:string){
        this.Name=name;
        this.ID =name;
        this.MSPDir =this.getMSPdir();
    }
    getMSPdir(){
      //  return   path.join(this.Name,"/msp")
           return "../"+this.Name+"/msp" 
    }
}

export class OrdererOrg extends Organizations{
 OrdererEndpoints:string[]=[];
 Policies = {
    Readers:
    {
        Type: "Signature",

        Rule: "OR('"+this.Name+".member')"
    },
    Writers: {
        Type: "Signature",
        Rule: "OR('"+this.Name+".member')"
    },
    Admins: {
        Type: "Signature",
        Rule: "OR('"+this.Name+".member')"
    }
}
 constructor(name:string,host:string,port:number){
 super(name);
 this.OrdererEndpoints.push (host+":"+port);
 
 }
}

export class PeerOrg extends Organizations{
Policies = {
    Readers:
    {
        Type: "Signature",
        Rule:"OR("+this.Name+".admin, "+this.Name+".peer, "+this.Name+".client)"
    },
    Writers: {
        Type: "Signature",
        Rule: "OR("+this.Name+".admin"+", "+this.Name+".client)"
    },
    Admins: {
        Type: "Signature",
        Rule: "OR("+this.Name+".admin)"
    },Endorsement: {
      Type: "Signature",
       Rule: "OR("+this.Name+".peer)"
    },
}
    AnchorPeers:AnchorPees[]=[];
    constructor(name:string,host:string,port:number){
    super(name);
    this.AnchorPeers.push({Host:host,Port:port})
    }
}
