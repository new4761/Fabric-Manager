import { ConfigData } from "ConfigData";
export class BCCSPConfig implements ConfigData {
    default: string = "SW";
    sw: BccspSw = {
        hash: "SHA2",
        security: 256,
        filekeystore: {
            keystore: "msp/keystore"
        }
    }
    getComment() {
        let comment = "\n # BCCSP (BlockChain Crypto Service Provider) section is used to select which \n # crypto library implementation to use \n"
        return comment;
    }

}

interface BccspSw {
    hash: string,
    security: number,
    filekeystore: {
        keystore: string
    }
}