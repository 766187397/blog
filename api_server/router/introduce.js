const express = require('express')
const router = express.Router()

// 导入介绍的路由处理函数模块
const introduce = require('../router_handler/introduce')


// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
    // 2. 导入需要的验证规则对象
const { introduce_updata_schema } = require('../schema/introduce')


// 添加或修改介绍的列表数据
router.post('/newdata', expressJoi(introduce_updata_schema), introduce.newdata)

// 获取介绍的列表数据
router.get('/getdata', introduce.getdata)

module.exports = router