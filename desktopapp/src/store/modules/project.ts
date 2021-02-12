import ProjectConfig from "../../models/ProjectConfig";

// initial state
const state = {
  path: "",
  id: null,
};

// getters
const getters = {
  getPath(id: number) {
    return ProjectConfig.getPath();
  },
  getId() {
    return state.id;
  },
};

// actions
const actions = {};

// mutations
const mutations = {
  setId(state:any, id: number) {
    state.id = id;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
