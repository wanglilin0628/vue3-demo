<template>
  <div class="user-wrapper page-wrapper">
    <div class="user-list-wrapper" v-if="!$store.state.opCardShow">
      <el-card>
        <el-table :data="userList" style="width: auto" :cell-class-name="getCellIndex">
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
import { onUnmounted, ref } from 'vue'
import Axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    const { userList, delUser } = useUserList()
    function deleteUser(row) {
      delUser(row, userList)
    }

    window.addEventListener('popstate', () => { store.commit('setOpCardShow', {flag: false}) })
    onUnmounted(() => {
      window.removeEventListener('popstate', () => { store.commit('setOpCardShow', {flag: false}) })
    })

    function navigateTo(flag, row = null) {
      store.commit('setOpCardShow', {flag: true})
      if (flag === 'add') {
        router.push({path: '/user/add'})
      } else if (flag === 'modify') {
        router.push({path: '/user/modify', params: row})
      } else {
        router.push({path: '/user/details', params: row})
      }
    }

    function getCellIndex({row, column, rowIndex, columnIndex}) {
      row.index = rowIndex
    }
    return {
      userList,
      deleteUser,
      getCellIndex,
      navigateTo
    }
  }
}

function useUserList() {
  const userList = ref([])
  Axios.post('/api/user/getUserList', {}).then((res) => {
    userList.value = res.data
  }).catch((e) => {
    console.log('获取用户列表异常', e)
  })

  function delUser(row, useUserList) {
    Axios.post('/api/user/deleteUser', {
      username: row.username
    }).then((res) => {
      if (res.status === 200) {
        useUserList.value.splice(row.index, 1)
      }
    }).catch((e) => {
      console.log('用户删除失败:', e)
    })
  }
  return {
    userList,
    delUser
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
