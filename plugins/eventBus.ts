import mitt from 'mitt'

export default defineNuxtPlugin(async (NuxtApp) => {
    // nuxtApp包含的属性可看文档 https://nuxt.com/docs/guide/going-further/internals
    const emitter = mitt()
    return {
        provide: {
            emitter
        }
    }
})