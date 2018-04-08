import axios from 'axios';
import eventbus from '../eventbus';

const state = {
  token: '',
  email: '',
  userLoggedIn: false,
  isLoading: false
};

const getters = {
  token: state => {
    return state.token;
  },
  userLoggedIn: state => {
    return state.userLoggedIn;
  },
  email: state => {
    return state.email;
  },
  isLoading: state => {
    return state.isLoading;
  }
};

const mutations = {
  login(state, loginData) {
    state.userLoggedIn = true;
    state.email = loginData.email;
    state.token = loginData.token;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  }
};

const actions = {
  login(context, loginData) {
    context.commit('setLoading', true);

    axios
      .post('/users/auth', loginData)
      .then(response => {
        context.commit('login', response.data);
        context.commit('setLoading', false);
        eventbus.$emit('login-success', 'Login successful');
      })
      .catch(error => {
        eventbus.$emit('login-failure', error.response.data.error);
      });
  },
  register(context, loginData) {
    context.commit('setLoading', true);

    axios
      .post('/users', loginData)
      .then(response => {
        context.commit('login', response.data);
        context.commit('setLoading', false);
        eventbus.$emit('registration-success', 'Registration successful');
      })
      .catch(error => {
        eventbus.$emit('registration-failure', error.response.data.error);
      });
  },
  setLoading(context, isLoading) {
    context.commit('setLoading', isLoading);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
