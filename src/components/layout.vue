<!---->
<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-active="menuActive"
        @open="menuopen">
        <template v-for="menu in menuList">
          <el-submenu :index="menu.index"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            v-if="menu.children"
            :key="menu.index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{menu.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="child.index"
                v-for="child in menu.children"
                :key="child.index"
                @click="onMenuClick(menu)">{{child.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="menu.index"
            v-else
            :key="menu.index"
            @click="onMenuClick(menu)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{menu.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header></el-header>
      <el-main>
        <el-tabs v-model="tabActive"
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
import variables from "../styles/variables.scss";
export default {
  data() {
    return {
      menuActive: "1",
      menuList: [
        {
          title: "导航一",
          index: "1",
          name: "deliverGoods"
        },
        {
          title: "导航二",
          index: "2",
          name: "statistics"
        },
        {
          title: "基础配置",
          index: "3",
          children: [
            {
              title: "客户信息",
              index: "3-1",
              name: "customerInfo"
            },
            {
              title: "产品配置",
              index: "3-2",
              name: "productConfig"
            }
          ]
        }
      ],
      tabActive: null,
      tabList: []
    };
  },

  computed: {
    tabListMap: {
      get() {
        return new Map(this.tabList);
      },
      set(val) {
        this.tabList = [...val];
      }
    },
    variables() {
      return variables;
    }
  },

  mounted() {
    console.log(variables);

    const { name, title } = this.menuList[0];
    // this.tabsList[name] = title;
    this.tabList = [[name, title]];
    this.tabActive = name;
  },

  methods: {
    onTabRemove(name) {
      // const map = new Map(this.tabList);
      // map.delete(name);
      // this.tabList = [...map];
      this.tabListMap.delete(name);
      this.tabListMap = this.tabListMap;
      this.tabActive = this.tabListMap.size ? this.tabList[0][0] : null;

      // delete this.tabsList[name];
      // if (Object.keys(this.tabsList).length) {
      //   this.tabsActive = Object.keys(this.tabsList)[0];
      // } else {
      //   this.tabsActive = null;
      // }
    },
    onMenuClick(menu) {
      // const map = new Map(this.tabList);
      // map.set(menu.name, menu.title);
      // this.tabList = [...map];
      this.tabListMap = this.tabListMap.set(menu.name, menu.title);
      this.tabActive = menu.name;
      // const obj = {};
      // obj[menu.name] = menu.title;
      // Object.assign(this.tabsList, obj);
      // this.tabsActive = menu.name;
      this.$router.push({ name: menu.name });
    },
    menuopen(value) {
      console.log(typeof value);
    }
  },

  components: {}
};
</script>
<style lang="scss" scoped>
.el-header {
  // background-color: #409eff;
  line-height: 60px;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: #333;
}
.el-aside {
  height: 100vh;
  background-color: #304156;
  border-right: 1px solid #e6e6e6;
  text-align: center;
}

.el-main {
  height: calc(100vh - 60px);
}
.el-menu {
  border-right: none;
}
.content {
  padding: 10px;
}
</style>

