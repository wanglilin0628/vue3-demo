<template>
  <div class="user-detail-wrapper">
    <el-form class="user-form" :model="data.userData" :inline="true" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model="data.userData.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="data.userData.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="data.userData.department" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="团队">
        <el-input v-model="data.userData.group" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div class="user-record-wrapper">
      <el-table ref="recordTable" :data="currentRecordList(currentPage, pageSize)" :height="520" border style="width: 100%">
        <el-table-column label="操作时间" prop="op_time" sortable></el-table-column>
        <el-table-column label="操作人" prop="username"></el-table-column>
        <el-table-column label="操作类型" prop="op_flag" :formatter="handleFlag"></el-table-column>
        <el-table-column label="状态" prop="op_state" :formatter="handleState"></el-table-column>
        <el-table-column label="操作详情" prop="op_remark">
          <template #default={row}>
            <el-button type="text" @click="openRemark(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[7, 14, 21, 28]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { opFlags } from '../../../../scripts/enumClass.js'
import Axios from 'axios'
import { ElMessageBox } from 'element-plus'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    /** 传入表单的数据 */
    const data = reactive({
      userData: {
        username: route.params.username,
        name: route.params.name,
        department: route.params.department,
        group: route.params.group
      }
    })

    /** 表格数据 */
    const recordList = ref([])
    /** 分页数据 */
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(7)
    /** 在挂载前获取数据 */
    onBeforeMount(async () => {
      recordList.value = await useRecordList(route.params.username)
      total.value = recordList.value.length
    })
    /** 分页处理逻辑 */
    // TODO [1.0.3] 将前台分页改为后台分页, 优化查询性能
    // TODO [1.1.0] 增加搜索功能(条件查询)
    const handleSizeChange = function(val) {
      pageSize.value = val
      currentPage.value = 1
    }
    const handleCurrentChange = function(val) {
      currentPage.value = val
    }
    const currentRecordList = function(currentPage, pageSize) {
      return recordList.value.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }

    /** 字段状态处理 */
    const handleFlag = function(row, column) {
      for (const flag in opFlags) {
        if (opFlags[flag].code === row.op_flag) {
          return opFlags[flag].msg
        }
      }
    }
    const handleState = function(row, column) {
      return row.op_state ? '成功' : '失败'
    }
    /** 详情弹窗 */
    const openRemark = function(row) {
      ElMessageBox(Buffer.from(row.op_remark.data).toString('utf-8'))
    }
    return {
      data,
      router,
      handleFlag,
      handleState,
      recordList,
      total,
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      currentRecordList,
      openRemark
    }
  }
}
/**
 * 根据用户名查询记录
 */
async function useRecordList(username) {
  const res = await Axios.post('/api/record/getRecordList', {username: username})
  if (res.status === 200) {
    return res.data.recordList
  }
}
</script>

<style lang="scss">
.user-detail-wrapper {
  .user-form {
    .el-form-item {
      width: 23%;
    }
    .el-input {
      width: 100%;
    }
  }
  .user-record-wrapper {
    .el-pagination {
      margin-top: 15px;
      text-align: center;
    }
  }
}
.messageBox {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
