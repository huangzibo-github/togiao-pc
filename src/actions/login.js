import request from '../utils/request'
import { API_LOGIN } from '../constant/api'

// 登录
export function submitLogin (data) {
  return request({
    url: API_LOGIN,
    method: 'post',
    data
  })
}
