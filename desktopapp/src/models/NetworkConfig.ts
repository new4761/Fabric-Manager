import fs from "fs";

import logger from "../module/Logger";
import store from "../store/modules/project";
import ProjectConfig from "./ProjectConfig";

const yaml = require("js-yaml");
const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
export class NetworkConfig {
  file: any;

  constructor() {
    try {
      //set filepath
      let filePath = path.join(
        ProjectConfig.getPath(store.state.id),
        "net-config.json"
      );
      this.file = editJsonFile(filePath);
      //set store
      store.mutations.setPath(store.state.id);
    } catch (e) {
      logger.log("error", "error net-config path");
    }
  }

  //create new network-config
  //reading spec.yaml file and add it to the config
  //if using default channel, it will also add it
  createConfig(project: any, quick?: boolean, channelName?: string) {
    //load yaml
    let data = yaml.load(
      fs.readFileSync(path.join(project.directory, "spec.yaml"), "utf8")
    );
    //set first peer org to default org
    let defaultOrg = data.fabric.peers[0].replace(/^[^.]*./gm, "");
    data = {
      ...project,
      date_modify: +new Date(),
      ...data,
    };
    //set config file directory
    let file = editJsonFile(path.join(project.directory, "net-config.json"));
    file.set("project_config", data);
    //check if using default channel
    if (quick) {
      file.set("channel", [
        {
          name: channelName,
          date_create: +new Date(),
          date_modify: +new Date(),
        },
      ]);
    }
    //save file
    file.save();
    logger.log(
      "info",
      "network-config sucessfully created at " + project.directory
    );
    //return config object
    return defaultOrg;
  }

  //update config using value
  updateNetworkConfig(key: string, value: any) {
    this.file.set(key, value);
    this.file.save();
    logger.log("info", "network-config sucessfully updated ");
    ProjectConfig.updateDate(store.state.id);
  }

  //add data to array object
  pushValueToArray(key: string, value: any) {
    let target = this.getValue(key);
    if (target == undefined) {
      value = [value];
      this.updateNetworkConfig(key, value);
    } else {
      key = key + "." + target.length;
    }

    this.file.set(key, value);
    this.file.save();
    ProjectConfig.updateDate(store.state.id);
  }

  getValue(key: string) {
    // to do -> read file agin before get value ****
    let filePath = path.join(
      ProjectConfig.getPath(store.state.id),
      "net-config.json"
    );
    // console.log(filePath);
    this.file = editJsonFile(filePath);
    let data = this.file.get(key);

    // logger.log("info", "get " + key);
    return data;
  }

  getUniqueOrgName(data: any) {
    data = this.getValue(data);
    const regex = new RegExp("[a-zA-Z]*[0-9]*.(.*)");
    if (data != undefined) {
      const result = data
        .map((res: any) => res.match(regex)[1])
        .filter(
          (value: any, index: number, self: any) =>
            self.indexOf(value) === index
        );
      return result;
    } else {
      console.log("error from getUniqueOrgName()");
      return [];
    }
  }

  getOrgData() {
    //read file, refresh
    this.constructor();
    //get all container name
    var org;
    try {
      org = this.file.data.project_config.fabric.orderers.concat(
        this.file.data.project_config.fabric.cas,
        this.file.data.project_config.fabric.peers
      );
    } catch (error) {
      return {};
    }

    //set object structure
    let newOrg: {
      [key: string]: {
        name: string;
        fullname: string;
        child: Set<string>;
        container: Array<object>;
        ca: boolean;
        peer: number;
        orderer: boolean;
      };
    } = {};

    //set data
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
          container: [],
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
        container: [],
        ca: isCa,
        peer: isPeer ? (newOrg[name].peer += 1) : 0,
        orderer: isOrderer,
      };
    });
    return newOrg;
  }
}
export default new NetworkConfig();
