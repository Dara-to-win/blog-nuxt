import { fa } from "element-plus/es/locale";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
          title: 'Blog-nuxt',
          meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { charset: 'utf-8' },
          ],
          bodyAttrs: {
            class: 'theme-white'
          }
        }
      },
    css: [
      '@/assets/css/base.css',
      '@/assets/font/iconfont.css',
      '@/assets/css/theme/var.less'
    ],
    modules: [
      '@element-plus/nuxt',
      '@pinia/nuxt',
    ],
    elementPlus: {
      themes: ['dark']
    },
    nitro: {
      devProxy: {
        "/api": {
          target: "http://39.108.135.247:8888",
          prependPath: true,
          changeOrigin: true,
        }
      }
    },
    runtimeConfig: {
      public: {
        VITE_API_HOST: "http://39.108.135.247:8888"
      }
    }
})
