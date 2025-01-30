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

  build: {
		transpile: ['gsap'],
	},

  imports: {
    dirs: ["tools", "api/namespaces", "utils/**/*"],
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:5000',
      versionAPI: process.env.VERSION_API,
    },
  },
  css: ['normalize.css/normalize.css'],

  modules: [
    '@nuxtjs/device',
    'nuxt-socket-io',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    'nuxt-swiper',
    '@nuxtjs/seo',
    '@element-plus/nuxt',
    '@hypernym/nuxt-gsap'
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

  i18n: {
    detectBrowserLanguage: {
      fallbackLocale: "ru",
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    locales: [
      {
        code: 'en',
        file: 'en-US.json'
      },
      {
        code: 'ru',
        file: 'ru-RU.json'
      }
    ],
    defaultLocale: 'ru',
    vueI18n: './i18n.config.ts',
    langDir: "locales",
  },

  gsap: {
		extraPlugins: {
			scrollTrigger: true,
		},
	},

  compatibilityDate: '2024-11-24',
})