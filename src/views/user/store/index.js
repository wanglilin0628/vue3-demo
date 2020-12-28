import Axios from 'axios'
import { addRecord } from '../../../scripts/useRecord'

export default {
  namespaced: true,
  state: {
    userList: [],
    record: {
      username: '',
      flag: '',
      state: '',
      remark: null
    }
  },
  mutations: {
    setUserList(state, payload) {
      state.userList = payload
    },
    deleteUser(state, payload) {
      state.userList.splice(payload.index, 1)
    },
    setRecord(state, payload) {
      state.record.username = JSON.parse(window.sessionStorage.getItem('userInfo'))?.username
      state.record.flag = payload.flag
      state.record.state = payload.state
      state.record.remark = payload.remark
    }
  },
  actions: {
    /**
     * 发送请求获取用户列表
     */
    getUserList({commit}) {
      Axios.post('/api/user/getUserlist', {}).then((res) => {
        commit('setUserList', res.data)
      }).catch((e) => {
        console.log('获取用户列表异常:', e)
      })
    },

    /**
     * 删除用户
     */
    async deleteUser({commit}, payload) {
      try {
        const res = await Axios.post('api/user/delete', {username: payload.username})
        if (res.status === 200) {
          commit('deleteUser', payload)
          return true
        }
        return false
      } catch (e) {
        console.log('用户删除失败: ', e)
        return false
      }
    },

    /**
     * 新增用户
     */
    async addUser({commit}, payload) {
      const res = await Axios.post('/api/user/add', {userInfo: payload.userInfo})
      return res
    },
    /**
     * 更新用户
     */
    async updateUser({commit}, payload) {
      const res = await Axios.post('/api/user/update', {userInfo: payload.userInfo})
      return res
    },

    /**
     * 新增记录
     */
    addUserRecord({commit, state}, payload) {
      commit('setRecord', payload)
      addRecord(state.record)
    }
  },
  devtools: true
}
