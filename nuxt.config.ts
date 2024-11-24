// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/global.scss" as *;'
        }
      }
    }
  },

  // runtimeConfig: {
  //   public: {
  //     baseURL: process.env.BASE_URL || 'http://localhost:5000',
  //   },
  // },
  css: ['normalize.css/normalize.css'],

  modules: [
    '@nuxtjs/device',
    'nuxt-socket-io',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  pinia: {
    storesDirs: ['./stores/**', './store/**'],
  },

  device: {
    refreshOnResize: true
  },

  io: {
    sockets: [
      {
        name: "home",
        url: process.env.BASE_URL || 'http://localhost:3000'
      }
    ]
  },

  compatibilityDate: '2024-11-24',
})