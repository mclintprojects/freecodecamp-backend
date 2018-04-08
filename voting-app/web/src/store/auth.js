import axios from 'axios';
import eventbus from '../eventbus';

const state = {
  token: '',
  email: '',
  id: '',
  userLoggedIn: false,
  isLoading: false
};

const getters = {
  token: state => {
    return state.token;
  },
  id: state => {
    return state.id;
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
    state.id = loginData.id;
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      loginData.token
    }`;

    localStorage.setItem('auth', JSON.stringify(loginData));
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
  loginLocal(context) {
    let json = localStorage.getItem('auth');
    if (json) {
      let auth = JSON.parse(json);
      context.commit('login', auth);
    }
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
