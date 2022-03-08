// 导入 express
const express = require('express')
    // 创建路由对象
const router = express.Router()
    // 导入用户基本信息模块函数
const userinfo_handler = require('../router_handler/userinfo')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
    // 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema } = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
    // 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
    // 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 向外共享路由对象
module.exports = router