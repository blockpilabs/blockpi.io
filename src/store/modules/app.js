
const state = {
  device: 'desktop',
  direction: 'portrait'
};

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_ORIENTATION: (state, direction) => {
    state.direction = direction;
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
