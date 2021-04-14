
// const FabricCAServices = equire('fabric-ca-client');
import { getProjectPath,netWorkConfigPath } from "@/models/EnvProject";
import NetworkConfig from "@/models/NetworkConfig";
// import FileManager from "@/module/FileManager";
import MinifabricIdentityManger from "@/module/Minifabric/MinifabricIdentityManger";
import { fixOrgName } from "@/module/OSProcess/StringBuilder";
const path = require('path');
// const {RegisterRequest} = require("fabric-common");
class IdentityManger {

    async enrollment(enrollmentID: string, enrollmentPW: string,enrollmentRole:string, caConnection: any, mspId: string) {
        let wallet = await caConnection.getWallet()
        let caGateway = await caConnection.getGateway()
        const enrollment = await caGateway.enroll({ enrollmentID: enrollmentID, enrollmentSecret: enrollmentPW });

      //  let newPrkData =enrollment.key.toBytes().replace(regexWindow,'')
       // console.log(newPrkData)
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey:enrollment.key.toBytes(),
            },
            mspId:fixOrgName(mspId),
            type: 'X.509',
        };
        //console.log(enrollment.key)
        await MinifabricIdentityManger.addNewIdentity(mspId, enrollmentID, enrollment.certificate, enrollment.key.toBytes())
        await wallet.put(enrollmentID, x509Identity);
        let user = {
            name: enrollmentID,
            pw: enrollmentPW,
            certificate: enrollment.certificate,
            role: enrollmentRole,
            enroll: true
        }
        //TODO: find better way to handle it
        let configPath = netWorkConfigPath.userPath + "." + fixOrgName(mspId) + "." + enrollmentID  
        NetworkConfig.updateNetworkConfig(configPath, user);

    }
  

    async enrollmentAdmin(enrollmentID: string, enrollmentPW: string, caConnection: any, mspId: string) {
        let wallet = await caConnection.getWallet()
        let caGateway = await caConnection.getGateway()
        const enrollment = await caGateway.enroll({ enrollmentID: enrollmentID, enrollmentSecret: enrollmentPW });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: fixOrgName(mspId),
            type: 'X.509',
        };

        await wallet.put("Admin", x509Identity);

    }

    async registerAndEnrollUser(enrollmentID: string, enrollmentPW: string,enrollmentRole:string, caConnection: any, mspId: string) {
        let caGateway = await caConnection.getGateway()
        let req = {
            enrollmentID: enrollmentID,
            enrollmentSecret: enrollmentPW,
            role: enrollmentRole, maxEnrollments: 500
        }
        const register = await caGateway.register(req, await caConnection.getAdmin())
        await this.enrollment(enrollmentID, enrollmentPW,enrollmentRole, caConnection, mspId)
        // console.log(register)
    }

}
export default new IdentityManger()