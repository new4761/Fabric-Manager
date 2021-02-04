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
        console.log(path.dirname(__dirname));
      }
      let filePath = path.join(
        !isDevelopment
          ? path.join(path.dirname(__dirname), ProjectConfig.getPath)
          : "tests",
        "net-config.json"
      );
      this.file = editJsonFile(filePath);
      console.log("net-config path: " + filePath);
    } catch (e) {
      console.log(e);
    }
  }

  createConfig(project: object) {
    let data = yaml.load(fs.readFileSync(path.join(ProjectConfig.getPath,"spec.yaml"), "utf8"));
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

  getValue(key: string) {
    let data = this.file.get(key);
    return data;
  }

  getOrgName() {
    let org = this.file.data.project_config.fabric.orderers.concat(
      this.file.data.project_config.fabric.peers
    );
    org.forEach((element: any, index: any) => {
      org[index] = element.replace(/^[^.]*./gm, "");
    });
    org = [...new Set(org)];
    return org;
  }
}
export default new NetworkConfig();
