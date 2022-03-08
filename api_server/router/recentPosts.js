// 最新文章
const express = require('express')
const router = express.Router()

// 导入介绍的路由处理函数模块
const recentPosts = require('../router_handler/recentPosts')

// 获取文章信息以及查询
router.get('/getrecentPosts', recentPosts.getrecentPosts)

module.exports = router