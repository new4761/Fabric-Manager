import logger from "../module/Logger";
import store from "../store/modules/project";
import ProjectConfig from "./ProjectConfig";
import NetworkConfig from "./NetworkConfig";
const yaml = require("js-yaml");
const isDevelopment = process.env.NODE_ENV !== "production";
const editJsonFile = require("edit-json-file");
const path = require("path");
export class ChannelConfig {
  file: any;
  channelName: string = "";

  setFile(channelName: string) {
    try {
      let filePath = path.join(
        ProjectConfig.getPath(store.state.id),
        "/vars/",
        channelName + "_config.json"
      );

      this.file = editJsonFile(filePath);
      this.channelName = channelName;
    } catch (e) {
      logger.log("error", "error net-config path");
    }
  }

  updateConfig(key: string, value: any) {
    if (isNaN(Number(value))) {
      this.file.set(key, value);
    } else {
      console.log("is number!!");
      this.file.set(key, Number(value));
    }
    this.file.save();
    logger.log("info", "channel-config sucessfully updated ");
    this.updateDateModify();
  }

  updateDateModify() {
    const state = NetworkConfig.getValue("channel");
    const newState = state.map((obj: any) =>
      obj.name === this.channelName ? { ...obj, date_modify: +new Date() } : obj
    );
    NetworkConfig.updateNetworkConfig("channel", newState);
    // console.log(newState);
  }

  //add data to array object
  pushValueToArray(key: string, value: any) {
    let target = this.getValue(key);
    if (target == undefined) {
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
    return data;
  }
}
export default new ChannelConfig();
