// 照片墙或技能
const express = require('express')
const router = express.Router()

// 导入介绍的路由处理函数模块
const PhotoWork = require('../router_handler/PhotoWork')

// 获取图片信息以及查询
router.get('/getPhotoWork', PhotoWork.getPhotoWork)

// 提交图片信息以及查询
router.post('/postPhotoWork', PhotoWork.postPhotoWork)

module.exports = router