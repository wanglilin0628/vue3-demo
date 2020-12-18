<template class="menu-left-wrapper" :class="{'menu-hidden': leftCollapse}">
  <el-menu default-active="0-0" class="menu-container" @select="selectMenu">
    <el-submenu class="menu-submenu" v-for="(item, id) in retMenu" :key="item.id" :index="id.toString()">
      <template #title>{{item.defaultLabel}}</template>
      <el-menu-item v-for="(subItem, subId) in item.childrens" :key="subItem.id" :index="id + '_' + subId">
        <template #title>{{subItem.defaultLabel}}</template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import data from '../../../public/data/menu.json'
export default {
  name: 'async-menu',
  setup() {
    const store = useStore()
    const menu = reactive(data.result.retMenu)
    const retMenu = reactive(menu[0].childrens[0].childrens)
    function selectMenu(index, indexPath) {
      const id = indexPath[0] // 一级菜单id
      const subId = index.split('_')[1] // 二级菜单id
      const url = retMenu[id].childrens[subId].url // 子页面的url
      console.log(url)
    }
    return {
      retMenu,
      selectMenu
    }
  }
}
</script>

<style lang="scss">
  .menu-left-wrapper {
    display: block;
    position: absolute;
    top: 89px;
    left: 0px;
    bottom: 0px;
    width: 242px;
    z-index: 2;
    overflow: auto;
    background-color: #394551;
    transition: all .3s;
    .menu-submenu {
      width: 100%!important;
      overflow: visible!important;
    }
  }
</style>
