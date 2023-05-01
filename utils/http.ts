import { hash } from 'ohash'

// 可以把返回数据data里面可能含有的类型列出来
export interface ResData<T> {
    items?: T[],
    [x: string]: any
}

// 后端返回的数据类型
export interface ResOptions<T> {
    data: T,
    code?: number,
    msg?: string,
    success: boolean
}

/**
 * api请求封装
 * @param { String } url 请求地址
 * @param { Object } options useFtech第二个参数
 * @param { Object } headers 自定义header头, 单独设置headers区分请求参数，也好设置类型
 */
const fetch = async (url: string, options?: any, headers?: any) => {

    try {
        const { public: { VITE_API_HOST } } = useRuntimeConfig() // 3.0正式版环境变量要从useRuntimeConfig里的public拿
        const reqUrl = VITE_API_HOST + url // 你的接口地址

        console.log("reqUrl: ", reqUrl);

        // 设置key
        const key = hash(options + url)

        // 可以设置默认headers例如
        const customHeaders = { ...headers }

        const { data, error } = await useFetch(reqUrl, { ...options, headers: customHeaders })
        const result = data.value as ResOptions<ResData<any>>
        console.log('useFetchResData: ', result)
        if (error.value || !result ) { //  || (result && result.code !== 200)
            throw createError({
                statusCode: 500,
                statusMessage: reqUrl,
                message: error.value?.message || '服务器内部错误',
            })
        }
        return result
    } catch (err) {
        console.log(err)
        return Promise.reject(err)
    }

}

export default class Http {
    static get(url: string, params?: any, headers?: any) {
        return fetch(url, { method: 'get', params }, headers)
    }

    static post(url: string, params?: any, headers?: any) {
        return fetch(url, { method: 'post', body: params }, headers)
    }

    static put(url: string, params?: any, headers?: any) {
        return fetch(url, { method: 'put', params }, headers)
    }

    static delete(url: string, params?: any, headers?: any) {
        return fetch(url, { method: 'delete', params }, headers)
    }
}