import { getProjectPath, netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import ExportAppProcess from "../ExportAppProcess";
import FileManager from "../FileManager";

const { Gateway, Wallets } = require("fabric-network");
import OSProcess from "../OSProcess/OSProcess";
const path = require('path');
const fs = require("fs");
const yaml = require("js-yaml");
class MinifabricController {
    //TODO: move all minifabric process to this controller 
    constructor() { }

    //call Minifabric profilegen
    async profileGen(channel: string) {
        let args: any = [];
        args.push("profilegen")
        //add channel
        args.push("-c")
        args.push(channel)
        //add org
        args.push("-o")
        args.push(NetworkConfig.getUniqueOrgName(netWorkConfigPath.peerPath)[0])
        return await OSProcess.run(args)


    }
    async fixWalletIdentitiesForWindow() {
        // console.log("start fixWalletIdentitiesForWindow ")
        let sourceDir = path.join(getProjectPath(), "vars", "profiles", "vscode", "wallets")
 
        // })
        let files = fs.readdirSync(sourceDir)
        await files.forEach(async (file: any) => {
            let fileDir = path.join(sourceDir, file)
            let idFile =  fs.readdirSync(fileDir)
           await idFile.forEach(async (file: any) => {
                        let idFilePath = path.join(fileDir, file)
                        let data = await FileManager.readFile(idFilePath);
                        let regexWindow = /\s\\n/g
                        data = data.replace(regexWindow, '\\n')
                        FileManager.createFileWithData(idFilePath, data)
                    })
        })
        // console.log("end fixWalletIdentitiesForWindow ")
        // ExportAppProcess.getWallet(targetPath, peerList)
    }
    //return Identity in org
    async getWalletIdentities(org: string) {
        let sourceDir = path.join(getProjectPath(), "vars", "profiles", "vscode", "wallets", org)
        return await Wallets.newFileSystemWallet(sourceDir);

    }
    //return  channel profile data 
    async getChannelProfile(channel: string) {

        let fileName = channel + "_connection_for_nodesdk" + ".yaml"
        let sourceDir = path.join(getProjectPath(), "vars", "profiles", fileName)
        if (!fs.existsSync(sourceDir)) {
            console.log("profileGen")
            await this.profileGen(channel)
        }
        const connectionProfileData = await fs.readFileSync(sourceDir);
        return yaml.load(connectionProfileData);
    }


}
export default new MinifabricController()