<template>
  <div class="user-wrapper page-wrapper">
    <div class="user-list-wrapper" v-if="!$store.state.opCardShow">
      <el-card>
        <el-table :data="$store.state.user.userList" style="width: auto" :cell-class-name="getCellIndex">
          <template #empty>
            <div class="no-data">
              <el-button type="primary" @click="navigateTo('add')">新增用户</el-button>
              <p class="no-data-text">No Data</p>
            </div>
          </template>
          <el-table-column prop="username" label="用户名" width="140px">
            <template #default={row}>
              <el-button type="text" @click="navigateTo('details', row)">{{row.username}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="140px"></el-table-column>
          <el-table-column prop="department" label="部门" width="140px"></el-table-column>
          <el-table-column prop="group" label="团队" width="140px"></el-table-column>
          <el-table-column label="操作" width="240px" align="center">
            <template #default={row}>
              <el-button type="text" size="small" class="normal-btn" @click="navigateTo('add')">新增</el-button>
              <el-button type="text" size="small" class="normal-btn" @click="navigateTo('modify', row)">修改</el-button>
              <el-button type="text" size="small" class="normal-btn" @click="deleteUser(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-card class="user-op-wrapper" v-else>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
import { onBeforeMount, onUnmounted } from 'vue'
// import Axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { opFlags } from '../../scripts/enumClass'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    /** 当页面加载前, 获取用户列表 */
    onBeforeMount(() => {
      store.dispatch('user/getUserList')
    })

    /** 删除用户 */
    // TODO [1.0.4] 增加删除权限, 每个用户只能对自己进行删除操作
    async function deleteUser(row) {
      const res = await store.dispatch('user/deleteUser', row)
      store.dispatch('user/addUserRecord', {
        flag: opFlags.USER_DELETE,
        state: res,
        remark: '删除用户 ' + row.username
      })
    }

    /** 页面刷新、回退监听器 */
    window.addEventListener('popstate', () => { store.commit('setOpCardShow', {flag: false}) })
    onUnmounted(() => {
      window.removeEventListener('popstate', () => { store.commit('setOpCardShow', {flag: false}) })
    })

    /** 导航 */
    function navigateTo(flag, row = null) {
      if (flag === 'add') {
        router.push({path: '/user/add'})
      } else if (flag === 'modify') {
        router.push({path: '/user/modify', name: '/user/modify', params: row})
      } else {
        router.push({path: '/user/details', name: '/user/details', params: row})
      }
      setTimeout(() => {
        store.commit('setOpCardShow', {flag: true})
      }, 0)
    }

    /** 为列表中的每项值都增加一个index属性, 表示在表格中的位置 */
    function getCellIndex({row, column, rowIndex, columnIndex}) {
      row.index = rowIndex
    }
    return {
      deleteUser,
      getCellIndex,
      navigateTo
    }
  }
}

</script>

<style lang='scss'>
.user-wrapper {
  min-height: calc(100% - 96px)!important;
  .user-list-wrapper {
    .el-table::before {
      background: #ffffff;
    }
    .el-table__empty-text {
      margin: 0px;
      padding-top: 56px;
      .no-data {
        .no-data-text {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.3);
          line-height: 22px;
        }
      }
    }
    .el-table {
      &.limitmaxheight {
        td, th {
          padding: 0px;
        }
      }
    }
    .el-table--border td {
      border-right: none;
    }
    .el-table__body {
      border-bottom: 1px solid #cccccc !important;
      tr:hover {
        .normal-btn {
          display: inline;
        }
      }
    }
    .normal-btn {
      height: 20px;
      padding: 0px 8px;
      font-size: 12px;
      display: none;
    }
  }
}
</style>
