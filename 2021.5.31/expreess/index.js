const express=require("express")
const app=express();
app.get("/aaa",(request, response)=>{
    console.log(request.query);
    response.send("<h1>我来了小老弟别发了</h1>")
})
app.listen(5000,(err)=>{
    if (err) console.log('启动失败', err)
    else console.log('服务器启动成功')
})