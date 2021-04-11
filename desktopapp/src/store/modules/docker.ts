import DockerProcess from "../../module/DockerProcess";
import NetworkConfig from "../../models/NetworkConfig";
import ConsoleProcess from "@/module/ChainCode/ConsoleProcess";

// initial state
const state = {
  networkId: "",
  container: [],
  orgContainer: [],
  activeContainer: [],
  isOnline: false,
};

// getters
const getters = {
  getRunningContainer() {},

  getContainer() {
    return state.container;
  },
  getContainerCount() {
    return state.orgContainer.length;
  },
  getActiveContainer() {
    return state.activeContainer;
  },

  getActiveContainerCount() {
    return state.activeContainer.length;
  },
};

// actions
const actions = {};

// mutations
const mutations = {
  //set

  async setContainer() {
    await DockerProcess.listContainer()
      .then((result: any) => {
        state.container = result;
        return;
      })
      .catch((err: any) => {
        // console.log(err);
      });
  },

  setOrgContainer() {
    try {
      state.orgContainer = NetworkConfig.getValue("project_config.fabric.orderers").concat(
        NetworkConfig.getValue("project_config.fabric.cas"),
        NetworkConfig.getValue("project_config.fabric.peers")
      );
    } catch (error) {
      //TODO error
      return;
    }
  },

  async setActiveContainer() {
    await mutations.setContainer();
    // state.activeContainer = [];
    // @ts-ignore
    let temp = [];
    try {
      state.container.forEach((element: any, index: number) => {
        var el = state.orgContainer.find((a: string) => a.includes(element.Names[0].replace(/\//g, "")));

        if (el !== undefined) {
          // @ts-ignore
          temp.push(element);
        }
      });
      if (temp.length > 0) {
        state.isOnline = true;
      } else {
        state.isOnline = false;
      }
      // @ts-ignore
      state.activeContainer = temp;
    } catch (e) {
      // console.log(e);
    }
  },

  setNetworkId() {},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
