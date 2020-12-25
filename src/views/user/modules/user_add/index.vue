<template>
  <div class="user-add-wrapper">
    <el-form class="user-form" :model="data.userData" ref="form" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.userData.username" placeholder="请填写统一认证号"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="data.userData.name" placeholder="请填写姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="data.userData.password" placeholder="请填写密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="check">
        <el-input type="password" v-model="check" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="data.userData.department" placeholder="请选择部门">
          <el-option v-for="item in departmentList" :key="item.depId" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="团队" prop="group">
        <el-select v-model="data.userData.group" placeholder="请选择团队" :popper-append-to-body="false">
          <el-option v-for="item in groupList" :key="item.groupId" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <!-- TODO [1.0.3] 修复el-select下拉框宽度过大的问题 -->
      <el-form-item class="user-add-button">
        <el-button type="primary" class="confirm" @click="submit">提交</el-button>
        <el-button type="info" class="reset" @click="reset">重置</el-button>
        <el-button class="cancel" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Axios from 'axios'
import { ElNotification } from 'element-plus'

export default {
  // TODO [1.0.2] 完成用户的新增页面
  setup() {
    const router = useRouter()
    const store = useStore()
    // const rules = useValidate()

    // 临时数据
    const departmentList = reactive([{depId: '1001', name: 'xxx实验室'}, {depId: '1002', name: '技术部'}])
    const groupList = reactive([{groupId: '2101', name: '分布式开发团队'}, {groupId: '2102', name: '服务支持团队'}])

    const data = reactive({userData: {}})
    const check = ref('')

    const submit = function() {
      Axios.post('/api/user/add', {userInfo: data.userData}).then((res) => {
        if (res.status === 200) {
          ElNotification.success({
            title: '成功',
            message: '添加用户数据成功'
          })
          setTimeout(() => {
            data.userData = {}
            check.value = ''
            store.commit('setOpCardShow', {flag: false})
          }, 500)
        } else if (res.status === 202) {
          const flag = Object.getOwnPropertyNames(res.data.error)[0]
          const val = res.data.error[flag]
          ElNotification.error({
            title: '失败',
            message: '用户名 ' + val + ' 已存在'
          })
        }
      }).catch((e) => {
        console.log('新增用户失败: ', e)
      })
    }
    const reset = function() {
      data.userData = {}
      check.value = ''
    }
    const cancel = function() {
      data.userData = {}
      check.value = ''
      router.go(-1)
    }
    return {
      data,
      check,
      departmentList,
      groupList,
      reset,
      cancel,
      submit
    }
  }
}
// function useValidate() {
//   const rules = reactive({
//     username: [{required: true, trigger: 'blur', message: '用户名必填'}]
//   })
//   return {
//     rules
//   }
// }
</script>

<style lang="scss">
.user-add-wrapper {
  .user-form {
    .el-form-item {
      width: 60%;
    }
    .el-select {
      width: 100%;
    }
    .el-input {
      width: 60%;
    }
  }
  .user-add-button {
    margin-top: 15px;
    .cancel, .reset, .confirm {
      margin: 0 10px 0px 10px;
      height: 32px;
      font-size: 14px;
      padding: 0 15px;
    }
  }
}
</style>
