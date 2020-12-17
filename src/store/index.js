import { createStore } from 'vuex'

export default createStore({
  state: {
    firstMenuShow: true,
    leftCollapse: false,
    // url: 需要跳转的地址; params: 跳转时所带的参数(非必输)
    // go: 在history记录中向前或向后多少步
    // replace: 设置为true, 不会向history添加新记录, 其他与push类似
    globalRoute: {url: '/', params: {}, go: '', replace: false}
  },
  mutations: {
    setFirstMenuShow({firstMenuShow}, flag) {
      firstMenuShow = flag
    },
    setLeftCollapse({leftCollapse}, flag) {
      leftCollapse = flag
    },
    gotoPage({globalRouter}, route) {
      globalRouter = route
    }
  },
  actions: {
  },
  modules: {
  }
})
