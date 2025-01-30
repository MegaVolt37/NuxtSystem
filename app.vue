<template>
  <transition
    name="page"
    mode="out-in"
  >
    <div class="app">
      <NuxtLayout v-if="getToken">
        <div>
          <button @click="setLocale('en')">en</button>
          <button @click="setLocale('ru')">ru</button>
          <p>{{ $t('welcome') }}</p>
        </div>
        <NuxtPage />
      </NuxtLayout>
      <authorization v-else />
    </div>
  </transition>
</template>
<script lang="ts" setup>
const { $api } = useNuxtApp()
const { getToken } = storeToRefs(useStoreAuth())
const { login } = useStoreAuth()
const { setLocale } = useI18n()
const localePath = useLocalePath()
onMounted(async () => {
  try {
    const res = await login({
      pass: ''
    })
    // console.log(res)
  } catch (error) {
    // console.log(error)
  }

})
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