export const storeData = defineStore('Data', {
  state: () => ({ isModal: "" }),
  getters: {
    getModal() {
      return this.isModal;
    },
  },
  actions: {
    setModal(value) {
      this.isModal = value
    },
  },
})