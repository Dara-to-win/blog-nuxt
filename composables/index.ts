import Http from '@/utils/http'

/**
 * 登录
 */
export const useLogin = (params?: { account?: string, password?: string }, headers: any) => {
    return Http.post('/login', params, headers)
}
/**
 * 获取用户信息
 */
export const useCurrentUser = (params?: { }, headers: any) => {
    return Http.get('/users/currentUser', params, headers)
}
/**
 * 获取文章列表
 */
export const getArticles = (params?: { page?: number, pageSize?: number }, headers: any) => {
    return Http.post('/articles', params, headers)
}

/**
 * 获取热度最高的文章列表
 */
export const getHotArticles = (params?: { }, headers: any) => {
    return Http.get('/articles/hot', params, headers)
}

/**
 * 获取热度最新的文章列表
 */
export const getNewArticles = (params?: { }, headers: any) => {
    return Http.get('/articles/new', params, headers)
}

/**
 * 注销
 */
export const userLogout = (params?: { }, headers: any) => {
    return Http.get('/logout', params, headers)
}

/**
 * 获取文章详情
 */
export const getArticlesDetail = (params?: { }, headers: any, id: string) => {
    return Http.post(`/articles/view/${id}`, params, headers)
}

/**
 * 搜索内容
 */
export const getSearchArticles = (params?: { search?: string }, headers: any) => {
    return Http.post(`/articles/search`, params, headers)
}

/**
 * 获取所有标签
 */
export const getAllTags = (params?: {}, headers: any) => {
    return Http.get(`/tags`, params, headers)
}


/**
 * 发布文章
 */
export const publishArticle = (params?: any, headers: any) => {
    return Http.post(`/articles/publish`, params, headers)
}


/**
 * 根据用户ID获取用户详细信息
 */
export const getAuthorInfo = (params?: any, headers: any, authorId: string) => {
    return Http.get(`/users/userInfo/${authorId}`, params, headers)
}
