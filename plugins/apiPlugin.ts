import initAppAPI from "~/api"

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()

  const options = {
    async onRequest({ options }) {
      options.headers = new Headers(options.headers)
    },
  }

  const baseUrl = config.public.baseURL;
  const versionAPI = config.public.versionAPI;

  const apiUrl = `${baseUrl}${versionAPI}/`;
  
  type ApiResponse = ReturnType<typeof initAppAPI>;

  const api: ApiResponse = initAppAPI()

  return {
    provide: {
      api,
    },
  }
})