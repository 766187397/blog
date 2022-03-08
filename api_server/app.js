const path = require('path')
    // 导入express
const express = require('express')
    // 创建实例对象
const app = express()

const bodyParser = require('body-parser')

// 增大可传递的数据大小值
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 响应数据的中间件
app.use(function(req, res, next) {
        // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
        res.cc = function(err, status = 1) {
            res.send({
                // 状态
                status,
                // 状态描述，判断 err 是 错误对象 还是 字符串
                message: err instanceof Error ? err.message : err,
            })
        }
        next()
    })
    // 验证规则模块
const joi = require('joi')

// 导入core解决跨域
const cors = require('cors')
app.use(cors())

// 静态资源处理
app.use(express.static(path.join(__dirname, 'public')));

// 导入配置文件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 配置解析表单中间件
// 只能解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// 导入并注册用户路由模块(包含登录注册)
const userRouter = require('./router/user')
app.use('/api', userRouter)
    // 导入并使用用户信息路由模块(个人中心)
const userinfoRouter = require('./router/userinfo')
    // 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)

// 导入并使用介绍路由模块
const introduceRouter = require('./router/introduce')
    // 为介绍的路由挂载统一的访问前缀 
app.use('/api/introduce', introduceRouter)

// 导入并使用文章管理路由模块
const articleRouter = require('./router/article')
    // 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)

// 导入并使用文章路由模块
const recentPostsRouter = require('./router/recentPosts')
app.use('/api/recentPosts', recentPostsRouter)

// 导入并使用照片墙和技能路由模块
const PhotoWork = require('./router/PhotoWork')
app.use('/api/PhotoWork', PhotoWork)

// 错误中间件
app.use(function(err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
        // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
        // 未知错误
    res.cc(err)
})

// 启动服务器
app.listen(3007, () => {
    console.log('http://127.0.0.1:3007')
})