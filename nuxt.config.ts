// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig:{
    serverSecret: "",
  },
  future: {
    compatibilityVersion: 4
  },
  nitro:{
    devStorage:{
      webhook:{
        driver: "fs",
        base:"./.data/webhook",
      },
      trigger:{
        driver: "fs",
        base:"./.data/trigger",
      },
      link:{
        driver:"fs",
        base: "./.data/link"
      }
    }
  },
  modules: ['vuetify-nuxt-module', '@vueuse/nuxt', '@nuxt/test-utils/module']
})
