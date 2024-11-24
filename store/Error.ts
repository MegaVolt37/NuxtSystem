import { defineStore } from "pinia";

export const useStoreError = defineStore('Error', () => {
    const Error = ref('')
    const Sucess = ref('')
    const getError = computed(() => Error.value)
    const getSucess = computed(() => Sucess.value)
    const setError = (value) => {
        Error.value = value
    }
    const setSucess = (value) => {
        Sucess.value = value
        setTimeout(() => {
            Sucess.value = ""
        }, 3000);
    }

    return {
        getError,
        getSucess,
        setError,
        setSucess,
    }
})