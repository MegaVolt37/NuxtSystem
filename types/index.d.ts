// declare module '#app' {
//   interface NuxtApp {
//     $api: iApi
//   }
// }

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $api: iApi
//   }
// }

// export { }
import initAppAPI from "~/api"

interface PluginsInjections {
  $api: ReturnType<typeof initAppAPI>
}

declare module '#app' {
  interface NuxtApp extends PluginsInjections {}
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends PluginsInjections {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginsInjections {}
}