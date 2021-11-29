
const state = {
  device: 'desktop',
  vh_height: 1297,
  screenShort: false
};

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_VH_HEIGHT: (state, height) => {
    state.vh_height = height;
  },

  SET_SCREEN_SHORT: (state, flag) => {
    state.screenShort = flag;
  }
};

const actions = {
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
