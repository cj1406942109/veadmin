<template>
  <div class="app-sidebar">
    <el-menu class="sideabr-el-menu" :collapse="!!sidebar.minimized" background-color="#364150" text-color="#b4bcc8" active-text-color="#36c6d3">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航五</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="5-1">选项1</el-menu-item>
          <el-menu-item index="5-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="5-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="5-4">
          <span slot="title">选项4</span>
          <el-menu-item index="5-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航六</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="6-1">选项1</el-menu-item>
          <el-menu-item index="6-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="6-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="6-4">
          <span slot="title">选项4</span>
          <el-menu-item index="6-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    <div class="sidebar-mini-toggler" @click="sidebarToggleMin">
      <i class="el-icon-d-arrow-left"></i>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      // isCollapse: false
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  },
  methods: {
    sidebarToggleMin () {
      this.$store.dispatch('sidebarToggleMin')
    }
  },
  components: {
    BScroll
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.app-sidebar {
  .sideabr-el-menu {
    border-right: none;
    background-color: $sidebarBg;
    color: $sidebarColor;
  }
  .sidebar-mini-toggler {
    border-top: 1px solid $footerBg;
    width: $sidebarWidth;
    background-color: $sidebarBg;
    height: 49px;
    text-align: center;
    line-height: 50px;
    vertical-align: middle;
    position: fixed;
    font-size: 24px;
    color: $togglerColor;
    bottom: 0;
  }
  .sidebar-mini-toggler:hover {
    color: $togglerHoverColor;
  }
}

.sidebar-mini {
  .app-sidebar,
  .sidebar-mini-toggler {
    width: $sidebarMiniWidth!important;
    .sidebar-mini-toggler i {
      transform: rotate(180deg);
    }
  }
}

.app-sidebar,
.sidebar-mini-toggler,
.sidebar-mini-toggler i{
  transition: all 0.5s;
}
</style>
