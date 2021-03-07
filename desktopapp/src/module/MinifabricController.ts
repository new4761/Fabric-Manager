import { netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import OSProcess from "./OSProcess";
class MinifabricController {
    //TODO: move all minifabric process to this controller 
    constructor(){}


   async profileGen(channel: string){
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


}
export default new MinifabricController()