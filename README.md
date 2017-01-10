#	PMS

##	一.说明

​	个人代办事项管理系统PMS

##  二.配置
*   NodeJS express + MongoDB
*   [MongoDB下载地址](https://www.mongodb.com/download-center?jmp=nav)
*   [Robomong(MongoDB可视化工具)下载地址](https://robomongo.org/download)
*   [NodeJS下载地址](https://nodejs.org/en/)
    

##	三.初始化&运行

* 1.在安装好的MongoDB目录下建立`Data/db`子目录用于存储数据
* npm install 安装项目依赖
* 2.在`MongoDB\Server\3.4\bin`下打开cmd窗口,输入`mongod -dbpath "D:\Program Files\MongoDB\Data\db"`开启数据库服务
* 3.进入工程目录`PMS`运行`node app.js`运行程序
* 4.浏览器输入`http://localhost`


##	四.页面

* 登录注册页：`http://localhost/login`
* 个人信息查看修改页：`http://localhost/updateInfo`
* 密码修改页：`http://localhost/changePassword`
* 事项管理页：`http://localhost/rule`


##	五.其他说明

* 由于数据库使用的是NoSQL,导入和导出数据库不方便,因此开始程序无数据，需要先手动注册用户。
