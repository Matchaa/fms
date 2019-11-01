<!--登陆-->
<template>
  <div class="login">
    <div class="login__title">智能工厂管理系统</div>
    <el-form class="form"
      :model="form"
      :rules="rules"
      ref="form">
      <el-form-item prop="username"
        class="form__item">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input ref="username"
          v-model="form.username"
          placeholder="Username"
          type="text"
          autocomplete="on" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input ref="password"
          v-model="form.password"
          placeholder="Password"
          :type="isShowPwd?'':'password'"
          autocomplete="on" />
        <span class="show-pwd"
          @click="isShowPwd=!isShowPwd">
          <svg-icon :name="isShowPwd? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button class="form__button"
        :loading="isLoading"
        type="primary"
        @click.native.prevent="onLogin">登 录</el-button>
    </el-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      isShowPwd: false,
      rules: {
        username: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12个字符', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },

  computed: {},

  mounted() {},

  methods: {
    onShowPwd() {},
    onLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true
          const {
            state: { storeTable },
            getters: { indexDBVersion }
          } = this.$store
          var request = window.indexedDB.open('fms', indexDBVersion)
          request.onupgradeneeded = event => {
            var db = event.target.result
            storeTable.forEach(item => {
              const { name, key, indexes } = item
              if (!db.objectStoreNames.contains(name)) {
                const store = db.createObjectStore(name, {
                  keyPath: key || 'id'
                })
                if (indexes) {
                  for (let index of indexes) {
                    store.createIndex(index.name, index.key, {
                      unique: index.unique
                    })
                  }
                }
              }
            })
          }
          request.onsuccess = () => {
            Cookies.set('token', 123456)
            this.$store.commit('changeUserInfo', {
              name: '管理员'
            })
            // sessionStorage.setItem(
            //   'userInfo',
            //   JSON.stringify({
            //     name: 'admin'
            //   })
            // )
            this.$router.push({ name: 'layout' })
          }
        } else {
          return false
        }
      })
    }
  },

  components: {}
}
</script>
<style lang='scss' scoped>
$--bg: #2d3a4b;
$--dark-gray: #889aa4;
$--light-gray: #eee;
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: $menuBg;
  &__title {
    font-size: 26px;
    color: #eee;
    margin-bottom: 40px;
    font-weight: bold;
  }
}
.form {
  width: 520px;
  max-width: 100%;
  .svg-container {
    display: inline-block;
    // width: 20px;
    padding: 6px 0 6px 15px;
    vertical-align: middle;
    color: $--dark-gray;
  }

  &__button {
    width: 100%;
    // margin-bottom:30px;
  }
  /deep/ .el-form-item {
    background: $menuHover;
    border: 1px solid #3e4956;
    border-radius: 5px;
  }
  /deep/ .el-input {
    display: inline-block;
    width: 85%;
    // padding: 12px 0;
    // color: $--light-gray;
  }
  /deep/ input {
    padding: 12px 5px 12px 15px;
    background-color: $menuHover !important;
    border: none;
    color: #fff;
  }

  /deep/ input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px $menuHover inset !important;
    text-fill-color: #fff;
    -webkit-text-fill-color: #fff;
    border-radius: 0;
  }
  // /deep/ .el-input__inner {
  //   padding: 12px 5px 12px 15px;
  //   background-color: $menuHover !important;
  //   border: none;
  //   color: #fff;
  // }
  /deep/ .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus {
    border: none;
  }
  // &__item--active {
  //   border: 1px solid $--color-primary ;
  // }
}
.show-pwd {
  vertical-align: middle;
  padding-left: 15px;
  font-size: 16px;
  color: $--dark-gray;
  cursor: pointer;
}
</style>
