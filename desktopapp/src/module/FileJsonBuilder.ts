import fs from "fs";
const yaml = require("js-yaml");
const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
export class FileJsonBuilder {
  // config:object;
  // project_config:object;
  file: any;

  constructor() {
    this.file = editJsonFile("./tests/test.json");
    // this.file.set("project_config", []);
    // this.file.save();
  }

  addProject(project: object) {
    let data = yaml.load(fs.readFileSync("./tests/spec.yaml", "utf8"));
    console.log(data);
    let projects = this.file.get().project_config;
    data = {
      ...project,
      date_modify: +new Date(),
      ...data,
    };
    projects.push(data);
    this.file.set("project_config", projects);
    this.file.save();
  }

  updateProject() {}

  deleteProject() {}
}
export default new FileJsonBuilder();
