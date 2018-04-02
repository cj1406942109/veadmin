<template>
  <div class="app-content">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app-content'
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.app-content {
  border: $contentBorder;
  background-color: $contentBg;
  color: $contentColor;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
