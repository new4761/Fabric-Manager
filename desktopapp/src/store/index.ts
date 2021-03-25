import Vue from "vue";
import Vuex from "vuex";
import project from "./modules/project";
import docker from "./modules/docker";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    platform: "",
    process: null,
    processContext: "",
    processStatus: false,
    result: {
      status: "",
      message: "",
    },
  },
  mutations: {
    setPlatform(state: any, platform: string) {
      state.platform = platform;
    },
    setProcess(state: any, process: any) {
      state.process = process;
    },
    setProcessStatus(state: any, processStatus: any) {
      state.processStatus = processStatus;
    },
    setProcessContext(state: any, processContext: any) {
      state.processContext = processContext;
    },
    setResult(state: any, result: object) {
      state.result = result;
    },
  },

  getters: {},

  actions: {},
  modules: {
    project,
    docker,
  },
});
