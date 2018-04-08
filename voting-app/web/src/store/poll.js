const state = {
  polls: []
};

const getters = {
  polls: state => {
    return state.polls;
  }
};

const mutations = {
  setPoll(state, polls) {
    state.polls = polls;
  }
};

const actions = {
  setPoll(context, polls) {
    context.commit('setPoll', polls);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
