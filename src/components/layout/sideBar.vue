<!--侧边栏-->
<template>
  <el-menu class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :default-active="active"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="variables.menuActiveText">
    <template v-for="menu in menuList">
      <el-submenu v-if="menu.children"
        :index="menu.name"
        :key="menu.index">
        <template slot="title">
          <svg-icon :name="menu.name"></svg-icon>
          <span>{{menu.title}}</span>
        </template>
        <el-menu-item class="sub-menu"
          :index="child.name"
          v-for="child in menu.children"
          :key="child.index"
          @click="onMenuClick(child)">
          <svg-icon :name="child.name"></svg-icon>
          <span slot="title">{{child.title}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else
        :index="menu.name"
        :key="menu.index"
        @click="onMenuClick(menu)">
        <svg-icon :name="menu.name"></svg-icon>
        <span slot="title">{{menu.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import variables from '@/styles/variables.scss'
export default {
  model: {
    prop: 'active',
    event: 'activeChange'
  },
  props: {
    active: {
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      menuList: [
        {
          title: '导航一',
          index: '1',
          name: 'deliverNote'
        },
        {
          title: '导航二',
          index: '2',
          name: 'statistics'
        },
        {
          title: '基础配置',
          index: '3',
          name: 'basicConfig',
          children: [
            {
              title: '客户信息',
              index: '3-1',
              name: 'customerInfo'
            },
            {
              title: '产品配置',
              index: '3-2',
              name: 'productConfig'
            }
          ]
        }
      ]
    }
  },

  computed: {
    variables() {
      return variables
    }
  },
  mounted() {},

  methods: {
    onMenuClick(menu) {
      this.$emit('change', menu)
      this.$emit('activeChange', menu.name)
      this.$router.push({ name: menu.name })
    }
  },

  components: {}
}
</script>
<style lang='scss' scoped>
.el-menu {
  border-right: none;
}
.sub-menu {
  background: $subMenuBg !important;
  &:hover {
    background: $subMenuHover !important;
  }
}

svg {
  margin-right: 16px;
}
</style>
