/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

// 导入数据库
const db = require('../db/index')

// 导入bcryptjs包进行加密
const bcrypt = require('bcryptjs')

// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
    // 导入配置文件(密钥)
const config = require('../config')
    // 导入自定义随机昵称
const random = require('../random')

// 注册用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
        // 对表单的数据进行合法校验
    if (!userinfo.username || !userinfo.password) {
        // return res.send({ stauts: 1, message: '用户名或密码错误!' })
        return res.cc('用户名或密码错误!')
    }
    // 默认头像
    if (!userinfo.user_pic) {
        userinfo.user_pic = 'http://127.0.0.1:3007/images/User/user.jpeg'
    }
    // 没有上传名称使用随机名称
    if (!userinfo.nickname) {
        userinfo.nickname = random
    }
    //定义sql，查询用户名是否被占用
    const sql = `select * from boke_users where username=?`
    db.query(sql, [userinfo.username], (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                // return res.send({ status: 1, message: err.message })
                return res.cc(err)
            }
            // 用户名被占用
            if (results.length > 0) {
                // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
                return res.cc('用户名被占用，请更换其他用户名！')
            }
            //调用bcrypt.hashSync(明文密码, 随机盐的长度)方法进行加密
            userinfo.password = bcrypt.hashSync(userinfo.password, 10)
                // console.log(userinfo)

            // 定义sql语句
            const sql = 'insert into boke_users set ?'
                // 调用 db.query() 执行 SQL 语句，插入新用户
            db.query(sql, userinfo, (err, results) => {
                // 执行 SQL 语句失败
                if (err) return res.send({ status: 1, message: err.message })
                    // SQL 语句执行成功，但影响行数不为 1
                if (results.affectedRows !== 1) {
                    // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                    return res.cc('注册用户失败，请稍后再试！')
                }
                // 注册成功
                // res.send({ status: 0, message: '注册成功！' })
                res.cc('注册成功！', 0)
            })
        })
        // res.send('reguser OK')
}

// 登录的处理函数
exports.login = (req, res) => {
    // 介绍表单信息
    const userinfo = req.body
        // 定义sql语句
    const sql = `select * from boke_users where username=?`
        // 查询参数
    db.query(sql, userinfo.username, function(err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')
            // TODO：判断用户输入的登录密码是否和数据库中的密码一致
            //调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
            // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
            // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('登录失败！')
        }

        // TODO：登录成功，生成 Token 字符串
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = {...results[0], password: '', user_pic: '' }
            // 对用户信息进行加密，生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn, // token 有效期为 10 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })

    })

}