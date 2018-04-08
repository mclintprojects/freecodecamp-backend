// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store';
import axios from 'axios';
import VueToasted from 'vue-toasted';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueToasted);

const router = new VueRouter({
  routes,
  mode: 'history'
});

axios.defaults.baseURL = 'https://open-border.glitch.me';
//axios.defaults.

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
