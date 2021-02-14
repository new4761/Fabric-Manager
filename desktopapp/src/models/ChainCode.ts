import { CCstate, CCtype } from "./EnvProject";

export class ChainCode {
    id:number;
    name:string;
    type:CCtype;
    state:CCstate;
    directory:string;
    version:number;
    lastUpdate:number;
 constructor(id:number,name:string,type:CCtype,directory:string){
    this.id =id;
    this.name=name;
    this.type=type;
    this.directory =directory;
    this.state = CCstate.unSetupCC;
    this.version = 1;
    this.lastUpdate = +new Date();
 }
 setDate(){
   this.lastUpdate = +new Date()
 }
}