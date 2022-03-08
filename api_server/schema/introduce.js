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
const user_pic = joi.string().dataUri().required()
const nickname = joi.string().min(2).max(4).required()
const school = joi.string()
const Professional = joi.string()
const constellation = joi.string().min(2).max(3)
const evaluation = joi.string().max(300).required()

exports.introduce_updata_schema = {
    body: {
        user_pic,
        nickname,
        school,
        Professional,
        constellation,
        evaluation
    },
}