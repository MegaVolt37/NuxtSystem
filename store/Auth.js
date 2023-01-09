export const storeAuth = defineStore('auth', {
  state: () => ({ user: "", token: "", }),
  getters: {
    getLogin() {
      return useState('token').value
    },
    getUser() {
      return useState('user').value
    },
  },
  actions: {
    async login(form) {
      try {
        const res = await fetchAuth(`/api/users/login`, {
          method: "post",
          body: form,
        })
        const user = useCookie('user')
        const token = useCookie('token')
        user.value = res
        token.value = res.token
        const stateToken = useState('token')
        stateToken.value = token.value
        const stateUser = useState('user')
        stateUser.value = user.value
        localStorage.setItem('user_id', res._id);
        localStorage.setItem('token', res.token);
        this.user = res;
        this.token = res.token;
        return res;
      } catch (error) {
        console.error(error)
      }
    },
    async logout() {
      const user = useCookie('user')
      const token = useCookie('token')
      user.value = null
      token.value = null
      useState('token').value = null
      useState('user').value = null
      localStorage.removeItem('user_id');
      localStorage.removeItem('token');
      this.user = "";
      this.token = "";
      navigateTo('/')
    },
  },
})