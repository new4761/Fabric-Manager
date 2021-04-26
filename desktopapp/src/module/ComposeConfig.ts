// Class for create configtx,yaml for NetworkConfig
const path = require("path");
import fs from "fs";
const yaml = require("js-yaml");
import { YamlConfig } from "yaml-config";
import { FileYamlBuilder } from "../module/FileYamlBuilder";
import ProjectConfig from "@/models/ProjectConfig";
import NetworkConfig from "@/models/NetworkConfig";
//    
import store from "../store/modules/project";
class ComposeConfig extends FileYamlBuilder implements YamlConfig {
  fileName: string;
  defaultOutputPath: string;

  volumes: any = {};
  network: any = {};
  services: any = {};
  peer: any = new Set();
  envMap: any;
  portMap: any;
  org: any;
  first_orderer_org: any;
  network_name = "test_network"
  constructor() {
    super();
    this.fileName = "compose.yaml";
    this.defaultOutputPath = "./tests";
  }
  getUserInput() { }
  createFile() {
    this.envMap = new Map();
    this.portMap = new Map();
    this.org = NetworkConfig.getOrgData();
    this.first_orderer_org = Object.values(this.org).find((element: any) => element.orderer == true);
    // console.log(first_orderer_org)
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
      // console.log(this.portMap)
    }

    let src = "\n # This file is Generate from ****** \n";

    let orgs: any[] = [];
    Object.values(this.org).forEach((element: any) => {
      let child = Array.from(element.child);
      for (i = 0; i < child.length; i++) {
        // this.addOrg(child[i]);
        // let peer = this.addPeer(child[i], element.fullname, "test");
        // //@ts-ignore
        // this.addService(child[i], peer);
        //indexing org list
        //@ts-ignore
        orgs.push({ name: child[i], org: element.fullname, index: this.indexingOrgList(child[i])});
      }
    });
    //@ts-ignore
    orgs = orgs.sort((a: any, b: any) => {
      // console.log("a:",a.name, a.index, " ", "b:",b.name, b.index)
      if (a.index >b.index ) {
        return 1;
      }
      if (a.index < b.index  ) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }
      )
    // console.log(orgs);

    for (i = 0; i < orgs.length; i++) {
      this.addOrg(orgs[i].name);
      let peer = this.addPeer(orgs[i].name, orgs[i].org, "test", (7000 + i));
      //@ts-ignore
      this.addService(orgs[i].name, peer);
    }

    let _cli = new cli();
    _cli.depends_on = Array.from(this.peer);
    this.addService("cli", _cli);
    src+= {"version": '2.4'}
    src += yaml.safeDump({ volumes: this.volumes });

    this.addNetwork("test");
    src += yaml.safeDump({ networks: this.network });
    src += yaml.safeDump({ services: this.services });
    // console.log(src)
    this.saveFile(this.defaultOutputPath, src, "docker-compose.yaml");
  }
  indexingOrgList(org: string) {
    let ordererReg = new RegExp('orderer');
    let peerReg = new RegExp('peer');
    switch (true) {
      case ordererReg.test(org):
        // code block
        return 2
        break;
      case peerReg.test(org):
        // code block
        return 1
        break;
      default:
        return 0
      // code block
    }

  }
  saveFile(outputPath: string, inputFileData: string, fileName: string) {
    try {
      let filePath = path.join(outputPath, fileName);
      fs.writeFileSync(filePath, inputFileData, "utf-8");
    } catch (e) {
      console.log(e);
    }
  }

  editFile() { }
  updateNetworkConfig() { }

  addOrg(orgUrl: any) {
    this.volumes[orgUrl] = null;
  }

  addNetwork(net: string) {
    this.network[net] = { "name": this.network_name };
  }

  addService(service: string, container: any) {
    this.services[service] = container;
  }

  addPeer(name: any, org: string, network: string, port: number) {
    let node = new peer();
    let type;
    let env = this.envMap.get(name);
    if (env.includes("FABRIC_CA_HOME")) {
      type = "ca";
      node.image = "hyperledger/fabric-ca:1.4";
      node.volumes = ["../keyfiles/peerOrganizations/" + org + ":/certs",
      name + ":/etc/hyperledger/fabric-ca-server"];
      node.command = "sh -c 'fabric-ca-server start -b admin:adminpw -d'";
      node.volumes = [
        './cli/keyfiles/peerOrganizations/' + org + ':/certs',
        'ca1.' + org + ':/etc/hyperledger/fabric-ca-server'
      ]
    } else if (env.includes("ORDERER_GENERAL")) {
      node.image = "hyperledger/fabric-orderer:2.3.0";
      type = "orderer";
      node.volumes = [
        "./cli/genesis.block:/var/hyperledger/orderer/orderer.genesis.block",
        "./cli/keyfiles/ordererOrganizations/" + org + "/orderers/" + name + "/msp:/var/hyperledger/orderer/msp",
        "./cli/keyfiles/ordererOrganizations/" + org + "/orderers/" + name + "/tls/:/var/hyperledger/orderer/tls",
        name + ":/var/hyperledger/production/orderer",
      ];
      node.working_dir = "/opt/gopath/src/github.com/hyperledger/fabric";
      node.command = "orderer";
    } else {
      type = "peer";
      this.peer.add(name);
      node.image = "hyperledger/fabric-peer:2.3.0";
      node.volumes = [
        // for window docker daemon socket
        "//var/run/:/host/var/run/",
        './cli:/opt/gopath/src/github.com/hyperledger/fabric/cli',
        "./cli/keyfiles/peerOrganizations/" + org + "/peers/" + name + "/msp:/etc/hyperledger/fabric/msp",
        "./cli/keyfiles/peerOrganizations/" + org + "/peers/" + name + "/tls:/etc/hyperledger/fabric/tls",
        name + ":/var/hyperledger/production",
        "./cli/keyfiles/peerOrganizations/" + org + "/users:/opt/gopath/src/github.com/hyperledger/fabric/peer/users",
        "./cli/keyfiles/ordererOrganizations:/opt/gopath/src/github.com/hyperledger/fabric/orderers"
      ];
      node.working_dir = "/opt/gopath/src/github.com/hyperledger/fabric/peer";
      node.command = "peer node start";
    }
    node.container_name = name;
    let envArray = env.split(/[\r\n]+/);
    envArray.pop();
    if (type === "peer") {
      envArray.push("ORDERER_TLS_CA=/opt/gopath/src/github.com/hyperledger/fabric/orderers/" + this.first_orderer_org.fullname + "/orderers/orderer1." + this.first_orderer_org.fullname + "/tls/ca.crt")
      envArray[1] = "CORE_VM_DOCKER_HOSTCONFIG_NETWORKMODE=" + this.network_name
      // envArray.push("CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/msp/users/Admin@" + org + "/msp");
    }
    if (type === "ca") {
      envArray.push("FABRIC_CA_CLIENT_TLS_CERTFILES=/certs/ca/"+name+ "-cert.pem");
    }
    // if (type === "orderer") {
    //   envArray.push("FABRIC_CA_CLIENT_TLS_CERTFILES=/certs/ca/ca1."+ org +"-cert.pem");
    // }
    node.environment = envArray;
    node.ports = [port + ":" + this.portMap.get(name)];
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
  image: string = "hyperledger/fabric-tools:2.3.0";
  tty: boolean = true;
  stdin_open: boolean = true;
  environment: string[] = [
    "CORE_VM_ENDPOINT=unix:///host/var/run/docker.sock",
    "FABRIC_LOGGING_SPEC=INFO",
    "FABRIC_CFG_PATH=/opt/gopath/src/github.com/hyperledger/fabric"
  ];
  working_dir: string = "/opt/gopath/src/github.com/hyperledger/fabric/";
  command: string = "/bin/bash";
  // for window docker daemon socket
  volumes: string[] = ["//var/run/:/host/var/run/",
    "./cli:/opt/gopath/src/github.com/hyperledger/fabric"];
  depends_on: string[] = [""];
  networks: string[] = ["test"];
}

export default new ComposeConfig();
