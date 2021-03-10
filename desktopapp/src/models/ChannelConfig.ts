import fs from "fs";
import store from "../store/modules/project";
const yaml = require("js-yaml");
const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
import ProjectConfig from "./ProjectConfig";
import logger from "../module/Logger";
export class ChannelConfig {
  file: any;

  setFile(channelName: string) {
    try {
      let filePath = path.join(
        ProjectConfig.getPath(store.state.id),
        "/vars/",
        channelName + "_config.json"
      );

      this.file = editJsonFile(filePath);
      console.log(this.file);
    } catch (e) {
      logger.log("error", "error net-config path");
    }
  }

  updateConfig(key: string, value: any) {
    console.log(this.getValue(key));
    this.file.set(key, value);
    this.file.save();
    logger.log("info", "channel-config sucessfully updated ");
    console.log(this.file);
  }

  //add data to array object
  pushValueToArray(key: string, value: any) {
    let target = this.getValue(key);
    // console.log(target)
    if (target == undefined) {
      //console.log(key)
      value = [value];
      this.updateConfig(key, value);
    } else {
      key = key + "." + target.length;
    }

    this.file.set(key, value);
    this.file.save();
  }

  getValue(key: string) {
    let data = this.file.get(key);

    logger.log("info", "get " + key);
    return data;
  }
}
export default new ChannelConfig();
