import fs from "fs";
const yaml = require("js-yaml");
const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
import ProjectConfig from "./ProjectConfig";
export class NetworkConfig {
  file: any;

  constructor() {
    try {
      // check dev mode function
      // used this style for base to write function who work with files
      if (!isDevelopment) {
        // console.log(path.dirname(__dirname));
      }
      let filePath = path.join(
        !isDevelopment
          ? path.join(path.dirname(__dirname), ProjectConfig.getPath)
          : "tests",
        "net-config.json"
      );
      this.file = editJsonFile(filePath);
      // console.log("net-config path: " + filePath);
    } catch (e) {
      console.log(e);
    }
  }

  createConfig(project: object) {
    let data = yaml.load(
      fs.readFileSync(path.join(ProjectConfig.getPath, "spec.yaml"), "utf8")
    );
    console.log("yaml data: " + data);
    data = {
      ...project,
      date_modify: +new Date(),
      ...data,
    };
    this.file.set("project_config", data);
    this.file.save();
  }

  updateNetworkConfig(key: string, value: any) {
    this.file.set(key, value);
    this.file.save();
  }


  //add data to array object
  pushValueToArray(key: string, value: any) {
    let target = this.getValue(key);
    //console.log(target)
    if (target == undefined) {
   //   console.log(key)
      value = [value]    
      this.updateNetworkConfig(key, value)
    }
    else { key = key + "." + (target.length); }
    //console.log(key+".["+(target.length+1)+"]")
   // key = key + "." + (target.length);

    this.file.set(key, value);
    //this.file.set(key, value);
    this.file.save();
  }
  getValue(key: string) {
    // to do -> read file agin before get value ****
    if (isDevelopment) {
      let filePath = path.join(path.join(path.resolve(process.cwd()), 'tests', "net-config.json"));
      console.log(filePath);
      this.file = editJsonFile(filePath);
    }
    let data = this.file.get(key);
    return data;
  }

  getOrgName() {
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

    return newOrg;
  }
}
export default new NetworkConfig();
