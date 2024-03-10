<template>
    <div class="login-box">
      <div class="login-panel">
        <div class="login-panel-title">用户登录</div>
        <el-form :model="formData" ref="formRef" label-width="auto" :rules="rules">
          <el-form-item prop="account">
            <el-input placeholder="请输入账号" v-model="formData.account" size="large">
              <template #prefix>
                <span class="iconfont icon-account"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="formData.password" size="large" type="password" show-password>
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="checkCode">
            <div class="check-code-box">
              <el-input placeholder="请输入验证码" v-model="formData.checkCode" size="large"></el-input>
              <img @click="changeCheckCode" :src="checkCodeUrl" alt="验证码">
            </div>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="formData.remmenber">记住密码</el-checkbox>
          </el-form-item>
          <el-button @click="login" size="large" type="primary">登录</el-button>
        </el-form>
      </div>
    </div>
</template>
  
<script setup>
import { ref, getCurrentInstance } from "vue"
import md5 from 'js-md5'
import VueCookies from 'vue-cookies'

  const { proxy } = getCurrentInstance();
  const formData = ref({})

  const api = {
    checkCode: 'api/checkCode',
    login: "/login"
  }


  const checkCodeUrl = ref(api.checkCode)
  const changeCheckCode = () => {
    checkCodeUrl.value = api.checkCode + '?' + new Date().getTime()
  }

  const init = ()=> {
    const loginInfo = VueCookies.get('loginInfo')
    if(!loginInfo) return
    Object.assign(formData.value, loginInfo)
  }
  init()


  const rules = {
    account: [{
      required: true,
      message: '请输入用户名'
    }],
    password: [{
      required: true,
      message: '请输入密码'
    }],
    checkCode: [{
      required: true,
      message: '请输入验证码'
    }],
  }
  const formRef = ref(null)
  const login = () => {
    formRef.value.validate(async (valid) => {
      if(!valid) return

      let cookieLoginInfo = VueCookies.get("loginInfo");
      let cookiePassword = cookieLoginInfo?.password;

      let params = {
        account: formData.value.account,
        password: formData.value.password !== cookiePassword ? md5(formData.value.password) : formData.value.password,
        checkCode: formData.value.checkCode
      }

      let result = await proxy.Request({
        url: api.login,
        params: params,
        errorCallback: () => {
          changeCheckCode();
        }
      })
      if (!result) return
      proxy.Message.success("登录成功");

      let loginInfo = {
        account: params.account,
        password: params.password,
        remmenber: formData.value.remmenber,
      }
      if(formData.value.remmenber){
        VueCookies.set("loginInfo", loginInfo, "7d")
      }
    })
  }
</script>
  
<style lang='scss' scoped>
  .login-box {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url(../assets/img/login-bg.jpg);
    background-repeat: no-repeat;
    background-size: cover; // 放大缩小
    background-position: center;
    .login-panel {
      float: right;
      margin-right: 100px;
      margin-top: 180px;
      width: 350px;
      padding: 10px 20px 30px 20px;
      background-color: rgb(250, 250, 250, 0.8);
      border-radius: 8px;
      &-title{
        font-size: 20px;
        font-weight: 600;
        height: 3em;
        text-align: center;
        line-height: 3em;
      }
      .el-form {
        .check-code-box{
          display: flex;
          flex-wrap: nowrap;
          gap: 5px;
          img {
            min-width: 110px;
          }
        }
        .el-button {
          width: 100%;
        }
      }
    }
  }
</style>
