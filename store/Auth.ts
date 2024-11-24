export const useStoreAuth = defineStore('auth',() => {
  const user = ref(null)
  const token = ref('')

  const getLogin = computed(() => token.value)
  const getToken = computed(() => token.value)
  const getUser = computed(() => user.value)

  const login = async (form) => {
    try {
      const res = await fetchAuth(`/api/users/login`, {
        method: "post",
        body: form,
      })
      user.value = res
      token.value = res.token
      return res;
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    user.value = null
    token.value = ''
  }

  return {
    user,
    token,
    getLogin,
    getToken,
    getUser,
    login,
    logout,
  }
},
{
  persist: [
    {
      paths: ['user','token'],
      storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
      maxAge: 86400 * 7,
      expires: new Date(Date.now() + 86400)
    }),
    }
  ]
})