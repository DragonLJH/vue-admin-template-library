import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/alist',
    method: 'get',
    params,

  })

}
