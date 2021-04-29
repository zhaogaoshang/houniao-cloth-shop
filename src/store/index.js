import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user' // 用户模块
import aside from './modules/aside' // 男装女装左边侧边栏的
import cloth from './modules/cloth' // 面料
import staff from './modules/staff' // 面料
import client from './modules/client' // 面料
import category from './modules/category' // 分类模型
import account from './modules/account' // 账号
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['aside', 'user', 'client', 'category', 'account']
})

const store = new Vuex.Store({
  modules: {
    user,
    aside,
    cloth,
    staff,
    client,
    account,
    category
  },
  state: {
  },
  mutations: {
  },
  plugins: [vuexLocal.plugin]
})

export default store
