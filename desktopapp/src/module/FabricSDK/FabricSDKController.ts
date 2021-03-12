import CaGateway from "./CA/CaGateway";
import IdentityManger from "./CA/IdentityManger";
import NetworkGateway from "./NetworkGateway";
const { Gateway } = require("electron").remote.require("fabric-network");
const client = require("electron").remote.require("fabric-common");
const FabricCAServices = require("electron").remote.require('fabric-ca-client');

class FabricSDKController {


    async test() {
     let connection =await new CaGateway("asd")
     let networkGateway = await connection.connectGateWay();
    }
    async testEnroll(){
        let connection =await new CaGateway("peer1.zaza")
        let networkGateway = await connection.connectGateWay();
        await  IdentityManger.registerAndEnrollUser("qwe123123112312", "pw",connection,"peer1.zaza")
    }
    async EnrollIdentity(org:string,userName:string,userPW:string){
        let connection =await new CaGateway(org)
        let networkGateway = await connection.connectGateWay();
        await  IdentityManger.registerAndEnrollUser(userName, userPW,connection,org)
    }

}
export default new FabricSDKController()