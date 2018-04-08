import axios from 'axios';

const state = {
  polls: []
};

const getters = {
  polls: state => {
    return state.polls;
  }
};

const mutations = {
  setPolls(state, polls) {
    state.polls = polls;
  },
  addPoll(state, poll) {
    state.polls.push(poll);
  }
};

const actions = {
  setPolls(context, polls) {
    context.commit('setPolls', polls);
  },
  addPoll(context, poll) {
    context.commit('addPoll', poll);
  },
  async getPolls(context) {
    try {
      context.dispatch('setLoading', true);
      let response = await axios.get('/public-polls');
      context.dispatch('setPolls', response.data);
      context.dispatch('setLoading', false);
    } catch (error) {}
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
