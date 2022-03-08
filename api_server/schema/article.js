const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 *  dataUri() 指的是如下格式的字符串数据：data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
 */

const title = joi.string().required()
const pres = joi.string().required()
const cover_img = joi.string().dataUri()
const classify = joi.required()
const art_con = joi.string().required()
const id = joi.string().pattern(/^[0-9]*$/)
const u_id = joi.string().pattern(/^[0-9]*$/)
const username = joi.string().alphanum().min(1).max(10).required()
const releasetime = joi.string()
exports.article_add_schema = {
    body: {
        title,
        pres,
        cover_img,
        classify,
        art_con,
        id,
        u_id,
        username,
        releasetime
    }
}