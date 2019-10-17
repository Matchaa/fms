<!---->
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

      </el-header>
      <el-main class="main">
        <el-tabs v-if="tabList.length"
          v-model="tabActive"
          type="card"
          closable
          @tab-remove="onTabRemove">
          <el-tab-pane v-for="(value,key) in tabList"
            :key="key"
            :label="value[1]"
            :name="value[0]">
          </el-tab-pane>
          <router-view class="content"></router-view>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      tabActive: null,
      tabList: [] // [name,title]
    }
  },

  computed: {
    tabListMap: {
      get() {
        return new Map(this.tabList)
      },
      set(val) {
        this.tabList = [...val]
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {
    onTabRemove(name) {
      this.tabListMap.delete(name)
      this.tabListMap = this.tabListMap
      this.tabActive = this.tabListMap.size
        ? this.tabList[this.tabList.length - 1][0]
        : null
    },
    onMenuClick(menu) {
      this.tabListMap = this.tabListMap.set(menu.name, menu.title)
    }
  },

  components: {
    sideBar: () => import('./sideBar.vue')
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: #333;
  &__collapse {
    font-size: 24px;
    cursor: pointer;
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

