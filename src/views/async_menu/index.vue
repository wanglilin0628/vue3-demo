<template class="menu-left-wrapper" :class="{'menu-hidden': leftCollapse}">
  <!-- <el-menu v-show="firstMenuShow" v-if="firstMenuResult.length <= num" ref="menuRef" class="firstMenu" :default-active="firstMenuActiveIndexes" :style="{width: menuWidth + 'px'}" @select="openFirstSubMenu">
    <el-menu-item v-for="(menu, topIdx) in firstMenuResult" :key="topIdx" :index="menu_id + '_' + topIdx" class="menu-level-33" :class="{'menuLevel1': menu.defaultLabel.length >= 5}">
      <slot name="title">
        <el-tooltip v-if="menu.defaultLabel.length >= 5" effect="light" :content="menu.defaultLabel" placement="top-start">
          <span>{{menu.defaultLabel}}</span>
        </el-tooltip>
        <span v-else>{{menu.defaultLabel}}</span>
      </slot>
    </el-menu-item> -->
  <!-- </el-menu> -->
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template #title>分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>导航三</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>
    </el-menu>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import menuData from '../../../public/data/menu.json'
import { useStore } from 'vuex'
export default {
  name: 'async-menu',
  setup() {
    const firstMenuResult = reactive(menuData)
    const firstMenuActiveIndex = ref('')
    const store = useStore()
    const firstMenuShow = store.state.firstMenuShow
    const firstMenuActiveIndexes = computed({
      get: () => firstMenuActiveIndex,
      set: (val) => { firstMenuActiveIndex(val) }
    })
    watch(() => firstMenuActiveIndexes, (val, preVal) => {
      if (val) {
        window.sessionStorage.setItem('menuActiveIndex', JSON.stringify(val))
      }
    })
    // 自适应屏幕
    const num = ref(100)
    const menuWidth = ref(0)
    const screenWidth = ref(document.body.clientWidth)
    return {
      num,
      menuWidth,
      screenWidth,
      firstMenuShow,
      firstMenuResult,
      firstMenuActiveIndexes
    }
  }
}
</script>

<style>

</style>
