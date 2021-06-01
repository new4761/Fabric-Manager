import { netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
import MinifabricController from "../Minifabric/MinifabricController";
import { getOrgData } from "../OSProcess/StringBuilder";
const { Gateway } =require("fabric-network");
class NetworkGateway {
    org: string;
    //get org
    gateway:any;
    constructor(org: string) {
        this.org = org
        //console.log(this.gateway)
    }
    async connectGateWay() {
        let gateway = new Gateway();
        let channel = NetworkConfig.getValue(netWorkConfigPath.channelPath);
        let connectionProfile = await MinifabricController.getChannelProfile(channel[0].name);
        // console.log(connectionProfile.certificateAuthorities)
        try {
            // this.org = getOrgData(NetworkConfig.getValue(netWorkConfigPath.caPath)[0]);
            // let wallet = await MinifabricController.getWalletIdentities(this.org);
            let wallet = await MinifabricController.getWalletIdentities("ca1."+this.org);
            const identity = await wallet.get('Admin');
            // console.log(identity)
            this.gateway = await gateway.connect(connectionProfile, {
                wallet, identity
                , discovery: { enabled: true, asLocalhost: true },  // Previously imported identity
            });
            return this
        } catch (error) {
            console.error(`******** FAILED : ${error}`);
        }
    }
    async getAdmin() {
        let wallet = await this.getWallet()
        const adminIdentity = await wallet.get('Admin');
        //console.log(identity)
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');
        return adminUser
    }
    getGateway(){
        return this.gateway
    }
    destroyGateway(gateway: any) {
        gateway.disconnect();
    }
    getWallet() {
        return MinifabricController.getWalletIdentities(getOrgData(this.org));

    }

}
export default NetworkGateway