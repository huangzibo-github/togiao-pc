import request from '../utils/request'
import { API_ARTICLES, API_CHANNELS } from '../constant/api'
// 发布文章
export function publishArticle (articleId, method, params, data) {
  return request({
    url: articleId ? API_ARTICLES + `/${articleId}` : API_ARTICLES,
    method,
    params,
    data
  })
}
// 获取频道数据
export function getChannels () {
  return request({
    url: API_CHANNELS
  })
}
// 获取文章id
export function getArticleById (articleId) {
  return request({
    url: API_ARTICLES + `/${articleId}`
  })
}
