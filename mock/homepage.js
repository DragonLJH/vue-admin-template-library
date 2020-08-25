const Mock = require('mockjs')

const carouselData = Mock.mock({
    'items|6': [{
        'image': "@image('300x300', '#ffcc33', '#FFF', 'png', '!')",
        'msg': "@cword(10)"
    }]
})

const introduceData = Mock.mock({
    'items|100': [{
        'image': "@image('150x150', '#ffcc33', '#FFF', 'png', '!')",
        'type|1': ["Computer","SEM","Communication","Other"],
        'name': "@cword(5)",
        'msg': "@cword(20)",
        'number|10-20': 0
    }]
})

module.exports = [
    {
        url: '/vue-admin-template/homepage/carousel',
        type: 'get',
        response: config => {
            const items = carouselData.items
            return {
                code: 20000,
                data: {
                    total: items.length,
                    items: items
                }
            }
        }
    }, {
        url: '/vue-admin-template/homepage/introduce',
        type: 'get',
        response: config => {
            const items = introduceData.items
            return {
                code: 20000,
                data: {
                    total: items.length,
                    items: items
                }
            }
        }
    }
]

