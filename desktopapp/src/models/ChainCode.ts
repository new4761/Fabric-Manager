import { CCstate, CCtype } from "./EnvProject";

export class ChainCode {
    id:number;
    name:string;
    type:CCtype;
    state:CCstate;
    directory:string;
    channel:string;
    version:number;
    lastUpdate:number;
 constructor(id:number,name:string,type:CCtype,directory:string,channel:string){
    this.id =id;
    this.name=name;
    this.type=type;
    this.directory =directory;
    this.state = CCstate.unSetupCC;
    this.channel =channel;
    this.version = 1.0;
    this.lastUpdate = +new Date();
 }
 setDate(){
   this.lastUpdate = +new Date()
 }
 updateVersion(){
    this.version+=1.0
 }
}