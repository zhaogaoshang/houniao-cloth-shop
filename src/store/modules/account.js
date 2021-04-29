const account = {
  namespaced: true,
  state: () => ({
    agent: null
  }),
  mutations: {
    agent (state, data) {
      state.agent = data
    }
  },
  actions: { },
  getters: { }
}

export default account
