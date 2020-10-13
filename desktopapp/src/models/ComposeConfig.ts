// Class for create configtx,yaml for NetworkConfig
const yaml = require('js-yaml');
import { YamlConfig } from "yaml-config";
import { FileYamlBuilder } from "../module/FileYamlBuilder";
class ComposeConfig extends FileYamlBuilder implements YamlConfig {

    fileName: string;
    defaultOutputPath: string;

    volumes: any = {}
    network: any = {}
    services: any = {}

    constructor() {
        super();
        this.fileName = "compose.yaml";
        this.defaultOutputPath = "./tests";
    }
    getUserInput() { }
    createFile() {

        let src = "\n # This file is Generate from YamlClass \n";
        this.addOrg("orderer.example.com");
        this.addOrg("peer0.org1.example.com");
        this.addOrg("peer0.org2.example.com");
        src += yaml.safeDump({ volumes: this.volumes });

        this.addNetwork("test");
        src += yaml.safeDump({ networks: this.network });


        let peer0 = this.addPeer("orderer","orderer",7050,0,"test");
        let peer1 = this.addPeer("peer0.org1","peer",7051,1,"test");
        let peer2 = this.addPeer("peer0.org2","peer",9051,2,"test");
        let peer3 = this.addPeer("peer1.org1","peer",8051,1,"test");

        this.addService("orderer.example.com", peer0);
        this.addService("peer0.org1.example.com", peer1);
        this.addService("peer1.org1.example.com", peer3);
        this.addService("peer0.org2.example.com", peer2);

        src += yaml.safeDump({ services: this.services });

        return (src);
    }
    editFile() { }
    updateNetworkConfig() { }

    addOrg(orgUrl: string) {
        this.volumes[orgUrl] = null;
    }

    addNetwork(net: string) {
        this.network[net] = null;
    }

    addService(service: string, peer: peer) {
        this.services[service] = peer;
    }



     addPeer(name:string,type:string,port:number,org:number,network:string) {
         let node = new peer();
         node.container_name = name.toLowerCase();+".example.com" //"orderer.example.com"
         node.image = "hyperledger/fabric-"+type+":$IMAGE_TAG" //orderer,peer
         if(type == "orderer"){
            node.environment = [
                "FABRIC_LOGGING_SPEC=INFO",
                "ORDERER_GENERAL_LISTENADDRESS=0.0.0.0",
                "ORDERER_GENERAL_LISTENPORT="+port,
                "ORDERER_GENERAL_GENESISMETHOD=file",
                "ORDERER_GENERAL_GENESISFILE=/var/hyperledger/orderer/orderer.genesis.block",
                "ORDERER_GENERAL_LOCALMSPID=OrdererMSP",
                "ORDERER_GENERAL_LOCALMSPDIR=/var/hyperledger/orderer/msp",
                "ORDERER_GENERAL_TLS_ENABLED=true",
                "ORDERER_GENERAL_TLS_PRIVATEKEY=/var/hyperledger/orderer/tls/server.key",
                "ORDERER_GENERAL_TLS_CERTIFICATE=/var/hyperledger/orderer/tls/server.crt",
                "ORDERER_GENERAL_TLS_ROOTCAS=[/var/hyperledger/orderer/tls/ca.crt]",
                "ORDERER_KAFKA_TOPIC_REPLICATIONFACTOR=1",
                "ORDERER_KAFKA_VERBOSE=true",
                "ORDERER_GENERAL_CLUSTER_CLIENTCERTIFICATE=/var/hyperledger/orderer/tls/server.crt",
                "ORDERER_GENERAL_CLUSTER_CLIENTPRIVATEKEY=/var/hyperledger/orderer/tls/server.key",
                "ORDERER_GENERAL_CLUSTER_ROOTCAS=[/var/hyperledger/orderer/tls/ca.crt]",
            ];
            node.working_dir = "/opt/gopath/src/github.com/hyperledger/fabric";
            node.command = "orderer";
            node.volumes = [
                "../system-genesis-block/genesis.block:/var/hyperledger/orderer/orderer.genesis.block",
                "../organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp:/var/hyperledger/orderer/msp",
                "../organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/:/var/hyperledger/orderer/tls",
                "orderer.example.com:/var/hyperledger/production/orderer",
            ];
         }
         else{
            node.environment = [
                "CORE_VM_ENDPOINT=unix:///host/var/run/docker.sock",
                "CORE_VM_DOCKER_HOSTCONFIG_NETWORKMODE=${COMPOSE_PROJECT_NAME}_test",
                "FABRIC_LOGGING_SPEC=INFO",
                "CORE_PEER_TLS_ENABLED=true",
                "CORE_PEER_PROFILE_ENABLED=true",
                "CORE_PEER_TLS_CERT_FILE=/etc/hyperledger/fabric/tls/server.crt",
                "CORE_PEER_TLS_KEY_FILE=/etc/hyperledger/fabric/tls/server.key",
                "CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/fabric/tls/ca.crt",
                "CORE_PEER_ID="+name.toLowerCase()+".example.com",
                "CORE_PEER_ADDRESS="+name.toLowerCase()+".example.com:"+port,
                "CORE_PEER_LISTENADDRESS=0.0.0.0:"+port,
                "CORE_PEER_CHAINCODEADDRESS="+name.toLowerCase()+".example.com:"+(port+1),
                "CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:"+(port+1),
                "CORE_PEER_GOSSIP_BOOTSTRAP="+name.toLowerCase()+".example.com:"+port,
                "CORE_PEER_GOSSIP_EXTERNALENDPOINT="+name.toLowerCase()+".example.com:"+port,
                "CORE_PEER_LOCALMSPID=Org"+org+"MSP",
            ];
            node.working_dir = "/opt/gopath/src/github.com/hyperledger/fabric/peer";
            node.command = "peer node start";
            node.volumes = [
                "/var/run/:/host/var/run/",
                "../organizations/peerOrganizations/org"+org+".example.com/peers/"+name.toLowerCase()+".example.com/msp:/etc/hyperledger/fabric/msp",
                "../organizations/peerOrganizations/org"+org+".example.com/peers/"+name.toLowerCase()+".example.com/tls:/etc/hyperledger/fabric/tls",
                name.toLowerCase()+".example.com:/var/hyperledger/production"
            ];
         }
         node.ports = [port+":"+port]
         node.networks = [network]

         return(node)
     }

}

export class peer {
    container_name: string = "";
    image: string = "";
    environment: string[] = [""];
    working_dir: string = ""
    command: string = ""
    volumes: string[] = [""];
    ports: string[] = [""];
    networks: string[] = [""];
}

export default new ComposeConfig();
