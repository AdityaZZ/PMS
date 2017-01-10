module.exports = function ( app ) {

    //登录
    require('./login')(app);

    //注册
    require('./register')(app);

    //个人信息-查看修改信息
    require('./updateInfo')(app);

    //修改密码
    require('./changePassword')(app);

    //待办事项管理
    require('./rule')(app);

    //注销
    require('./logout')(app);

};