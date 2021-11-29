import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import permission from './modules/permission';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    toolbarRouteAppend: {}
  },
  getters,
  mutations: {
    setToolbarRouteAppend(state, data) {
      state.toolbarRouteAppend = data;
    }
  }
});

export default store;
