// 专门放置请求模块的逻辑
import request from '../utils/request'
import { API_ARTICLES, API_CHANNELS, API_DELETEARTICLES } from '../constant/api'

// 获取文章列表数据
export function getArticles (params) {
  return request({
    url: API_ARTICLES,
    params
  })
}
// 获取频道列表
export function getChannels () {
  return request({
    url: API_CHANNELS
  })
}
// 删除文章
export function deleteArticle (id) {
  return request({
    url: API_DELETEARTICLES + `/${id.toString()}`,
    method: 'delete'
  })
}
