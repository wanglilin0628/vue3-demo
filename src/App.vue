<template>
<!-- <login></login> -->
  <div class="top-wrapper">
    <login v-if="needLogin"></login>
    <div v-else class="main-wrapper">
      <header class="main-header">
        <!-- logo区域 -->
        <div class="main-logo-area">
          <span class="app-icon">Wanglilin</span>
          <img class="app-logo" src="../src/assets/logo.png" />
          <h1 class="app-title" style="color:white">{{title}}</h1>
        </div>
        <!-- 用户信息区域 -->
        <div class="user-info" style="color: white;">
          <div class="user-info-wrapper">
            <i class="el-icon-user-solid user-name-icon"></i>
            <div class="user-name">{{name}}</div>
          </div>
          <i class="el-icon-circle-close user-logout" @click="logout"></i>
        </div>
      </header>
      <async-menu></async-menu>
      <section class="main-section">
        <router-view></router-view>
        <footer class="layout-footer is-absolute">vue3测试</footer>
      </section>
    </div>
  </div>
</template>

<script>
import AsyncMenu from '@/views/async_menu'
import Login from '@/views/login'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: '',
  components: {
    AsyncMenu,
    Login
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const title = ref('Vue3-demo')

    if (window.sessionStorage.getItem('needLogin') === 'false') {
      store.dispatch('getUserInfo', window.sessionStorage.getItem('userInfo'))
      store.commit('setNeedLogin', {flag: false})
    }
    const needLogin = computed(() => store.state.needLogin)
    const name = computed(() => store.state.userInfo.name)
    function logout() {
      if (window.confirm('是否确认退出?')) {
        needLogin.value = true
        window.sessionStorage.clear()
        router.go(0)
      }
    }
    return {
      title,
      name,
      needLogin,
      logout
    }
  }
}

/**
 * 用户信息数据与相关逻辑
 */
// function useUserInfo() {
//   const userInfo = reactive
// }
</script>

<style lang="scss">
  .top-wrapper {
    width: 100%;
    height: 100%;
    min-width: 1200px;
    .main-wrapper {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      header.main-header {
        background-color: rgb(49, 58, 67);
        display: block;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        width: 100%;
        height: 48px;
        z-index: 4;
        padding: 0;
        .main-logo-area {
          left: 16px;
          position: absolute;
          display: flex;
          align-items: center;
          .app-icon {
            color: white;
            font-weight: bolder;
            font-size: 19px;
            margin-right: 10px;
          }
          .app-logo {
            width: 36px;
            height: 36px;
            // color: #e25355;
          }
          .app-title {
            font-size: 19px;
            font-weight: 700;
            margin-left: 10px;
          }
        }
        .user-info {
          position: absolute;
          right: 20px;
          top: 50%;
          width: 280px;
          margin-top: -15px;
          .user-info-wrapper {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            color: #dfe0e1;
            position: absolute;
            right: 36px;
            .user-name-icon {
              position: absolute;
              left: -40px;
              top: 7px;
              color: #6a7784;
              &:before {
                font-size: 18px;
                width: 24px;
                height: 24px;
                padding: 2px;
                border-radius: 50%;
                background: #4a555f;
              }
            }
            .user-name {
              font-family: Arial, Helvetica, sans-serif;
              font-size: 14px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 170px;
              color: #dfe0e1;
              margin-top: 8px;
            }
          }
          .user-logout {
            position: absolute;
            top: 5px;
            font-size:20px;
            right: 0px;
            padding: 0px;
            cursor: pointer;
          }
        }
      }
      section.main-section {
        position: relative;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        min-width: 1200px;
        overflow: auto;
        padding: 48px 0 0 242px;
        transition: all .3s;
        background-color: #EBEBEB;
        .layout-footer {
          font-size: 12px;
          color: #777;
          margin: auto;
          padding: 8px 0 0 0;
          text-align: center;
          &.is-absolute {
            position: absolute;
            left: 121px;
            right: 0px;
          }
        }
        .page-wrapper {
          min-height: 88.4%;
          background-color: #ffffff;
          margin: 16px;
          padding: 24px 24px 24px 24px;
          border-radius: 3px;
          margin-bottom: 0px;
        }
      }
    }
  }
</style>
