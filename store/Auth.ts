export const useStoreAuth = defineStore('auth',() => {
  const user = ref<IUser | null>(null)
  const access_token = ref<String>('')
  const refresh_token = ref<String>('')
  const token = ref<String>('')
  const {$api} = useNuxtApp()
  const getLogin = computed(() => token.value)
  const getToken = computed(() => access_token.value)
  const getRefreshToken = computed(() => refresh_token.value)
  const getUser = computed(() => user.value)

  const login = async (form) => {
    try {
      const res = await $api.users.login<IRequestToken>({
        method: "post",
        body: form,
      })
      // console.log(res)
      access_token.value = res.access
      refresh_token.value = res.refresh

      return Promise.resolve(res);
    } catch (error) {
      // console.log(error)
      console.error(error)
      return Promise.reject(error);
    }
  }

  const logout = () => {
    user.value = null
    token.value = ''
  }

  const setToken = (token: String) => {
    access_token.value = token
  }
  const setRefreshToken = (token: String) => {
    refresh_token.value = token
  }

  return {
    user,
    token,
    access_token,
    refresh_token,
    getLogin,
    getToken,
    getRefreshToken,
    getUser,
    login,
    logout,
    setToken,
    setRefreshToken,
  }
},
{
  persist: [
    {
      pick: ['access_token','refresh_token'],
      storage: piniaPluginPersistedstate.cookies({
        sameSite: 'strict',
      maxAge: 86400 * 7,
      expires: new Date(Date.now() + 86400)
      })
    }
  ]
})