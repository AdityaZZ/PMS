module.exports = function ( app ) {

    /**
     * 获取修改密码页面
     * type:'GET'
     * url:'/changePassword'
     */
    app.get('/changePassword',function(req,res){
        if(req.session.user){
            res.render('changePassword');
        }else{
            req.session.error = "请先登录";
            res.redirect('/login');
        }
    });

    /**
     * 修改密码
     * type:'POST'
     * url:'/changePassword'
     */
    app.post('/changePassword', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            password=req.body.newPassword,
            oldPassword=req.body.oldPassword;
        User.findOne({"_id":req.session.user._id,"password":oldPassword},function(error,doc){
            if(doc){
                User.update({"_id":req.session.user._id},{$set:{"password":password}},function(error,doc){
                    if(doc > 0){
                        res.json({status:1,msg: "修改密码成功"});
                    }else{
                        res.json({status:0,msg: "修改密码失败"});
                    }
                });
            }else{
                res.json({status:0,msg: "旧密码不正确"});
            }
        });
    });
};