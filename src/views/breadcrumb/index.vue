<template>
  <div class="breadcrumb-wrapper">
    <!-- <el-breadcrumb v-if="breadList">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{item.meta.title}}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator="/" v-else>
      <el-breadcrumb-item title>{{breadList[0].meta.title}}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="{path: ''}" @click="back(index)">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb> -->
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const breadList = computed(() => route.matched)
    console.log(breadList)
    function back(index) {
      if (index === 0) {
        router.push({url: breadList[index].path})
      }
    }
    return {
      breadList,
      back
    }
  }
}
</script>

<style lang="scss">
.breadcrumb-wrapper {
  .el-breadcrumb__inner a, .is-link.el-breadcrumb__inner {
    font-weight: normal!important;
  }
  :nth-child(2n).el-breadcrumb__item .el-breadcrumb__inner {
    color: #999;
  }
  :nth-child(2n).el-breadcrumb__item .el-breadcrumb__inner:hover {
    color: #3c8ad8;
  }
}
</style>
