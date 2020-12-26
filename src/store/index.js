import { createStore } from 'vuex'
import user from '../views/user/store'

export default createStore({
  state: {
    firstMenuShow: true,
    needLogin: true,
    userInfo: {
      name: ''
    },
    opCardShow: false
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
    },
    setOpCardShow(state, payload) {
      state.opCardShow = payload.flag
    }
  },
  actions: {
    /**
     * 从sessionStorage获取用户信息并保存至state中(为了保证刷新后留在当前页面)
     * @param {String} payload 用户信息
     */
    getUserInfo({commit}, payload) {
      commit('setUserInfo', {
        name: JSON.parse(payload).name
      })
    }
  },
  modules: {
    user
  }
})
