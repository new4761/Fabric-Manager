import CaGateway from "./CA/CaGateway";
import IdentityManger from "./CA/IdentityManger";

class FabricSDKController {


    async EnrollIdentity(org:string,userName:string,userPW:string,userRole:string){
        let connection =await new CaGateway(org)
        let networkGateway = await connection.connectGateWay();
        await  IdentityManger.registerAndEnrollUser(userName, userPW,userRole,connection,org)
    }

}
export default new FabricSDKController()