// 导入数据库操作模块
const db = require('../db/index')

// 添加或修改介绍列表数据的处理函数
exports.newdata = (req, res) => {
    const sql_u = 'update boke_introduce set ? where u_id=?'
    db.query(sql_u, [req.body, req.body.u_id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
            // 执行 SQL 语句成功，但影响行数不为 1 说明没有对应的数据则添加数据
        if (results.affectedRows !== 1) {
            const sql_i = 'insert into boke_introduce set ?'
            db.query(sql_i, req.body, (err, results) => {
                // 执行 SQL 语句失败
                if (err) return res.cc(err)
                    // 执行 SQL 语句成功，但影响行数不为 1
                if (results.affectedRows !== 1) { return res.cc('添加用户基本信息失败！') }

                // 修改用户信息成功
                // return res.cc('添加用户基本信息成功！', 0)
            })
        }
        // 修改用户信息成功
        return res.cc('修改或修改用户基本信息成功！', 0)
    })

}


// 获取介绍列表数据的处理函数
exports.getdata = (req, res) => {
    const sql = 'select * from boke_introduce where u_id=?'
    db.query(sql, req.query.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.length !== 1) { return res.cc('获取用户基本信息失败！') }

        // 修改用户信息成功
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0],
        })
    })
}