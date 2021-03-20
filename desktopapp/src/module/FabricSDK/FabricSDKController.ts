import CaGateway from "./CA/CaGateway";
import IdentityManger from "./CA/IdentityManger";
import NetworkGateway from "./NetworkGateway";
const { Gateway } = require("electron").remote.require("fabric-network");
const client = require("electron").remote.require("fabric-common");
const FabricCAServices = require("electron").remote.require('fabric-ca-client');

class FabricSDKController {


    async EnrollIdentity(org:string,userName:string,userPW:string,userRole:string){
        let connection =await new CaGateway(org)
        let networkGateway = await connection.connectGateWay();
        await  IdentityManger.registerAndEnrollUser(userName, userPW,userRole,connection,org)
    }

}
export default new FabricSDKController()