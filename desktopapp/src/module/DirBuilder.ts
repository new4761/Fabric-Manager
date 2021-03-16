import del from "del";
import fs from "fs";
// check is  isDevelopment?
const isDevelopment = process.env.NODE_ENV !== "production";
const path = require("path");
import logger from "../module/Logger";

export class DirBuilder {
  createDir_name(outputPath: string, dirName: string) {
    try {
      // check dev mode function
      // used this style for base to write function who work with files
      if (isDevelopment) {
        console.log(path.dirname(__dirname));
      }
      // let filePath = path.join(!isDevelopment ? path.join(path.dirname(__dirname), outputPath) : 'tests', fileName);
      fs.mkdir(path.join(outputPath, dirName), { recursive: true }, (err) => {
        if (err) throw err;
      });
    } catch (e) {
      console.log(e);
    }
  }
  createDir_path(outputPath: string) {
    try {
      // check dev mode function
      // used this style for base to write function who work with files
      if (isDevelopment) {
        console.log(outputPath);
      }
      if (fs.existsSync(outputPath)) {
        console.log("dir exists");
      }
      // let filePath = path.join(!isDevelopment ? path.join(path.dirname(__dirname), outputPath) : 'tests', fileName);
      else {
        fs.mkdir(outputPath, { recursive: true }, (err) => {
          if (err) throw err;
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  //delete project related files
  //using fs, yhis may cause problem later
  //TODO using specific modules instead
  deleteDir(destination: string) {
    let miniPath = path.join(destination, "minifab.cmd");
    let configPath = path.join(destination, "net-config.json");
    let specPath = path.join(destination, "spec.yaml");
    let varsPath = path.join(destination, "vars");

    console.log(miniPath);
    try {
      fs.unlinkSync(miniPath);
      fs.unlinkSync(configPath);
      fs.unlinkSync(specPath);
      fs.unlinkSync(miniPath);
    } catch (err) {
      console.error(err);
    }

    fs.rmdir(varsPath, { recursive: true }, (err) => {
      if (err) throw err;
      console.log(path + " was deleted");
    });
  }
}
