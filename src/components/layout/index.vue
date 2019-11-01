<!--框架-->
<template>
  <el-container>
    <el-aside class="aside"
      :class="{'aside--collapse':isCollapse}">
      <side-bar ref="sideBar"
        v-model="tabActive"
        :isCollapse="isCollapse"
        @change="onMenuClick"></side-bar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold','header__collapse']"
          @click="isCollapse=!isCollapse"></i>
        <el-dropdown trigger="click"
          @command="dropdownMenuClick">
          <span class="header__dropdown">
            您好，{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">修改个人信息</el-dropdown-item>
            <el-dropdown-item command="password">修改密码</el-dropdown-item>
            <el-dropdown-item divided
              command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <el-tabs v-if="tabList.length"
          v-model="tabActive"
          type="card"
          closable
          @tab-remove="onTabRemove"
          @tab-click="onTabClick">
          <el-tab-pane v-for="value in tabList"
            :key="value[0]"
            :label="value[1]"
            :name="value[0]">
          </el-tab-pane>
          <router-view class="content"></router-view>
        </el-tabs>
      </el-main>
    </el-container>
    <modify-password ref="modifyPass"></modify-password>
    <modifyUserInfo ref="modifyUserInfo"></modifyUserInfo>
  </el-container>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      isCollapse: false,
      // username: '',
      tabActive: null,
      tabList: [] // [name,title]
    }
  },

  computed: {
    username() {
      return this.$store.state.userInfo.name
    },
    tabListMap: {
      get() {
        return new Map(this.tabList)
      },
      set(val) {
        this.tabList = [...val]
        sessionStorage.setItem('navigation', JSON.stringify(this.tabList))
      }
    }
  },
  watch: {},
  mounted() {
    if (sessionStorage.getItem('navigation')) {
      this.tabList = JSON.parse(sessionStorage.getItem('navigation'))
      this.tabActive = this.tabList[0][0]
    }
  },
  methods: {
    dropdownMenuClick(value) {
      if (value === 'userInfo') {
        this.$refs.modifyUserInfo.show = true
      } else if (value === 'password') {
        this.$refs.modifyPass.show = true
      } else if (value === 'logout') {
        this.logout()
      }
    },
    logout() {
      this.$confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Cookies.remove('token')
        this.$store.commit('changeUserInfo', {})
        this.$router.push({ name: 'login' })
        this.$message.success('已成功退出！')
      })
    },
    onTabRemove(name) {
      this.tabListMap.delete(name)
      this.tabListMap = this.tabListMap
      this.tabActive = this.tabListMap.size
        ? this.tabList[this.tabList.length - 1][0]
        : null
    },
    onMenuClick(menu) {
      this.tabListMap = this.tabListMap.set(menu.name, menu.title)
    },
    onTabClick(tab) {
      this.$router.replace({ name: tab.name })
    }
  },

  components: {
    sideBar: () => import('./sideBar.vue'),
    modifyPassword: () => import('./modifyPasswordDialog.vue'),
    modifyUserInfo: () => import('./modifyUserinfoDialog.vue')
  },
  beforeDestroy() {
    sessionStorage.removeItem('navigation')
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: #333;
  &__collapse {
    font-size: 24px;
    cursor: pointer;
  }
  &__dropdown {
    &:hover {
      cursor: pointer;
    }
  }
}
.aside {
  width: 200px !important;
  height: 100vh;
  background-color: $menuBg;
  border-right: 1px solid #e6e6e6;
  transition: width 0.5s;
  &--collapse {
    width: 64px !important;
  }
}
.main {
  height: calc(100vh - 60px);
  padding: 10px;
}
</style>

