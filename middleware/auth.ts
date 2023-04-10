export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isLogin() === false) {
    return navigateTo('/login')
  }
})