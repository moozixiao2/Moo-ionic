const Mock = require('mockjs')

const data = () => {
    const result = {test: {}}
    result.test = Mock.mock({
        'data|1-10': [
            {
                'id|+1': 1,
                'name': '@cname'
            }
        ]
    })
}

module.exports = data