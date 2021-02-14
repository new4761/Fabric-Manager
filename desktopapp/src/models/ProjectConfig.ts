const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
import logger from "../module/Logger";
const del = require("del");

export class ProjectConfig {
  file: any;

  constructor() {
    try {
      // check dev mode function
      // used this style for base to write function who work with files
      if (!isDevelopment) {
        // logger.log("info",(path.dirname(__dirname)))
      }
      let filePath = path.join(
        !isDevelopment ? path.join(path.dirname(__dirname), "bin") : "tests",
        "projects.json"
      );
      this.file = editJsonFile(filePath);
    } catch (e) {
      logger.log("error", "projects.json path");
    }
  }

  addProject(project: any) {
    project.id = this.file.data.length++;
    project.date_modify = +new Date();
    this.file.data[project.id] = project;
    this.file.save();
    logger.log("info", "project-config: add new element");
  }

  async deleteProject(id: number) {
    let dir = this.file.data[id].directory;
    //delete directory recursively

    try {
      await del(dir);
      logger.log("INFO", `${dir} is deleted!`);
    } catch (err) {
      logger.log("ERROR", `Error while deleting ${dir}`);
    }

    logger.log("warn", "project-config: delete project id: " + id);

    if (id > -1) {
      this.file.data.splice(id, 1);
    }
    this.file.save();
  }

  getPath(id: number) {
    return this.file.data[id].directory;
  }

  updateDate(id: number) {
    this.file.data[id].set("date_modify", +new Date());
    logger.log("info", "project-config: update date_modify");
  }

  updateProjectConfig(id: number, key: string, value: any) {
    this.file.data[id].set(key, value);
    this.file.save();
    logger.log("info", "project-config: update key-value");
  }

  getValue(key: string) {}
}
export default new ProjectConfig();
