const express=require("express");
const router=express.Router();
const {delTodos, delAllTodos}=require("../db/crud/delect")
const {findTodos}=require("../db/crud/find")
// 删除一条任务数据的路由
router.post('/deleteTodo', async (req, res) => {
    let {id}=req.body;
    await delTodos(id);
    let todolist = await findTodos()
    res.send(todolist)
})
// 清除所有已完成任务的路由
router.post('/clearAllDoneTodos', async (req, res) => {
    let {ids}=req.body;
    ids=JSON.parse(ids);
    await delAllTodos(ids)
    let todolist = await findTodos()
    res.send(todolist)
})

module.exports=router;