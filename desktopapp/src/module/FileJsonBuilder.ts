import fs from "fs";
const yaml = require("js-yaml");
const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
export class FileJsonBuilder {
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

  updateConfig(key:string, value:any) {
    this.file.set(key, value);
    this.file.save();
  }

  
}
export default new FileJsonBuilder();
