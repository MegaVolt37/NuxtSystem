export const useStoreData = defineStore('Data', () => {
  const isModal = ref('')
  const getModal = computed(() => isModal.value)

  const setModal = (value : string) => {
    isModal.value = value
  }

  return {
    isModal,
    getModal,
    setModal
  }
})