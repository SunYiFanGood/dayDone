// 1. 引入express
const express = require('express')

// node内置的path模块
// path模块是node中提供的一个专门用来拼接路径的模块
// 有个resolve方法可以拼接路径
const path = require('path')
// 2. 创建应用对象
const app = express()

app.get('/abc', (request, response) => {


})
app.post('/abc', (request, response) => {
  require.body()
  response.send('ok')
})

// 3. 开启服务器
app.listen(5000, (err) => {
  if (err) console.log('启动失败', err)
  else console.log('服务器启动成功')
})
