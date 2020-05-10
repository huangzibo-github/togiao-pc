import request from '../utils/request'
import { API_GETCOMMENT, API_CLOSEOROPEN } from '../constant/api'

export function getComment (params) {
  return request({
    url: API_GETCOMMENT,
    params
  })
}

export function openOrClose (params, data) {
  return request({
    url: API_CLOSEOROPEN,
    method: 'put',
    params,
    data
  })
}
