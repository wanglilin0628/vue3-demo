<template>
  <div class="menu-wrapper">
    <div class="menu-container">
      <el-menu @select="selectMenu" class="menu-main" :default-active="menuData.defaultMenu" text-color="#FFFFFF" active-text-color="#DE4344" background-color="#394551">
        <el-menu-item index='home' class="menu-item">
          <template #title>首页</template>
        </el-menu-item>
        <el-submenu class="menu-submenu" v-for="(item, id) in menuData.retMenu" :key="item.id" :index="id.toString()">
          <template #title>{{item.defaultLabel}}</template>
          <el-menu-item v-for="(subItem, subId) in item.childrens" :key="subItem.id" :index="id + '_' + subId" class="menu-item">
            <template #title>{{subItem.defaultLabel}}</template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>

</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import data from '../../../public/data/menu.json'

export default {
  name: 'async-menu',
  setup() {
    const { menuData, selectMenu } = useMenuData()
    return {
      menuData,
      selectMenu
    }
  }
}

/**
 * 与菜单数据相关的逻辑useMenuData
 * @returns {object}
 * @returns {function}
 */
function useMenuData() {
  // 使用路由
  const router = useRouter()
  // 定义响应式数据menuData
  const menuData = reactive({
    retMenu: (data.result.retMenu)[0].childrens[0].childrens,
    defaultMenu: getDefaultMenu()
  })

  /**
   * 选择菜单, 完成菜单保存(刷新后留在当前页面)与路由跳转
   * @param {string} index 菜单的唯一标志
   */
  function selectMenu(index) {
    if (index !== 'home') {
      window.sessionStorage.setItem('default-menu', index)
      router.push({
        path: getUrl(index)
      })
    } else {
      window.sessionStorage.removeItem('default-menu')
      router.push({
        path: '/'
      })
    }
  }

  /**
   * 从sessionStorage中获取默认菜单
   */
  function getDefaultMenu() {
    const tmp = window.sessionStorage.getItem('default-menu')
    return tmp !== null && tmp !== undefined ? tmp : 'home'
  }

  /**
   * 根据菜单的唯一标志获取menuData中的url
   * @param {string} index 菜单的唯一标志
   */
  function getUrl(index) {
    const indexs = index.split('_')
    return menuData.retMenu[indexs[0]].childrens[indexs[1]].url
  }

  return {
    menuData,
    selectMenu
  }
}
</script>

<style lang="scss">
  .menu-wrapper {
    .menu-container {
      display: block;
      position: absolute;
      border-radius: 3px;
      top: 64px;
      left: 0px;
      bottom: 0px;
      width: 242px;
      z-index: 2;
      overflow: auto;
      background-color: #394551;
      transition: all .3s;
      .menu-main {
        width: 100%!important;
        overflow: visible!important;
        .menu-submenu {
          padding-right: 0;
          width: 100%;
          .menu-item {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
