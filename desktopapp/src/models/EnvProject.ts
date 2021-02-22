// data file for declare all type of all env variable

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

    ccPath =  "chain_codes"
}

export class ccOutputPayload {
  rawData: string = "";
  response: string = "";
  fabricPayload: string = "";

}