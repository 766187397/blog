// 文章管理以及发布
const express = require('express')
const router = express.Router()

// 导入介绍的路由处理函数模块
const article = require('../router_handler/article')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
    // 2. 导入需要的验证规则对象
const { article_add_schema } = require('../schema/article')

// 添加或修改文章信息
router.post('/addarticle', expressJoi(article_add_schema), article.addarticle)

// 获取文章信息
router.get('/getarticle', article.getarticle)

// 删除文章信息
router.post('/deletearticle', article.deletearticle)

module.exports = router