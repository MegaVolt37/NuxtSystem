export default defineNuxtPlugin((nuxtApp) => {
  const user = useCookie('user')
  const token = useCookie('token')
  if (token.value && user.value) {
    useState('token', () => token.value)
    useState('user', () => user.value)
  }
})