import DockerProcess from "../../module/DockerProcess";
import NetworkConfig from "../../models/NetworkConfig";

// initial state
const state = {
  networkId: "",
  container: [],
  orgContainer: [],
  activeContainer: [],
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
        console.log("set from docker process " + result.length);
        state.container = result;
        return;
      })
      .catch((err: any) => {
        // console.log(err);
      });
  },

  setOrgContainer() {
    state.orgContainer = NetworkConfig.getValue(
      "project_config.fabric.orderers"
    ).concat(
      NetworkConfig.getValue("project_config.fabric.cas"),
      NetworkConfig.getValue("project_config.fabric.peers")
    );
  },

  async setActiveContainer() {
    await mutations.setContainer();
    // state.activeContainer = [];
    // @ts-ignore
    let temp = [];
    state.container.forEach((element: any, index: number) => {
      var el = state.orgContainer.find((a: string) =>
        a.includes(element.Names[0].replace(/\//g, ""))
      );

      if (el !== undefined) {
        // @ts-ignore
        temp.push(element);
      }
    });
    // @ts-ignore
    state.activeContainer = temp;
    console.log("store set to " + state.activeContainer);
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
