<template>
  <div class="user-wrapper page-wrapper">
    <div class="user-list-wrapper">
      <el-card>
        <el-table :data="userList" style="width: auto">
          <template #empty>
            <div class="no-data">
              <!-- <img src="../../assets/icbc.png" :alt="noData" /> -->
              <div class="no-data-text">{{noData}}</div>
            </div>
          </template>
          <el-table-column prop="username" label="用户名" width="140px"></el-table-column>
          <el-table-column prop="name" label="姓名" width="140px"></el-table-column>
          <el-table-column prop="department" label="部门" width="140px"></el-table-column>
          <el-table-column prop="group" label="团队" width="140px"></el-table-column>
          <!-- <el-table-column fixed="left" label="选中" width="140px"></el-table-column> -->
          <el-table-column label="操作" width="160px">
            <template #scope>
              <el-button type="text"></el-button>
              <el-button type="text"></el-button>
              <el-button type="text"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Axios from 'axios'
export default {
  // TODO [1.0.2] 完成用户的展示，包含用户名(统一认证号)、姓名、部门、团队
  setup() {
    const noData = ref('No Data')
    const userList = ref([])
    Axios.post('/api/user/getUserList', {}).then((res) => {
      userList.value = res.data
    }).catch((e) => {
      console.log('获取用户列表异常', e)
    })
    return {
      noData,
      userList
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
      // border-top: 1px solid #cccccc !important;
      // border-block: 1px solid #cccccc !important;
      border-bottom: 1px solid #cccccc !important;
    }
    .el-card {
      // border: none;
      // box-shadow: none;
    }
  }
}
</style>
