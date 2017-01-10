module.exports = function ( app ) {

    /**
     * 获取登录页面
     * type:'GET'
     * url:'/login'
     */
    app.get('/login',function(req,res){
        res.render('login');
    });

    /**
     * 登录
     * type:'POST'
     * data:{uname:uname,upassword:upassword}
     */
    app.post('/login', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            uname = req.body.uname;
        User.findOne({name: uname}, function (error, doc) {
            if (error) {
                res.json({status:0,msg: "服务器繁忙"});
            } else if (!doc) {
                res.json({status:0,msg: "用户名不存在"});
            } else {
               if(req.body.upwd != doc.password){
                   res.json({status:0,msg: "密码错误"});
               }else{
                   req.session.user=doc;
                   res.json({status:1,msg: "登录成功"});
               }
            }
        });
    });

};