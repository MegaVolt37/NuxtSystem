// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/global.scss" as *;'
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
    // ...
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    '@nuxtjs/device',
    'nuxt-socket-io',
  ],
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
})
