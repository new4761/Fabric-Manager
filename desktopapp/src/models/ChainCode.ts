import { CCstate, CCtype } from "./EnvProject";

export default class ChainCode {
    id:number;
    name:string;
    type:CCtype;
    state:CCstate;
    directory:string;
    channel:string;
    version:number;
    lastUpdate:number;
    useInit:boolean;
    initArgs:any
 constructor(id:number,name:string,type:CCtype,directory:string,channel:string){
    this.id =id;
    this.name=name;
    this.type=type;
    this.directory =directory;
    this.state = CCstate.unSetupCC;
    this.channel =channel;
    this.version = 1.0;
    this.lastUpdate = +new Date();
    this.useInit=false;
    this.initArgs=[]
 }

}