<template>
  <div class="user-modify-wrapper">
    <el-form class="user-form" :model="data.userData" ref="form" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.userData.username" placeholder="请填写统一认证号" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="data.userData.name" placeholder="请填写姓名"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="oldPassword">
        <el-input type="password" v-model="data.userData.password" placeholder="请填写原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="data.userData.password" placeholder="请填写新密码"></el-input>
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
import { useRouter, useRoute } from 'vue-router'
import { useNotification } from '../../../../scripts/notification'
import { opFlags } from '../../../../scripts/enumClass'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    // const rules = useValidate()

    // TODO 将临时数据替换为数据库
    const departmentList = reactive([{depId: '1001', name: 'xxx实验室'}, {depId: '1002', name: '技术部'}])
    const groupList = reactive([{groupId: '2101', name: '分布式开发团队'}, {groupId: '2102', name: '服务支持团队'}])

    const data = reactive({
      userData: {
        username: route.params.username,
        name: route.params.name,
        department: route.params.department,
        group: route.params.group
      }
    }) // 表单数据
    const check = ref('') // 密码检查
    const oldPassword = ref('')

    const {successNotification, failNotification} = useNotification()
    /** 提交表单, 并保存记录 */
    const submit = async function() {
      await store.dispatch('user/addUser', {userInfo: data.userData}).then((res) => {
        if (res && res.status === 200) {
          successNotification('成功', '添加用户数据成功')
          store.dispatch('user/addUserRecord', {
            flag: opFlags.USER_ADD,
            state: true,
            remark: '添加用户 ' + data.userData.username
          })
          data.userData = {}
          check.value = ''
          store.dispatch('user/getUserList')
          store.commit('setOpCardShow', {flag: false})
        } else if (res.status === 202) {
          const msg = '用户名 ' + Object.values(res.data.error)[0] + ' 已存在'
          store.dispatch('user/addUserRecord', {
            flag: opFlags.USER_ADD,
            state: false,
            remark: '添加用户失败, ' + msg
          })
          failNotification('失败', msg)
        }
      }).catch((e) => {
        console.log('新增用户失败: ', e)
        store.dispatch('user/addUserRecord', {
          flag: opFlags.USER_ADD,
          state: false,
          remark: e
        })
      })
    }
    /** 重置表单 */
    const reset = function() {
      data.userData = {username: route.params.username}
      check.value = ''
    }
    /** 取消, 并返回上一页 */
    const cancel = function() {
      data.userData = {}
      check.value = ''
      router.go(-1)
    }
    return {
      data,
      check,
      oldPassword,
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
.user-modify-wrapper {
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
