export default defineNuxtRouteMiddleware((to, from) => {
  const {getToken} = storeToRefs(useStoreAuth())
  if (!getToken.value) {
    return navigateTo('/login')
  }
})