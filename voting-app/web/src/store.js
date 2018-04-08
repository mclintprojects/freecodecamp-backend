import Vuex from 'vuex';
import Vue from 'vue';
import poll from './store/poll';
import auth from './store/auth';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: [poll, auth]
});
