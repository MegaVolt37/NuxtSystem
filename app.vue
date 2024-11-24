<template>
  <transition
    name="page"
    mode="out-in"
  >
    <div class="app">
      <NuxtPage v-if="getToken" />
      <authorization v-else />
    </div>
  </transition>
</template>
<script lang="ts" setup>
const { getToken } = storeToRefs(useStoreAuth())
</script>
<style lang="scss" scoped>
.app {
  width: 100%;
  min-height: 100vh;
  background-color: $light-black;
  padding: 45px 35px;
}

.page-enter-active {
  animation: change-pages 1s ease-in-out 0s both;
}

.page-leave-active {
  animation: change-pages 1s ease-in-out 0s reverse;
}

@keyframes change-pages {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>