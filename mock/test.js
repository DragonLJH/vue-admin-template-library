const Mock = require('mockjs')

const data = Mock.mock({
    'data|100': [{
        'time': "@date(2020-MM-dd)",
        'classroom|1-6': 0,
        'reserve|1': ["zs","ls","ww"],
        'projectName': "@cname",
        'projectManager': "@string",
        'remark': "@string",
    }]
})

module.exports = [
    {
        url: '/vue-admin-template/table/alist',
        type: 'get',
        response: config => {
            const items = data.data
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

