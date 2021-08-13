(async function (){
    const express=require("express")
    const db=require("./db/connect")
    const delTodo=require("./router/delect")
    const faTodo=require("./router/find_add")
    const updTodo=require("./router/updata")
    const cors=require("cors")
    const app=express();
    await db;
    console.log("数据库连接成功")
    app.use(express.urlencoded({extended: true}));
    app.use(cors());
    app.use(delTodo);
    app.use(faTodo);
    app.use(updTodo);
    app.listen(5000,function (err){
        if (err){
            console.log(err)
        }else {
            console.log("服务器启动成功")
        }
    })
})()