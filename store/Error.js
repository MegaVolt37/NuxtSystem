export const storeError = defineStore('Error', {
  state: () => ({ Error: "", Sucess: "" }),
  getters: {
      getError() {
          return this.Error;
      },
      getSucess() {
          return this.Sucess;
      },
  },
  actions: {
      setError(value) {
          this.Error = value
      },
      setSucess(value) {
          this.Sucess = value
          setTimeout(() => {
              this.Sucess = ""
          }, 3000);
      }
  },
})