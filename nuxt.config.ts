// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
          title: 'Blog-nuxt',
          meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { charset: 'utf-8' },
          ],
        }
      },
    css: [
      '@/assets/css/base.css',
    ],
    modules: [
      '@element-plus/nuxt'
    ],
    elementPlus: {
      themes: ['dark']
    }
})
