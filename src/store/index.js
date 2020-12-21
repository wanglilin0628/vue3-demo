import { createStore } from 'vuex'

export default createStore({
  state: {
    firstMenuShow: true,
    leftCollapse: false,
    needLogin: true,
    userInfo: {
      name: ''
    }
  },
  mutations: {
    setFirstMenuShow(state, payload) {
      state.firstMenuShow = payload.flag
    },
    setNeedLogin(state, payload) {
      state.needLogin = payload.flag
    },
    setUserInfo(state, payload) {
      state.userInfo.name = payload.name
    }
  },
  actions: {
  },
  modules: {
  }
})
