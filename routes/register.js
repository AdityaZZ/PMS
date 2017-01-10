module.exports = function ( app ) {


    /**
     * 注册
     * type:'POST'
     * data:{uname:uname,upassword:upassword}
     */
    app.post('/register', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            uname = req.body.uname;
        User.findOne({name: uname}, function (error, doc) {
            if (error) {
                res.json({status:0,msg: "服务器繁忙"});
            } else if (doc) {
                res.json({status:0,msg: "用户名已存在"});
            } else {
                User.create({
                    name: uname,
                    password: req.body.upwd
                }, function (error, doc) {
                    if (error) {
                        res.json({status:0,msg: "服务器错误"});
                    } else {
                        res.json({status:1,msg: "用户名创建成功!"});
                    }
                });
            }
        });
    });
}