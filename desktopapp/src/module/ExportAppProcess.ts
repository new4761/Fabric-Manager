import ProjectConfig from "@/models/ProjectConfig";
import store from "../store/modules/project";
import FileManager from "./FileManager";
import MinifabricController from "./MinifabricController";
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path');
class ExportAppProcess {
 projectPath = ProjectConfig.getPathResolve(store.state.id);
//only work for NodeSDK right now

async generateProcess(channel: string){

    let targetPath = await FileManager.getDirPath()
    this.getExampleGetaway(channel,targetPath)
    // let profilePath = path.join(targetPath,"profiles")
    // let walletPath = path.join(targetPath,"wallets")
    // FileManager.createDir(targetPath,"profiles")
    // FileManager.createDir(targetPath,"wallets")
    // this.getChannelProfile(channel,profilePath)
    // console.log(targetPath)
    // MinifabricController.profileGen(channel);
}
 getWallet(){
 }
 getChannelProfile(channel: string,targetPath:string){
    let fileName = channel+"_connection_for_nodesdk"+".yaml"
    let sourceDir =path.join(this.projectPath,"vars","profiles",fileName)
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