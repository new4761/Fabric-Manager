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
      // logger.log("warn","switching path: " + filePath)
      store.mutations.setPath(store.state.id);
      // logger.log("info","net-config path: " + ProjectConfig.getPath(store.state.id));
    } catch (e) {
      logger.log("error", "error net-config path");
    }
  }

  createConfig(project: any, quick?: boolean) {
    // this.constructor();
    let data = yaml.load(
      fs.readFileSync(path.join(project.directory, "spec.yaml"), "utf8")
    );

    let defaultOrg = data.fabric.peers[0].replace(/^[^.]*./gm, "");

    data = {
      ...project,
      date_modify: +new Date(),
      ...data,
    };

    let filePath = path.join(path.join(path.resolve(process.cwd()), 'tests', "net-config.json"));
    let file = editJsonFile(filePath);
    file.set("project_config", data);
    if (quick) {
      file.set("channel", [{ name: "mychannel" }]);
    }
    file.save();
    logger.log(
      "info",
      "network-config sucessfully created at " + project.directory
    );
    return defaultOrg;
  }

  updateNetworkConfig(key: string, value: any) {
   // this.constructor();
    this.file.set(key, value);
    this.file.save();
    logger.log("info", "network-config sucessfully updated ");
  }


  //add data to array object
  pushValueToArray(key: string, value: any) {
    let target = this.getValue(key);
    // console.log(target)
    if (target == undefined) {
      //console.log(key)
      value = [value];
      this.updateNetworkConfig(key, value);
    } else {
      key = key + "." + target.length;
    }

    this.file.set(key, value);
    this.file.save();
  }
  getValue(key: string) {
    // to do -> read file agin before get value ****
    let filePath = path.join(ProjectConfig.getPath(store.state.id), "net-config.json");
     // console.log(filePath);
    this.file = editJsonFile(filePath);
    let data = this.file.get(key);
    
    logger.log("info","get value");
    return data;
  }
  getUniqueOrgName(data:any){
    data =this.getValue(data)
    const regex = new RegExp('[a-zA-Z]*[0-9]*.(.*)');
    const result = data.map((res:any) => res.match(regex)[1]).filter((value:any, index:number, self:any) =>self.indexOf(value) === index);
    return result
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
        fullname: string;
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
          name: "",
          fullname: name,
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
        name: name.split(".")[0],
        fullname: name,
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
