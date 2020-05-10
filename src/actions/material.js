import request from '../utils/request'
import { API_GETMATERIAL } from '../constant/api'

// 删除素材
export function delMaterial (id) {
  return request({
    url: API_GETMATERIAL + `/${id}`,
    method: 'delete'
  })
}
// 收藏或者取消收藏
export function collectOrCancel (data, id) {
  return request({
    url: API_GETMATERIAL + `/${id}`,
    method: 'put',
    data
  })
}
// 上传图片
export function onLoad (data) {
  return request({
    url: API_GETMATERIAL,
    method: 'post',
    data
  })
}
// 获取所有素材
export function getAllMaterial (params) {
  return request({
    url: API_GETMATERIAL,
    params
  })
}
