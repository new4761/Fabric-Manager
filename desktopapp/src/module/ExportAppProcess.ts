import { getProjectPath, netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
const fs = require("fs");
// import ProjectConfig from "@/models/ProjectConfig";
// import store from "../store/modules/project";
import FileManager from "./FileManager";
import MinifabricController from "./MinifabricController";
import { fixOrgName } from "./StringBuilder";
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path');
class ExportAppProcess {

    //only work for NodeSDK right now

    async generateProcess(channel: string, peerList: Array<object>) {
        //console.log(peerList)
        let targetPath = await FileManager.getDirPath()
        let profilePath = path.join(targetPath, "profiles")
        let walletPath = path.join(targetPath, "wallets")
        await MinifabricController.profileGen(channel);

        await FileManager.createDir(targetPath, "profiles")
        await FileManager.createDir(targetPath, "wallets")
        await this.getChannelProfile(channel, profilePath)

        //TODO: find better way
        await MinifabricController.fixWalletIdentitiesForWindow()
        await this.getWallet(walletPath, peerList)
        await this.getExampleGetaway(channel, targetPath, peerList)
        // console.log(targetPath)

    }
    //only work on peer right now
    async getWallet(targetPath: string, peerList: Array<object>) {
        let walletPath = path.join(getProjectPath(), "vars", "profiles", "vscode", "wallets")
        //let peerList = NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath);
        await peerList.forEach(async (res: any) => {
            if (res.checked == true) {
                let sourceDir = path.join(walletPath, res.name)
                let newDir = path.join(targetPath, res.name)
                await FileManager.copyFilesDir(sourceDir, newDir)
                await FileManager.removeFile(path.join(newDir, "Admin.id"))
            }
        })
        // console.log(targetPath)
    }

    getChannelProfile(channel: string, targetPath: string) {
        let gatewayFile = channel + "_connection_for_nodesdk" + ".yaml"
        let sourceDir = path.join(getProjectPath(), "vars", "profiles", gatewayFile)
        FileManager.copyFile(sourceDir, targetPath);
    }
    
    async getExampleGetaway(channel: string, targetPath: string, peerList: Array<object>) {
        let gatewayFile = "ExampleGateway.js"
        let packageFile = "package.json"
        let gatewayPath = path.join(targetPath, gatewayFile)
        //let connectionProfile = channel+"_connection_for_nodesdk"+".yaml"
        let gatewaySourcePath: string;
        let packageFileSourcePath: string;
        try {
            if (isDevelopment) {
                gatewaySourcePath = path.join(process.cwd(), 'extraResources', 'example_code', gatewayFile)
                packageFileSourcePath = path.join(process.cwd(), 'extraResources', 'example_code', packageFile)
            } else {
                gatewaySourcePath = path.join(process.resourcesPath, 'example_code', gatewayFile)
                packageFileSourcePath = path.join(process.resourcesPath, 'extraResources', 'example_code', packageFile)
            }
            let data = FileManager.readFile(gatewaySourcePath);
            data = data.replace(/mychannel/g, channel)
            if(peerList.length!=0){
            data = await this.setFirstIdentity( data, peerList)
            }
            //console.log(data)
            await FileManager.createFileWithData(gatewayPath, data)
            await FileManager.copyFile(packageFileSourcePath, targetPath)
            //console.log("END getExampleGetaway")
        }
        catch (error) {
            console.error(`getExampleGetaway FAILED : ${error}`);
        }
    }

    setFirstIdentity(fileData: string, peerList: Array<object>) {
        const orgList: any = peerList.filter((res: any) => res.checked == true);
        //console.log(orgList)
        if (orgList.length!=0) { 
            for (let index = 0; index < orgList.length; index++) {
                let orgName = orgList[index].name
                let userList =NetworkConfig.getValue(netWorkConfigPath.userPath + "." + fixOrgName(orgName))
                if (userList!=undefined){
                let userName =Object.keys(userList)[0]
                fileData = fileData.replace(/wallet.get\('identity'\)/, "wallet.get('"+userName+"')")
                fileData = fileData.replace(/\('.\/wallets\/Org'\)/, "('./wallets/"+orgName+"')")

                break;
                }
            }
           // console.log(fileData)
        }
        return fileData
    }
}


export default new ExportAppProcess();