// 最新文章
// 导入数据库操作模块
const db = require('../db/index')

// 获取文章信息
exports.getrecentPosts = (req, res) => {
    var currentPage = req.query.currentPage * 10
    if (req.query.id) {
        var sql = 'select * from boke_article where id=' + req.query.id
    } else if (req.query.active) {
        // 总条数
        var c_sql = 'select count(*) as sunPage from boke_article where state="false" and classify="' + req.query.active + '"'
            // 通过分类查询数据
        var sql = 'select * from boke_article where state="false" and classify="' + req.query.active +
            '" order by releasetime desc limit ' + currentPage + ' , 10' +
            ';' + c_sql
    } else if (req.query.searchdata) {
        // 总条数
        var c_sql = 'select count(*) as sunPage from boke_article where state="false" and art_con like "%' + req.query.searchdata + '%"'
            // 通过搜索查询数据
        var sql = 'select * from boke_article where state="false" and art_con like "%' + req.query.searchdata +
            '%" order by releasetime desc limit ' + currentPage + ' , 10' +
            ';' + c_sql
    } else if (req.query.u_id) {
        // 单个用户文章
        if (req.query.active) {
            // 总条数
            var c_sql = 'select count(*) as sunPage from boke_article where state="false" and classify="' + req.query.active + '"'
                // 通过分类查询数据
            var sql = 'select * from boke_article where state="false" and u_id=' + req.query.u_id + ' and classify="' + req.query.active +
                '" order by releasetime desc limit ' + currentPage + ' , 10' +
                ';' + c_sql
        } else if (req.query.searchdata) {
            // 总条数
            var c_sql = 'select count(*) as sunPage from boke_article where state="false" and art_con like "%' + req.query.searchdata + '%"'
                // 通过搜索查询数据
            var sql = 'select * from boke_article where state="false" and u_id=' + req.query.u_id + ' and art_con like "%' + req.query.searchdata +
                '%" order by releasetime desc limit ' + currentPage + ' , 10' +
                ';' + c_sql
        } else {
            // 总条数
            var c_sql = 'select count(*) as sunPage from boke_article where state="false"'
                // 单个用户发布的文章
            var sql = 'select * from boke_article where state="false" and u_id=' + req.query.u_id + ' order by releasetime desc limit ' +
                currentPage + ' , 10' + ';' + c_sql
        }
    } else {
        // 总条数
        var c_sql = 'select count(*) as sunPage from boke_article where state="false"'
            // 默认
        var sql = 'select * from boke_article where state="false" order by releasetime desc limit ' +
            currentPage + ' , 10' + ';' + c_sql
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