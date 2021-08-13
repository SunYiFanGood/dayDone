const express=require("express");
let router=express.Router();
const {findTodos}=require("../db/crud/find")
const {upTodos, upAllTodos}=require("../db/crud/updata")
// 修改一条任务的状态(是否完成)的路由
router.post('/updateTodo', async  (req, res) => {
    let { id, isDone } = req.body;
    await upTodos(id,isDone);
    let todolist = await findTodos()
    res.send(todolist)
})

// 全选的路由
router.post('/updateAllTodos', async (req, res) => {
    let { ids, isDone } = req.body;
    ids=JSON.parse(ids)
    await upAllTodos(ids,isDone);
    let todolist = await findTodos()
    res.send(todolist)
})

module.exports=router;