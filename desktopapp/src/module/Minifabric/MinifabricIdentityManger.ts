import { getProjectPath } from "@/models/EnvProject";
import FileManager from "../FileManager";
//const fs = require('fs');
const path = require('path');
//handle folder and cert for minifabric
class MinifabricIdentityManger {
    //Current only work on peer org and only client (not admin)
    async addNewIdentity(org: string, userName: string, singcert: any, pkey: any) {
        let keyVarsFile = path.join(getProjectPath(), "vars", "key_vars.json")
        let fullUserName = userName + "@" + org
        let data = {
            "key": fullUserName,
            "org": org,
            "path": "/home/vars/keyfiles/peerOrganizations/" + org + "/users/" + fullUserName + "/msp/keystore/priv_sk",
            "pkey": "keyfiles/peerOrganizations/" + org + "/users/" + fullUserName + "/msp/keystore/priv_sk",
            "type": "users"
        }
        let keyListData = JSON.parse(FileManager.readFile(keyVarsFile))
        keyListData[fullUserName] = (data)
        //console.log(keyListData)
        await FileManager.createFileWithData(keyVarsFile, JSON.stringify(keyListData))

        await this.setUpMSP(org, userName, singcert, pkey)



    }
    async setUpMSP(org: string, userName: string, singcert: any, pkey: any) {
        //TODO : handle orderer organization
        let walletPath = path.join(getProjectPath(), "vars", "keyfiles", "peerOrganizations", org, "users")
        let adminPath = path.join(walletPath, "Admin@" + org)
        let newUserPath = path.join(walletPath, userName + "@" + org)
        await FileManager.copyFilesDir(adminPath, newUserPath)
        await FileManager.removeFile(path.join(newUserPath, "msp", "signcerts","Admin@" + org+ "-cert.pem"))
        await this.cretePkeyFolder(newUserPath, pkey)
        await this.createSigncert(newUserPath, userName, org, singcert)
    }

    async cretePkeyFolder(newUserPath: string, data: any) {
       // console.log(data)
        let targetPath = path.join(newUserPath, "msp", "keystore", "priv_sk")
        await FileManager.createFileWithData(targetPath, data)
    }
    async createSigncert(newUserPath: string, userName: string, org: string, data: any) {
      //  console.log(data)
        //console.log("createSigncert")
        let targetPath = path.join(newUserPath, "msp", "signcerts", userName + "@" + org + "-cert.pem")
        await FileManager.createFileWithData(targetPath, data)
        
    }





}
export default new MinifabricIdentityManger()