<template>
  <div class="app-header">
    <div class="app-logo">
      <div class="nav-brand"></div>
      <div class="sidebar-toggler" @click="sidebarToggleOpen"><svg-icon icon-class="menu"></svg-icon></div>
    </div>
    <div class="nav-menu">
      <div class="nav-avatar">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img  src="./default-avatar.png">
            <span class="hidden-sm-and-down">Jenny</span>
            <i class="el-icon-arrow-down el-icon--right hidden-sm-and-down"></i>
          </span>
           <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的信息</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  methods: {
    sidebarToggleOpen () {
      this.$store.dispatch('sidebarToggleOpen')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.app-header {
  height: $headerHeight;
  line-height: $headerHeight;
  background-color: $headerBg;
  display: flex;
  justify-content: space-between;
  .app-logo {
    display: flex;
    width: $sidebarWidth;
    height: $headerHeight;
    .nav-brand {
      height: $headerHeight;
      width: $navBrandWidth;
      background: url(./logo.png) center no-repeat;
    }
    .sidebar-toggler {
      cursor: pointer;
      color: $togglerColor;
    }
  }
  .nav-menu {
    display: flex;
    justify-content: flex-end;
    .el-dropdown {
      height: $headerHeight;
      .el-dropdown-link {
        color: $headerColor;
        cursor: pointer;
      }
    }
    .nav-avatar {
      margin-right: 20px;
      img {
        vertical-align: middle;
        margin-top: -5px;
        border-radius: 50%;
        width: $avatarWidth;
        height: $avatarHeight;
      }
    }
  }
  .sidebar-toggler:hover {
    color: $togglerHoverColor;
  }
}
.sidebar-hidden {
  .app-header {
    .sidebar-toggler {
      transform: rotate(90deg);
    }
  }
}
.sidebar-mini {
  .app-header {
    .nav-brand {
      width: $sidebarMiniWidth!important;
      background: url(./logo-mini.png) center no-repeat!important;
    }
  }
}

// Animations
.nav-brand,
.sidebar-toggler {
  transition: all 0.5s;
}
</style>
