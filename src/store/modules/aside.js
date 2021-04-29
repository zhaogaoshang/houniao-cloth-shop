// aside/categoryList
const aside = {
  namespaced: true,
  state: () => ({
    activeItemPath: '/category/model'
    // list: [
    //   {
    //     name: '分类模型管理',
    //     icon: 'home.png',
    //     activeIcon: 'home-se.png',
    //     path: '/category/model'
    //   },
    //   {
    //     name: '账号管理',
    //     icon: 'cloth.png',
    //     activeIcon: 'cloth-se.png',
    //     path: '/account'
    //   },
    //   {
    //     name: '项目管理',
    //     icon: 'ren.png',
    //     activeIcon: 'ren-se.png',
    //     path: '/project'
    //   },
    //   {
    //     name: '量体部位管理',
    //     icon: 'mendian.png',
    //     activeIcon: 'mendian-se.png',
    //     path: '/volume'
    //   },
    //   {
    //     name: '特体部位管理',
    //     icon: 'yuangong.png',
    //     activeIcon: 'yuangong-se.png',
    //     path: '/special'
    //   },
    //   {
    //     name: '面料管理',
    //     icon: 'mianliao.png',
    //     activeIcon: 'mianliao-se.png',
    //     path: '/cloth'
    //   },
    //   {
    //     name: '面料品牌管理',
    //     icon: 'dingdan.png',
    //     activeIcon: 'dingdan-se.png',
    //     path: '/fabric/brand'
    //   }
    // ]
  }),
  mutations: {
    switch (state, data) {
      state.activeItemPath = data
    },

    clear (state, data) {
      delete state.list
      delete state.activeItemPath
    }
  },

  /**
   * actions
  */
  actions: { },

  /**
   * getters
  */
  getters: {
    list: state => {
      return state.list
    }
  }
}

export default aside
