(async  function (){
    const express = require("express")
    const db=require("./dataBase/db")
    const cookieParser = require("cookie-parser");
    const loginR=require("./routers/loginR")
    const loginAfterR=require("./routers/loginAfterR")
    const app = express();
    await db;
    console.log("数据库连接成功")
//定义中间件
    app.use(express.static("./public"))//支持自动获取静态资源
    app.use(express.urlencoded({extended: true}))//支持获取post请求主体body
    app.use(cookieParser());//使用cookies

    //应用ejs
    app.set("view engine" , "ejs");
    app.set("views","./mb")
//处理注册请求
    app.use(loginAfterR)
//处理登录请求
    app.use(loginR)
//启动服务器
    app.listen(5000, (err) => {
        if (err) console.log('服务器启动失败', err)
        else console.log('服务器启动成功')
    })
})()