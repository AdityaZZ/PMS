module.exports = function (app) {
    /**
     * 获取待办事项管理页面
     * type:'GET'
     * url:'/rule'
     */
    app.get('/rule', function (req, res) {
        var todo_items = global.dbHelper.getModel('todo_items');
        if (req.session.user) {
            todo_items.find({"user_id": req.session.user._id}, function (error, docs) {
                res.render('rule', {todo_items: docs, moment: require("moment")});
            });
        } else {
            req.session.error = "请先登录";
            res.redirect('/login');
        }
    });

    /**
     * 创建事项
     * type:'POST'
     * url:'/rule'
     */
    app.post('/rule', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            todo_items = global.dbHelper.getModel('todo_items'),
            title = req.body.title,
            comments = req.body.comments,
            priority = req.body.priority,
            content = req.body.content;
        if (!req.session.user) {
            req.session.error = "用户已过期，请重新登录:";
            res.redirect('/login');
        } else {
            todo_items.create({
                user_id: req.session.user._id,
                todo_item_title: title,
                todo_item_content: content,
                priority: priority,
                comments: comments
            }, function (error, doc) {
                if (doc) {
                    res.json({status: 1, msg: "添加成功"});
                } else {
                    res.json({status: 0, msg: "添加失败"});
                }
            });
        }
    });

    /**
     * 删除事项
     * type:'GET'
     * url:'/deleteRule/id'
     */
    app.get("/deleteRule/:id", function (req, res) {
        //req.params.id 获取事项ID号
        var todo_items = global.dbHelper.getModel('todo_items');
        todo_items.remove({"_id": req.params.id}, function (error, doc) {
            //成功返回1  失败返回0
            if (doc) {
                res.json({status: 1, msg: "删除成功"});
            } else {
                res.json({status: 0, msg: "删除失败"});
            }
        });
    });

    /**
     * 更新事项
     * type:'POST'
     * url:'/updateRule/id'
     */
    app.post("/updateRule/:id", function (req, res) {
        //req.params.id 获取事项ID号
        var todo_items = global.dbHelper.getModel('todo_items'),
            title = req.body.todo_item_title,
            comments = req.body.comments,
            priority = req.body.priority,
            content = req.body.todo_item_content;
        todo_items.update({"_id": req.params.id}, {
            $set: {
                "todo_item_title": title,
                "comments": comments,
                "todo_item_content": content,
                "priority":priority,
                "last_update_date": new Date()
            }
        }, function (error, doc) {
            //成功返回1  失败返回0
            if (doc) {
                res.json({status: 1, msg: "更新成功"});
            } else {
                res.json({status: 0, msg: "更新失败"});
            }
        });
    });


};