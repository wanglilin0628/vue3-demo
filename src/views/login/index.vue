<template>
  <div class="login-wrapper">
    <div class="login-main">
      <div class="login-title">Vue3 demo工程</div>
      <el-form :model="params" :rules="rules" ref="login" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="params.username" placeholder="用户名">
            <template #prepend>
              <i class="el-icon-user-solid login-icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="params.password" placeholder="密码">
            <template #prepend>
              <i class="el-icon-lock login-icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
        <p class="login-tips-color" v-if="error">用户名或密码错误</p>
        <p class="login-tips" v-else>Tips: 用户名和初始密码都为统一认证号</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import Axios from 'axios'
import { useStore } from 'vuex'
export default {
  setup() {
    const params = reactive({
      username: '',
      password: ''
    })
    const rules = reactive({
      username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
      password: [{required: true, message: '请输入密码', trigger: 'blur'}]
    })
    const error = ref(false)
    const store = useStore()

    onMounted(() => {
      params.username = '001228619'
      params.password = '123'
      submitForm()
    })

    function submitForm() {
      Axios.post('/api/user/login', {
        username: params.username,
        password: params.password
      }).then((res) => {
        if (res.status === 200) {
          console.log('登录成功')
          store.commit('setNeedLogin', {
            flag: false
          })
          store.commit('setUserInfo', res.data)
          window.sessionStorage.setItem('userInfo', JSON.stringify({
            username: res.data.username,
            name: res.data.name,
            department: res.data.department,
            group: res.data.group
          }))
          window.sessionStorage.setItem('needLogin', store.state.needLogin)
        }
      }).catch(() => {
        error.value = true
        setTimeout(() => {
          error.value = false
        }, 3000)
      })
    }
    return {
      params,
      rules,
      submitForm,
      error
    }
  }
}
</script>

<style lang="scss">
  .login-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/login-bg.jpg');
    background-size: cover;
    .login-main {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 350px;
      margin: -190px 0 0 -175px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.3);
      overflow: hidden;
      .login-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #ffffff;
        border-bottom: 1px solid #dddddd;
      }
      .login-form {
        padding: 20px 20px;
        .login-btn {
          text-align: center;
        }
        .login-btn button {
          width: 100%;
          height: 36px;
          margin-bottom: 10px;
        }
        .login-tips {
          font-size: 12px;
          line-height: 30px;
          color: #ffffff;
        }
        .login-tips-color {
          font-size: 12px;
          line-height: 30px;
          color: red;
        }
      }
    }
  }
  .login-icon {
    font-size: 24px;
  }
  html body {
    overflow: hidden;
  }
</style>
