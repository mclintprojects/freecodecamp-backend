import axios from 'axios';

const state = {
  polls: [],
  options: [],
  totalVotes: 0
};

const getters = {
  polls: state => {
    return state.polls;
  },
  totalVotes: state => {
    return state.totalVotes;
  },
  options: state => {
    return state.options;
  }
};

const mutations = {
  setPolls(state, polls) {
    state.polls = polls;
  },
  addPoll(state, poll) {
    state.polls.push(poll);
  },
  setOptions(state, options) {
    state.options = options;
  },
  setTotalVotes(state, totalVotes) {
    state.totalVotes = totalVotes;
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
  },
  setOptions(context, options) {
    context.commit('setOptions', options);
  },
  setTotalVotes(context, totalVotes) {
    context.commit('setTotalVotes', totalVotes);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
