import Mock from 'mockjs'

Mock.mock(/\/test/, {
    'data|1-10': [
        {
            'id|+1': 1,
            'name': '@cname'
        }
    ]
})

// 返回数据，无请求