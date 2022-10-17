import mockjs from 'mockjs'

const userList = mockjs.mock({
    'data|100': [
        {
            name: '@cname'
        }
    ]
})

export default [
    {
        method: 'post',
        url: '/testApi/api/login',
        response: ({ body }) => {
            console.log(body)

            return {
                code: 200,
                message: 'success',
                data: userList
            }
        }
    }
]
