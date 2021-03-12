import { getProjectPath, netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
// import ProjectConfig from "@/models/ProjectConfig";
// import store from "../store/modules/project";
import FileManager from "./FileManager";
import MinifabricController from "./MinifabricController";
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path');
class ExportAppProcess {

//only work for NodeSDK right now

async generateProcess(channel: string,peerList: Array<object> ){
    console.log(peerList)
    let targetPath = await FileManager.getDirPath()
    let profilePath = path.join(targetPath,"profiles")
    let walletPath = path.join(targetPath,"wallets")
    await MinifabricController.profileGen(channel);

    await FileManager.createDir(targetPath,"profiles")
    await FileManager.createDir(targetPath,"wallets")
    await this.getChannelProfile(channel,profilePath)
    await this.getExampleGetaway(channel,targetPath)
    await this.getWallet(walletPath,peerList)
   // console.log(targetPath)

}
//only work on peer right now
 getWallet(targetPath:string,peerList: Array<object>){
    let walletPath = path.join(getProjectPath(), "vars", "profiles", "vscode","wallets")
    //let peerList = NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath);
    peerList.forEach(async (res:any)=>{
        if(res.checked==true){
        let sourceDir =path.join(walletPath,res.name)
        let newDir =path.join(targetPath,res.name)
        await FileManager.copyFilesDir(sourceDir,newDir)
        await FileManager.removeFile(path.join(newDir,"Admin.id"))
        }
    })
 }
 getChannelProfile(channel: string,targetPath:string){
    let fileName = channel+"_connection_for_nodesdk"+".yaml"
    let sourceDir =path.join(getProjectPath(),"vars","profiles",fileName)
    FileManager.copyFile(sourceDir,targetPath);
 }
 getExampleGetaway(channel: string,targetPath:string){
    let fileName = "ExampleGateway.js"
    targetPath = path.join(targetPath,fileName)
    let connectionProfile_fileName = channel+"_connection_for_nodesdk"+".yaml"
    let sourcePath:string;
    try {
    if (isDevelopment) {
         sourcePath = path.join(process.cwd(),'extraResources','example_code',fileName)
     }else{
         sourcePath = path.join(process.resourcesPath,'example_code',fileName)
     }
     let data = FileManager.readFile(sourcePath);
     data = data.replace(/mychannel_connection_for_nodesdk.yaml/,connectionProfile_fileName)
     FileManager.createFileWithData(targetPath,data)
    }
    catch(error){
        console.error(`getExampleGetaway FAILED : ${error}`);
    }
 }
}


export default new ExportAppProcess();