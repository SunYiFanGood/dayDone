const model = require('../schema/index')
//定义一个添加任务的函数
function delTodos(id) {
    return model.deleteOne({
        _id:id,
    })
}

function delAllTodos(ids) {
    return model.deleteMany({_id:{$in:ids}})
}

module.exports = {
    delTodos,
    delAllTodos
}
