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

  deleteDir(path: string) {
   fs.rmdir(path,{ recursive: true }, (err) => {
      if (err) throw err;
      console.log(path + ' was deleted');
    });
    //  try {
    //    del.sync([path + '/*/']);
    //    logger.log("INFO", `${path} is deleted!`);
    //  } catch (err) {
    //    logger.log("ERROR", `Error while deleting ${path}`);
    //  }
  }
}
