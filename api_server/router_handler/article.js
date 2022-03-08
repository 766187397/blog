// 导入数据库操作模块
const db = require('../db/index')

// 添加或更新文章
exports.addarticle = (req, res) => {
    const sql_u = 'update boke_article set ? where id=?'
    db.query(sql_u, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但影响行数不为 1 说明没有对应的数据则添加数据
        if (results.affectedRows !== 1) {
            const sql_i = 'insert into boke_article set ?'
            db.query(sql_i, req.body, (err, results) => {
                // 执行 SQL 语句失败
                if (err) return res.cc(err)
                    // 执行 SQL 语句成功，但影响行数不为 1
                if (results.affectedRows !== 1) { return res.cc('添加文章信息失败！') }

                // 修改文章信息成功
                return res.cc('添加文章基本信息成功！', 0)
            })
        } else {
            // 修改文章信息成功
            return res.cc('修改文章信息成功！', 0)
        }

    })
}

// 获取文章信息
exports.getarticle = (req, res) => {
    if (req.query.id) {
        // 文章详细页面
        var sql = 'select * from boke_article where id=' + req.query.id
    } else if (req.query.u_id) {
        // console.log(req.query);
        var currentPage = req.query.currentPage * 10
            // 查询数据
        var c_sql = 'select count(*) as sunPage from boke_article where state="false" and u_id=' + req.query.u_id
        var sql = 'select * from boke_article where state="false" and u_id=' + req.query.u_id +
            ' order by releasetime desc limit ' + currentPage + ' , 10' +
            ';' + c_sql
    }
    db.query(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但影响行数小于 1
        if (results.length < 1) { return res.cc('获取文章基本信息失败！') }

        // 获取文章信息成功
        res.send({
            status: 0,
            message: '获取文章基本信息成功！',
            data: results,
        })
    })
}

// 假删除
exports.deletearticle = (req, res) => {
    const sql = 'update boke_article set state="true" where id=?'
    db.query(sql, req.body.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('删除失败！')
            // 删除成功！
        return res.cc('删除成功！', 0)
    })
}