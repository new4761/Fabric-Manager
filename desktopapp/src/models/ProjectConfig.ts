import fs from "fs";
const yaml = require("js-yaml");
const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
export class ProjectConfig {
  file: any;

  constructor() {
    try {
      // check dev mode function
      // used this style for base to write function who work with files
      if (!isDevelopment) {
        console.log(path.dirname(__dirname));
      }
      let filePath = path.join(
        !isDevelopment ? path.join(path.dirname(__dirname), "bin") : "tests",
        "projects.json"
      );
      this.file = editJsonFile(filePath);
    } catch (e) {
      console.log(e);
    }
  }

  addProject(project: object) {}

  deleteProject(id:number) {}

  getPath(id:number){
      return this.file.data[0].directory;
  }

  updateProjectConfig(key: string, value: any) {}

  getValue(key: string) {}
}
export default new ProjectConfig();
