const category = {
  namespaced: true,
  state: () => ({
    agent: null
  }),
  mutations: {
    agent (state, data) {
      state.agent = data
    },

    // 初始化选中
    initActive (state, data) {
      state.agent.children.forEach(item => {
        item.active = false
      })
    },

    // 设置 选中
    setActives (state, data) {
      state.agent.children.forEach(item => {
        if (data.categoryUuIds.includes(item.uuid)) {
          item.active = true
        } else {
          item.active = false
        }
      })
    }
  },
  actions: { },
  getters: { }
}

export default category
