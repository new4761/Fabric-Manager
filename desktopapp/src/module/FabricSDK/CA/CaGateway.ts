
import NetworkGateway from "../NetworkGateway";
import { netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import MinifabricController from "../../Minifabric/MinifabricController";
import { getOrgData } from "@/module/OSProcess/StringBuilder";
import IdentityManger from "./IdentityManger";
const FabricCAServices =require('fabric-ca-client');


class CaGateway extends NetworkGateway {
    //TODO: add select org 
    async connectGateWay() {
        let channel = NetworkConfig.getValue(netWorkConfigPath.channelPath);
        let connectionProfile = await MinifabricController.getChannelProfile(channel[0].name);
        // console.log(connectionProfile.certificateAuthorities)
        try {
            // this.org = NetworkConfig.getValue(netWorkConfigPath.caPath)[0];
            // console.log(NetworkConfig.getValue(netWorkConfigPath.caPath))
            // console.log("ca."+this.org)
            const caInfo =await connectionProfile.certificateAuthorities["ca1."+this.org];
            const caTLSCACerts = caInfo.tlsCACerts.pem;
            this.gateway = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
         // console.log(getOrgData(this.org))
            await IdentityManger.enrollmentAdmin("admin", "adminpw",this,getOrgData(this.org))
            return  this
        } catch (error) {
            console.error(`******** FAILED : ${error}`);
        }
    }




}
export default CaGateway