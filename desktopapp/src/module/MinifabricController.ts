import { getProjectPath, netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";

const { Gateway, Wallets } = require("electron").remote.require("fabric-network");
import OSProcess from "./OSProcess";
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
        return await OSProcess.run_new(args)


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
        const connectionProfileData =await fs.readFileSync(sourceDir);
        return yaml.safeLoad(connectionProfileData);
    }


}
export default new MinifabricController()