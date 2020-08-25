import request from '@/utils/request'

export function getcarouselList(params) {
  return request({
    url: '/vue-admin-template/homepage/carousel',
    method: 'get',
    params,

  })

}

export function getintroduceList(params) {
  return request({
    url: '/vue-admin-template/homepage/introduce',
    method: 'get',
    params,

  })

}
