import request from '../utils/request'
import { API_GETUSERINFO, API_SAVEUSERINFO, API_UPLOADIMG } from '../constant/api'
// 保存用户信息
export function getUserInfo () {
  return request({
    url: API_GETUSERINFO
  })
}
// 保存用户信息
export function saveUserInfo (data) {
  return request({
    url: API_SAVEUSERINFO,
    method: 'patch',
    data
  })
}
// 上传图片
export function uploadImg (data) {
  return request({
    url: API_UPLOADIMG,
    method: 'patch',
    data
  })
}
