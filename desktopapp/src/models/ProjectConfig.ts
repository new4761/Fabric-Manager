import FileManager from "../module/FileManager";
import logger from "../module/Logger";

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
        // logger.log("info",(path.dirname(__dirname)))
      }
      let filePath = path.join(
        !isDevelopment ? path.join(process.resourcesPath,"extraResources","config") : "tests",
        "projects.json"
      );
      this.file = editJsonFile(filePath);
    } catch (e) {
      logger.log("error", "projects.json path");
    }
  }

  //add new project to config file
  addProject(project: any) {
    project.id = this.file.data.length++;
    project.date_modify = +new Date();
    this.file.data[project.id] = project;
    this.file.save();
    logger.log("info", "project-config: add new element");
    return project.id;
  }

  //delete project from config file
  deleteProject(id: number) {
    let target = this.file.data.find((element: any) => element.id == id);
    let dir = target.directory;
    console.log(dir);
    FileManager.cleanUpDir(dir);
    logger.log(
      "warn",
      "project-config: delete project id: " + target.id + "at: " + dir
    );

    //remove project object form array
    if (target.id > -1) {
      this.file.data.splice(
        this.file.data.findIndex((element: any) => element.id == id),
        1
      );
    }
    this.file.save();
  }

  //get current project path
  getPath(id: number) {
    let target = this.file.data.find((element: any) => element.id == id);
    return target.directory;
  }

  //??
  getPathResolve(id: number) {
    let target = this.file.data.find((element: any) => element.id == id);
    return target.directory;
  }

  //update modify date
  updateDate(id: number) {
    let target = this.file.data.find((element: any) => element.id == id);
    let index = this.file.data.indexOf(target);
    console.log(this.file.data[index]);
    this.file.data[index].date_modify = +new Date();
    this.file.save();
    logger.log("info", "project-config: update date_modify");
  }

  //update config using key
  // updateProjectConfig(id: number, key: string, value: any) {
  //   this.updateDate(id);
  //   this.file.data[id].set(key, value);
  //   this.file.save();
  //   logger.log("info", "project-config: update key-value");
  // }

  //get config value using key
  getValue(key: string) {}
}
export default new ProjectConfig();
