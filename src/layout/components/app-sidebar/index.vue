<template>
  <div class="app-sidebar">
    <el-menu class="sideabr-el-menu" mode="vertical" :router="true" :default-active="$route.path" :collapse="!!sidebar.minimized" background-color="#364150" text-color="#b4bcc8" active-text-color="#36c6d3">
      <!-- <sidebar-item :routes="routerMap"></sidebar-item> -->
      <template v-for="item in permissionRouters" v-if="!item.hidden&&item.children">
        <!-- 显示一级路由 -->
        <el-menu-item :index="item.path+'/'+item.children[0].path" :key="item.name" v-if="item.children.length===1 && !item.children[0].children">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
        <!-- 显示二级路由 -->
        <el-submenu :index="item.path" :key="item.name" v-if="item.children.length>1">
          <template slot="title">
            <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span slot="title" v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
          </template>
          <!-- 目前只实现二级路由 -->
          <el-menu-item :index="item.path+'/'+subItem.path" v-for="subItem in item.children" :key="subItem.name" v-if="!subItem.hidden&&!subItem.children">
            <svg-icon v-if="subItem.meta&&subItem.meta.icon" :icon-class="subItem.meta.icon"></svg-icon>
            <span slot="title" v-if="subItem.meta&&subItem.meta.title">{{subItem.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <div class="sidebar-mini-toggler" @click="sidebarToggleMin">
      <i class="el-icon-d-arrow-left"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'permissionRouters',
      'sidebar'
    ])
  },
  methods: {
    sidebarToggleMin () {
      this.$store.dispatch('sidebarToggleMin')
    }
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
    .svg-icon {
      font-size: 20px;
      vertical-align: -0.3em;
      margin-right: 10px;
    }
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
