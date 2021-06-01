const http=require("http");
const server=http.createServer(function (request, response){
    console.log('客户端发送请求过来')
    // 获取get请求上传的数据
    console.log(request.url) ///?name=zs&age=18
    // 响应客户端信息
    response.setHeader('content-type', 'text/html;charset=utf8')
    response.end('<h1>哈哈哈</h1>')
})
server.listen(5000,(err)=>{
    if (err) console.log('服务器开启失败', err)
    else console.log('服务器开启成功')
})