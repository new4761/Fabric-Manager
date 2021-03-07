import ProjectConfig from "../../models/ProjectConfig";

// initial state
const state = {
  path: "",
  id: 0,
};

// getters
const getters = {
  getPath(id: number) {
    console.log("setpath project id: " + id)
    return ProjectConfig.getPath(id);
  },
  getId() {
    console.log("return project id: " + state.id)
    return state.id;
  },

};

// actions
const actions = {};

// mutations
const mutations = {
  setId(state: any, id: number) {
    state.id = id;
  },

  setPath(id: number) {
    state.path = ProjectConfig.getPath(id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
