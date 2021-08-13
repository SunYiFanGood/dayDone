const express=require("express");
const router=express.Router();
const {addTodos}=require("../db/crud/add")
const {findTodos}=require("../db/crud/find")
// 响应所有任务的路由
router.get('/getTodoList', async (req, res) => {
    let todolist = await findTodos()
    // send方法可以直接将todolist这个数组,转成json字符串,所以不需要我们自己手动转
    //   res.send(todolist)
    // 利用jsonp实现跨域
    const { callback } = req.query
    // 由于是自己拼接字符串,所以需要先将todolist转成json字符串再拼接.否则自动将数组toString就不是我们想要的数据格式
    res.send(`${callback}(${JSON.stringify(todolist)})`) //fn([{},{}])
})

// 新增一条任务的路由
router.post('/addTodo', async (req, res) => {
    const { todoName } = req.body
    await addTodos(todoName)
    //响应的应该是添加之后最新的任务列表数据
    let todolist = await findTodos()
    res.send(todolist)
})
module.exports=router;