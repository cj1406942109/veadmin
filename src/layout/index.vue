<template>
  <el-container class="app-wrapper" :class="{'sidebar-hidden': !sidebar.opened, 'sidebar-mini': sidebar.minimized}">
    <!-- header -->
    <el-header><app-header/></el-header>
    <el-container>
      <!-- sidebar -->
      <el-aside><app-sidebar/></el-aside>
      <el-container style="min-height:100vh">
        <!-- content -->
        <el-main><app-content/></el-main>
        <!-- footer -->
        <el-footer><app-footer/></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { AppHeader, AppSidebar, AppContent, AppFooter } from './components'
import { getScreenSize } from '@/utils'
export default {
  name: 'layout',
  components: {
    AppHeader,
    AppSidebar,
    AppContent,
    AppFooter
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    screen () {
      return this.$store.state.app.screen
    },
    backTop () {
      return this.$store.state.app.backTop
    }
  },
  methods: {
    handleResize () {
      if (this.screen.size.desc !== getScreenSize(document.body.scrollWidth).desc) {
        this.$store.dispatch('setScreenSize', getScreenSize(document.body.scrollWidth))
        // 如果当前窗口是手机或pad窗口（<992px）并且sidebar是展开的，则自动隐藏sidebar
        if (this.screen.size.id <= 1 && this.sidebar.opened) {
          this.$store.dispatch('sidebarToggleOpen')
          // 如果当前窗口是手机窗口且sidebar没有最小化，则自动最小化
          if (!this.sidebar.minimized && this.screen.size.id === 0) {
            this.$store.dispatch('sidebarToggleMin')
          }
        }
        // 如果当前窗口是pc窗口（>=992px）并且sidebar是隐藏的，则自动展开sidebar
        if (this.screen.size.id > 1 && !this.sidebar.opened) {
          this.$store.dispatch('sidebarToggleOpen')
          // 如果sidebar最小化，则去除最小化
          if (this.sidebar.minimized) {
            this.$store.dispatch('sidebarToggleMin')
          }
        }
      }
      // 窗口大小改变带来的滚动导致sidebar-mini-toggler位置出错，将其重置
      document.getElementsByClassName('sidebar-mini-toggler')[0].style.bottom = 0
    },
    handleScroll () {
      let totalHeight = document.body.clientHeight
      // let screenHeight = window.screen.height
      let clientHeight = document.documentElement.clientHeight
      let distanceToTop = document.documentElement.scrollTop || document.body.scrollTop
      // 如果使用screenHeight，不同浏览器显示的结果不一样
      let distanceToBottom = totalHeight - clientHeight - distanceToTop
      // 当前sidebar没有被隐藏
      let sidebarMiniToggler = document.getElementsByClassName('sidebar-mini-toggler')[0]
      if (this.screen.size.id === 0) {
        if (!!this.sidebar.opened && distanceToBottom <= 50) {
          sidebarMiniToggler.style.bottom = `${50 - distanceToBottom}px`
        }
        if (!!this.sidebar.opened && distanceToBottom > 50) {
          sidebarMiniToggler.style.bottom = 0
        }
      }
    },
    getScrollDirection (fn) {
      let beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop
      fn = fn || function () {}
      window.addEventListener('scroll', function () {
        let afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        fn(delta > 0 ? 'down' : 'up')
        beforeScrollTop = afterScrollTop
      }, false)
    }
  },
  mounted () {
    // 获取窗口尺寸
    this.$store.dispatch('setScreenSize', getScreenSize(document.body.scrollWidth))
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)
    let _this = this
    this.getScrollDirection(function (direction) {
      if (_this.backTop.hidden && direction === 'up') {
        _this.$store.dispatch('setBackTopStatus', 'show')
      }
      if (!_this.backTop.hidden && direction === 'down') {
        _this.$store.dispatch('setBackTopStatus', 'hidden')
      }
    })
  },
  beforeDestroy () {
    // 解除事件绑定
    // window.removeEventListener()
    // window.onscroll = ''
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
.app-wrapper {
  .el-header {
    padding: 0;
    width: 100%;
    height: $headerHeight!important;
    line-height: $headerHeight;
    text-align: center;
    position: fixed;
    color: $headerColor;
    background-color: $headerBg;
  }
  .el-aside {
    margin-top: $headerHeight;
    height: 100vh;
    width: $sidebarWidth!important;
    position: fixed;
    color: $sidebarColor;
    background-color: $sidebarBg;
  }
  .el-main {
    margin-left: $sidebarWidth;
    margin-top: $headerHeight;
    padding-bottom: 0;
    border: 1px solid transparent;
    color: $contentColor;
    background-color: $contentBg;
  }
  .el-footer {
    margin-left: $sidebarWidth;
    height: $footerHeight!important;
    position: relative;
    padding: 0;
    line-height: $footerHeight;
    color: $footerColor;
    background-color: $footerBg;
  }
}

.sidebar-hidden {
  .el-aside {
    margin-left: -$sidebarWidth;
  }
  .el-main, .el-footer {
    margin-left: 0!important;
  }
}

.sidebar-mini {
  .el-aside {
    width: $sidebarMiniWidth!important;
  }
  .el-main, .el-footer {
    margin-left: $sidebarMiniWidth;
  }
}
.sidebar-hidden.sidebar-mini {
  .el-aside {
    margin-left: -$sidebarMiniWidth;
  }
  .el-main, .el-footer {
    margin-left: 0!important;
  }
}

@media (max-width: 767px) {
  .app-wrapper {
    .el-main,
    .el-footer {
      margin-left: 0!important;
    }
  }
}

// Animations
.el-aside,
.el-main,
.el-footer {
  transition: all 0.5s;
}
</style>
