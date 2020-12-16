<template>
  <div>
  <!-- <login v-if="needLogin"></login> -->
  <!-- <Suspense> -->
    <!-- <template #default> -->
      <!--<header class="main-header">
        <div class="main-logo-area">
          <span class="app-icon" style="color: white;font-weight: bolder;font-size: 26px;margin-top: 5px;margin-right: 10px;">ICBC</span>
          <img class="app-logo" width="64px" height="64px" src="./assets/logo.png">
          <h1 class="app-title" style="color: white;">{{title}}</h1>
        </div>
        <div class="main-info" style="color: white;"> -->
          <!-- <search></search> -->
          <!-- <notice></notice> -->
          <!-- <div class="main-name-wrapper">
            <span class="layout-icon icon-person main-name-icon"></span>
            <div class="main-name">{{userInfo.name}}</div>
            <el-select v-model="userInfo" class="userinfo-select" popper-class="userinfo-dropdown">
              <el-option v-for="item in userInfoList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span class="layout-icon un-icon-quit main-logoff" @click="logOff"></span>
          </div>
        </div>
      </header> -->
      <!-- 异步组件 -->
      <async-menu></async-menu>
      <!-- <section class="main-section" :class="{'section-padding-left': leftCollapse}">
        <breadcrumb></breadcrumb>
        <router-view></router-view>
        <footer class="layout-footer is-absolute">中国工商银行版权所有</footer>
      </section> -->
    <!-- </template>
    <template #fallback>
      <div>Loading</div>
    </template> -->
  <!-- </Suspense> -->
  </div>
</template>

<script>
import { reactive } from 'vue'
import AsyncMenu from './views/async_menu/index.vue'
export default {
  components: {
    AsyncMenu
  },
  setup() {
    const { userInfo, userInfoList } = userInfoLogic()
    return {
      userInfo,
      userInfoList
    }
  }
}
function userInfoLogic() {
  const userInfo = reactive({})
  const userInfoList = reactive([])
  return {
    userInfo,
    userInfoList
  }
}
</script>

<style>

</style>
