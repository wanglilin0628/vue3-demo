import { createStore } from 'vuex'

export default createStore({
  state: {
    firstMenuShow: true,
    leftCollapse: false
  },
  mutations: {
    setFirstMenuShow({firstMenuShow}, flag) {
      firstMenuShow = flag
    },
    setLeftCollapse({leftCollapse}, flag) {
      leftCollapse = flag
    }
  },
  actions: {
  },
  modules: {
  }
})
