// Class for create configtx,yaml for NetworkConfig
const path = require("path");
import fs from "fs";
const yaml = require("js-yaml");
import { YamlConfig } from "yaml-config";
import { FileYamlBuilder } from "../module/FileYamlBuilder";
import ProjectConfig from "@/models/ProjectConfig";
import NetworkConfig from "@/models/NetworkConfig";

import store from "../store/modules/project";
class ComposeConfig extends FileYamlBuilder implements YamlConfig {
  fileName: string;
  defaultOutputPath: string;

  volumes: any = {};
  network: any = {};
  services: any = {};

  envMap: any;
  org: any;

  constructor() {
    super();
    this.fileName = "compose.yaml";
    this.defaultOutputPath = "./tests";
  }
  getUserInput() {}
  createFile() {
    this.envMap = new Map();

    let sourceDir = path.join(ProjectConfig.getPathResolve(store.state.id), "vars", "run");
    if (!fs.existsSync(sourceDir)) {
      return;
    }
    var files = fs.readdirSync(sourceDir);
    for (var i = 0; i < files.length; i++) {
      if (files[i].toString().indexOf(".env") >= 0) {
        console.log("-- found: ", files[i]);
        let envConfig = fs.readFileSync(path.join(sourceDir, files[i]), "utf8").split(/[\r\n]+/);
        this.envMap.set(files[i].replace(".env", ""), envConfig);
      }
    }

    this.org = NetworkConfig.getOrgData();
    // Object.values(org).forEach(element => console.log(Array.from(element.child)));
    console.log(this.envMap);
    console.log(this.org);

    let src = "\n # This file is Generate from YamlClass \n";

    Object.values(this.org).forEach((element) => {
      //@ts-ignore
      this.addOrg(element.fullname);
      //@ts-ignore
      let child = Array.from(element.child);
      for (i = 0; i < child.length; i++) {
        //@ts-ignore
        let peer = this.addPeer(child[i], "peer", element.fullname, 7050, "test");
        //@ts-ignore
        this.addService(child[i], peer);
      }
    });

    // let src = "\n # This file is Generate from YamlClass \n";
    // this.addOrg("orderer.example.com");
    // this.addOrg("peer0.org1.example.com");
    // this.addOrg("peer0.org2.example.com");
    src += yaml.safeDump({ volumes: this.volumes });

    this.addNetwork("test");
    src += yaml.safeDump({ networks: this.network });

    // let peer0 = this.addPeer("orderer","orderer",7050,0,"test");
    // let peer1 = this.addPeer("peer0.org1","peer",7051,1,"test");
    // let peer2 = this.addPeer("peer0.org2","peer",9051,2,"test");
    // let peer3 = this.addPeer("peer1.org1","peer",8051,1,"test");

    // this.addService("orderer.example.com", peer0);
    // this.addService("peer0.org1.example.com", peer1);
    // this.addService("peer1.org1.example.com", peer3);
    // this.addService("peer0.org2.example.com", peer2);

    src += yaml.safeDump({ services: this.services });

    // // console.log(src);
    this.saveFile(this.defaultOutputPath, src, "docker-compose.yaml");
  }

  saveFile(outputPath: string, inputFileData: string, fileName: string) {
    console.log(inputFileData);
    try {
      // // check dev mode function
      // // used this style for base to write function who work with files
      // console.log(this.src)
      let filePath = path.join(outputPath, fileName);
      fs.writeFileSync(filePath, inputFileData, "utf-8");
    } catch (e) {
      console.log(e);
    }
  }

  editFile() {}
  updateNetworkConfig() {}

  addOrg(orgUrl: string) {
    this.volumes[orgUrl] = null;
  }

  addNetwork(net: string) {
    this.network[net] = null;
  }

  addService(service: string, peer: peer) {
    this.services[service] = peer;
  }

  addPeer(name: any, type: string, org: string, port: number, network: string) {
    let node = new peer();
    node.container_name = name.toLowerCase();
    node.image = "hyperledger/fabric-" + type + ":$IMAGE_TAG"; //orderer,peer
    console.log(this.envMap);
    console.log(name);
    console.log(this.envMap.get(name));
    node.environment = this.envMap.get(name);
    node.working_dir = "/opt/gopath/src/github.com/hyperledger/fabric/peer";
    node.command = "peer node start";
    node.volumes = [
      "/var/run/:/host/var/run/",
      "../organizations/peerOrganizations/org" +
        org +
        ".example.com/peers/" +
        name.toLowerCase() +
        ".example.com/msp:/etc/hyperledger/fabric/msp",
      "../organizations/peerOrganizations/org" +
        org +
        ".example.com/peers/" +
        name.toLowerCase() +
        ".example.com/tls:/etc/hyperledger/fabric/tls",
      name.toLowerCase() + ".example.com:/var/hyperledger/production",
    ];

    node.ports = [port + ":" + port];
    node.networks = [network];

    return node;
  }
}

export class peer {
  container_name: string = "";
  image: string = "";
  environment: string[] = [""];
  working_dir: string = "";
  command: string = "";
  volumes: string[] = [""];
  ports: string[] = [""];
  networks: string[] = [""];
}

export default new ComposeConfig();
