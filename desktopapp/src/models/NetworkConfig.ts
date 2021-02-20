import fs from "fs";
import store from "../store/modules/project";
const yaml = require("js-yaml");
const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
import ProjectConfig from "./ProjectConfig";
import logger from "../module/Logger";
export class NetworkConfig {
  file: any;

  constructor() {
    try {
      let filePath = path.join(
        ProjectConfig.getPath(store.state.id),
        "net-config.json"
        
      );
      this.file = editJsonFile(filePath);
      logger.log("warn","switching path: " + filePath)
      // logger.log("info","net-config path: " + ProjectConfig.getPath(store.state.id));
    } catch (e) {
      logger.log("error","error net-config path");
    }
  }

  createConfig(project: any) {
    // this.constructor();
    let data = yaml.load(
      fs.readFileSync(path.join(project.directory, "spec.yaml"), "utf8")
    );
    data = {
      ...project,
      date_modify: +new Date(),
      ...data,
    };

    let file = editJsonFile(path.join(project.directory, "net-config.json"));
    file.set("project_config", data);
    file.save();
    logger.log("info","network-config sucessfully created at " + project.directory);
  }

  updateNetworkConfig(key: string, value: any) {
   // this.constructor();
    this.file.set(key, value);
    this.file.save();
    logger.log("info","network-config sucessfully updated ");
  }


  //add data to array object
  pushValueToArray(key: string, value: any) {
    let target = this.getValue(key);
   // console.log(target)
    if (target == undefined) {
   //console.log(key)
      value = [value]    
      this.updateNetworkConfig(key, value)
    }
    else { key = key + "." + (target.length); }

    this.file.set(key, value);
    this.file.save();
  }
  getValue(key: string) {
    // to do -> read file agin before get value ****
    if (isDevelopment) {
      let filePath = path.join(path.join(path.resolve(process.cwd()), 'tests', "net-config.json"));
     // console.log(filePath);
      this.file = editJsonFile(filePath);
    }
    let data = this.file.get(key);
    if(!isDevelopment)
    logger.log("info","get value");
    return data;
  }

  getOrgName() {
    this.constructor();
    let org = this.file.data.project_config.fabric.orderers.concat(
      this.file.data.project_config.fabric.cas,
      this.file.data.project_config.fabric.peers
    );

    let newOrg: {
      [key: string]: {
        name: string;
        child: Set<string>;
        ca: boolean;
        peer: number;
        orderer: boolean;
      };
    } = {};

    org.forEach((element: string) => {
      var isCa: boolean = false;
      var isOrderer: boolean = false;
      var isPeer = false;

      let name = element.replace(/^[^.]*./gm, "");

      if (!(name in newOrg)) {
        newOrg[name] = {
          name: name,
          child: new Set(),
          ca: false,
          peer: 0,
          orderer: false,
        };
      }

      if (element.includes("orderer")) {
        isOrderer = true;
      }

      if (element.includes("ca") || newOrg[name].ca == true) {
        isCa = true;
      }

      if (element.includes("peer")) {
        isPeer = true;
      }

      newOrg[name] = {
        name: name,
        child: newOrg[name].child.add(element),
        ca: isCa,
        peer: isPeer ? (newOrg[name].peer += 1) : 0,
        orderer: isOrderer,
      };
    });
    // logger.log("info","network-config get org name");
    return newOrg;
  }
}
export default new NetworkConfig();
