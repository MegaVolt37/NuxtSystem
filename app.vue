<template>
  <div class="app">
    <NuxtPage v-if="isLogin()"/>
    <authorization v-else/>
  </div>
</template>
<style lang="scss" scoped>
.app {
  width: 100%;
  min-height: 100vh;
  background-color: $light-black;
}
</style>