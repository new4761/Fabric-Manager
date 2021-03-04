import Vue from "vue";
import Vuex from "vuex";
import project from "./modules/project";
import docker from "./modules/docker";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    platform: "",
    process: null,
  },
  mutations: {
    setPlatform(state: any, platform: string) {
      state.platform = platform;
    },
    setProcess(state: any, process: any) {
      state.process = process;
      // console.log(state.process);
    },
  },

  getters: {},

  actions: {},
  modules: {
    project,
    docker,
  },
  // plugins: [createPersistedState()],
});
