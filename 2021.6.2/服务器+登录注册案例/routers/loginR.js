const createUser=require("../dataBase/crud/index");
const  loginUser=require("../dataBase/crud/login");
const express = require("express");
const router=express.Router();
router.post("", async  (request, response) => {
    let body = request.body;//获取请求主体
    //连接数据库

    const cre=await createUser(body);
    // console.log("cre==="+cre)
    if (!cre){
        console.log("注册成功")
        response.redirect("http://127.0.0.1:5000/login.html")

    }else {
        console.log("注册失败")
        response.send("账号已存在或出现未知错误创建失败")
    }


})
router.post("/login",async (request,response)=>{
    let body = request.body;//获取请求主体
    const login=await loginUser(body);
    //console.log("返回值"+login)

    if (login!==null){
        response.cookie("user",login)
        response.redirect("http://127.0.0.1:5000/home")//查询到则返回登录成功
    }else {
        response.send("该账号未注册或账号,密码错误");//如果查询不到则密码错误或者账号不存在
    }
})


module.exports = router;