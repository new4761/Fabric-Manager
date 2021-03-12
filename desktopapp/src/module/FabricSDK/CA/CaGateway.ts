
import NetworkGateway from "../NetworkGateway";
import { netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import MinifabricController from "../../MinifabricController";
import { getOrgName } from "@/module/StringBuilder";
import IdentityManger from "./IdentityManger";
const FabricCAServices = require("electron").remote.require('fabric-ca-client');


class CaGateway extends NetworkGateway {
    //TODO: add select org 
    async connectGateWay() {
        let channel = NetworkConfig.getValue(netWorkConfigPath.channelPath);
        let connectionProfile = await MinifabricController.getChannelProfile(channel[0].name);
        // console.log(connectionProfile.certificateAuthorities)
        try {
            this.org = NetworkConfig.getValue(netWorkConfigPath.caPath)[0];
            const caInfo = connectionProfile.certificateAuthorities[this.org];
            const caTLSCACerts = caInfo.tlsCACerts.pem;
            this.gateway = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
         // console.log(getOrgName(this.org))
            await IdentityManger.enrollmentAdmin("admin", "adminpw",this,getOrgName(this.org))
            return  this
        } catch (error) {
            console.error(`******** FAILED : ${error}`);
        }
    }




}
export default CaGateway