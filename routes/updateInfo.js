module.exports = function ( app ) {
    /**
     * 获取修改信息页面
     * type:'GET'
     * url:'/updateInfo'
     */
    app.get('/updateInfo',function(req,res){
        if(req.session.user){
            res.render('updateInfo',{ moment: require("moment")});
        }else{
            req.session.error = "请先登录";
            res.redirect('/login');
        }
    });

    /**
     * 修改信息
     * type:'POST'
     * url:'/updateInfo'
     */
    app.post('/updateInfo', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            sex = req.body.sex,
            age = req.body.age,
            phone_number = req.body.phone_number,
            last_update_date = req.body.last_update_date,
            comments= req.body.comments;
        User.findOne({"_id":req.session.user._id},function(error,doc){
            if(doc){
                User.update({"_id":req.session.user._id},{$set:{"sex":sex,"phone_number":phone_number,"comments":comments,"age":age,"last_update_date":last_update_date}},function(error,doc){
                    //成功返回1  失败返回0
                    if(doc > 0){
                        //手动刷新session
                        req.session.user.sex = sex;
                        req.session.user.age=age;
                        req.session.user.phone_number=phone_number;
                        req.session.user.comments=comments;
                        req.session.user.last_update_date=last_update_date;
                        res.json({status:1,msg: "修改信息成功"});
                    }else{
                        res.json({status:0,msg: "修改信息失败"});
                    }
                });
            }else{
                res.redirect('/login');
            }
        });
    });
};