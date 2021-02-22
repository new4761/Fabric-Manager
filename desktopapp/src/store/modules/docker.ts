import DockerProcess from "../../module/DockerProcess";
import NetworkConfig from "../../models/NetworkConfig";

// initial state
const state = {
  networkId: "",
  container: [],
  orgContainer: [],
  activeContainer: Array(),
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

  getActiveContainerCount() {
    return state.activeContainer.length;
  },
};

// actions
const actions = {};

// mutations
const mutations = {
  //set

  setContainer() {
    DockerProcess.listContainer()
      .then((result: any) => {
        state.container = result;
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

  setActiveContainer() {
    state.activeContainer = [];
    state.container.forEach((element: any, index: number) => {
      var el = state.orgContainer.find((a: string) =>
        a.includes(element.Names[0].replace(/\//g, ""))
      );

      if (el !== undefined) {
        state.activeContainer.push(element);
      }
    });
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
