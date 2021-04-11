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
  peer: Array<string> = [];

  envMap: any;
  portMap: any;
  org: any;

  constructor() {
    super();
    this.fileName = "compose.yaml";
    this.defaultOutputPath = "./tests";
  }
  getUserInput() {}
  createFile() {
    this.envMap = new Map();
    this.portMap = new Map();
    this.org = NetworkConfig.getOrgData();
    let sourceDir = path.join(ProjectConfig.getPathResolve(store.state.id), "vars", "run");
    if (!fs.existsSync(sourceDir)) {
      return;
    }
    var files = fs.readdirSync(sourceDir);

    for (var i = 0; i < files.length; i++) {
      if (files[i].toString().indexOf(".env") >= 0) {
        let name = files[i].replace(".env", "");
        let envConfig = fs.readFileSync(path.join(sourceDir, files[i]), "utf8");
        var port;
        if (envConfig.includes("FABRIC_CA_HOME")) {
          port = envConfig.match(new RegExp("FABRIC_CA_SERVER_PORT=" + "(.*)" + "\n"));
        } else if (envConfig.includes("ORDERER_GENERAL")) {
          port = envConfig.match(new RegExp(":" + "(.*)" + "\n"));
        } else {
          port = envConfig.match(new RegExp("CORE_PEER_LISTENADDRESS=0.0.0.0:" + "(.*)" + "\n"));
        }
        this.envMap.set(name, envConfig);
        if (port !== null && port !== undefined) {
          this.portMap.set(name, port[1]);
        }
      }
    }

    let src = "\n # This file is Generate from ****** \n";

    Object.values(this.org).forEach((element: any) => {
      let child = Array.from(element.child);
      for (i = 0; i < child.length; i++) {
        this.addOrg(child[i]);
        let peer = this.addPeer(child[i], element.fullname, "test");
        //@ts-ignore
        this.addService(child[i], peer);
      }
    });

    let _cli = new cli();
    _cli.depends_on = this.peer;
    this.addService("cli", _cli);

    src += yaml.safeDump({ volumes: this.volumes });

    this.addNetwork("test");
    src += yaml.safeDump({ networks: this.network });
    src += yaml.safeDump({ services: this.services });
    this.saveFile(this.defaultOutputPath, src, "docker-compose.yaml");
  }

  saveFile(outputPath: string, inputFileData: string, fileName: string) {
    try {
      let filePath = path.join(outputPath, fileName);
      fs.writeFileSync(filePath, inputFileData, "utf-8");
    } catch (e) {
      console.log(e);
    }
  }

  editFile() {}
  updateNetworkConfig() {}

  addOrg(orgUrl: any) {
    this.volumes[orgUrl] = null;
  }

  addNetwork(net: string) {
    this.network[net] = null;
  }

  addService(service: string, container: any) {
    this.services[service] = container;
  }

  addPeer(name: any, org: string, network: string) {
    let node = new peer();
    let env = this.envMap.get(name);
    if (env.includes("FABRIC_CA_HOME")) {
      node.image = "hyperledger/fabric-ca:1.4";
      node.volumes = ["../keyfiles/peerOrganizations/" + org + ":/certs", name + ":/etc/hyperledger/fabric-ca-server"];
      node.command = "sh -c 'fabric-ca-server start -b admin:adminpw -d'";
    } else if (env.includes("ORDERER_GENERAL")) {
      node.image = "hyperledger/fabric-orderer:2.3.0";
      node.volumes = [
        "../genesis.block:/var/hyperledger/orderer/orderer.genesis.block",
        "../keyfiles/ordererOrganizations/" + org + "/orderers/" + name + "/msp:/var/hyperledger/orderer/msp",
        "../keyfiles/ordererOrganizations/" + org + "/orderers/" + name + "/tls/:/var/hyperledger/orderer/tls",
        name + ":/var/hyperledger/production/orderer",
      ];
      node.working_dir = "/opt/gopath/src/github.com/hyperledger/fabric";
      node.command = "orderer";
    } else {
      this.peer.push(name);
      node.image = "hyperledger/fabric-peer:2.3.0";
      node.volumes = [
        "/var/run/:/host/var/run/",
        "../keyfiles/peerOrganizations/" + org + "/peers/" + name + "/msp:/etc/hyperledger/fabric/msp",
        "../keyfiles/peerOrganizations/" + org + "/peers/" + name + "/tls:/etc/hyperledger/fabric/tls",
        name + ":/var/hyperledger/production",
      ];
      node.working_dir = "/opt/gopath/src/github.com/hyperledger/fabric/peer";
      node.command = "peer node start";
    }
    node.container_name = name;
    let envArray = env.split(/[\r\n]+/);
    envArray.pop();
    node.environment = envArray;
    node.ports = [this.portMap.get(name)];
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

export class cli {
  container_name: string = "cli";
  image: string = "image: hyperledger/fabric-tools:2.3.0";
  tty: boolean = true;
  stdin_open: boolean = true;
  environment: string[] = [
    "GOPATH=/opt/gopath",
    "CORE_VM_ENDPOINT=unix:///host/var/run/docker.sock",
    "FABRIC_LOGGING_SPEC=INFO",
  ];
  working_dir: string = "/opt/gopath/src/github.com/hyperledger/fabric/peer";
  command: string = "/bin/bash";
  volumes: string[] = [
    "/var/run/:/host/var/run/",
    "../keyfiles:/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations",
  ];
  depends_on: string[] = [""];
  networks: string[] = ["test"];
}

export default new ComposeConfig();
