// data file for declare all type of all env variable

import store from "../store/modules/project";
import ProjectConfig from "./ProjectConfig";

// use for set&check os type
export enum OsType {
    WINDOW,
    WSL,
    LINUX,
    MAC
}
export enum CCtype {
    go = "go",
    java = "java",
    node = "node"
}
export enum CCstate {
    unSetupCC="unSetupCC",
    setupDir="setupDir",
    installCC ="installCC",
    approveCC ="approveCC",
    commitCC ="commitCC",
    initCC ="initCC",
 //   upGradeCC ="upGradeCC",
   // unreadyCC ="unreadyCC",
    // errorCC ="errorCC",
    // readyCC  ="readyCC"   
}
export enum netWorkConfigPath{
    channelPath="channel",
    caPath ="project_config.fabric.cas",
    ccPath =  "chain_codes",
    peerPath="project_config.fabric.peers",
    userPath="users"
}
export enum exportConfigPath{
    folder_cli="cli",
}

export class ccOutputPayload {
  rawData: Array<string> = [];
  response: Array<string>  = [];
  fabricPayload: string = "";

}
export function  getProjectPath(){
//   console.log(await ProjectConfig.getPathResolve(store.state.id))
    return ProjectConfig.getPathResolve(store.state.id);
}