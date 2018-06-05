<template>
  <div class="app-footer">
    <span>{{new Date().getFullYear()}} &copy;<abbr title="Intelligent Medical">IM</abbr> </span>
    <span>Powered by <abbr title="WuHan University">WHU</abbr> |
      <a target="_blank" href="javascript:;">LiBingTeam</a>
    </span>
    <div class="back-top" title="返回顶部" @click="handlebackTop" v-show="!backTop.hidden"><svg-icon icon-class="back-top"></svg-icon></div>
  </div>
</template>

<script>
export default {
  name: 'app-footer',
  computed: {
    backTop () {
      return this.$store.state.app.backTop
    }
  },
  methods: {
    handlebackTop () {
      let interval = setInterval(() => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop = scrollTop - 50
        } else {
          clearInterval(interval)
          this.$store.dispatch('setBackTopStatus', 'hidden')
        }
      }, 20)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.app-footer {
  padding: 0 20px;
  height: $footerHeight;
  display: flex;
  justify-content: space-between;
  line-height: $footerHeight;
  font-size: $footerFontSize;
  color: $footerColor;
  background-color: $footerBg;
  a {
    color: #337ab7;
    text-decoration: none;
  }
  .back-top {
    color: $backTopColor;
    background-color: $backTopBg;
    position: fixed;
    display: flex;
    cursor: pointer;
    justify-content: space-around;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    z-index: 999;
    font-size: 24px;
    right: $backTopRight;
    bottom: $backTopBottom;
    transition: all 0.5s;
  }
  .back-top:hover {
    color: $backTopHoverColor;
    background-color: $backTopHoverBg;
  }
}
</style>
