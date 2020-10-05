
import {AnchorPees} from "ConfigData";
import { OrganizationData, } from "ConfigData";
export class Organization implements OrganizationData{
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

export class OrdererOrg extends Organization{
 OrdererEndpoints:string[]=[];
 constructor(name:string,host:string,port:number){
 super(name);
 this.OrdererEndpoints.push (host+":"+port);
 
 }
}

export class PeerOrg extends Organization{

    AnchorPees:AnchorPees={
    Host:"",
    Port:0
    }
    constructor(name:string,host:string,port:number){
    super(name);
    this.AnchorPees.Host = host;
    this.AnchorPees.Port =port;
    }
}
