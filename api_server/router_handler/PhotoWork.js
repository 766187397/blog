// 最新图片
// 导入数据库操作模块
const db = require('../db/index')

// 获取图片信息
exports.getPhotoWork = (req, res) => {
    var sql = 'select * from boke_work where u_id=' + req.query.u_id
    sql += ';select * from boke_Photo_wall where u_id=' + req.query.u_id
    db.query(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但影响行数小于 1
        if (results.length < 1) { return res.cc('获取图片基本信息失败！') }

        // 获取图片信息成功
        res.send({
            status: 0,
            message: '获取图片基本信息成功！',
            data: results,
        })
    })
}

// 提交图片信息
exports.postPhotoWork = (req, res) => {
    // 先清空再添加
    if (req.body[0].title) {
        var sql = 'delete from boke_work where u_id=' + req.body[0].u_id + ';'
    } else {
        var sql = 'delete from boke_Photo_wall where u_id=' + req.body[0].u_id + ';'
    }
    var u_sql = ""
    for (let i = 0; i < 12; i++) {
        if (req.body[i]) {
            if (req.body[i].title) {
                u_sql += 'insert into boke_work(u_id,title,Photo) value ("' +
                    req.body[i].u_id + '","' + req.body[i].title + '","' + req.body[i].img + '");'
            } else {
                u_sql += 'insert into boke_Photo_wall(u_id,Photo) value ("' +
                    req.body[i].u_id + '","' + req.body[i].img + '");'
            }
        }
    }
    sql += u_sql
        // console.log(sql);
    db.query(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但影响行数小于 1
        if (results.length < 1) { return res.cc('添加图片失败！') }
        // 获取图片信息成功
        res.send({
            status: 0,
            message: '添加图片成功！',
            data: results,
        })
    })
}