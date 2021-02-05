import fs from "fs";
const yaml = require("js-yaml");
const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
export class ProjectConfig {
  file: any;

  constructor() {
    this.file = editJsonFile("./tests/net-config.json");
  }

  addProject(project: object) {
    let data = yaml.load(fs.readFileSync("./tests/spec.yaml", "utf8"));
    console.log(data);
    data = {
      ...project,
      date_modify: +new Date(),
      ...data,
    };
    this.file.set("project_config", data);
    this.file.save();
  }

  updateConfig(key: string, value: any) {
    this.file.set(key, value);
    this.file.save();
  }

  GetValue(key:string) {
    let data = this.file.get(key);
    return data;
  }

  getPath() {
    console.log(this.file.data.project_config.directory);
    return this.file.data.project_config.directory;
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
export default new ProjectConfig();
