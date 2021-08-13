const model = require('../schema/index')
//定义一个添加任务的函数
function upTodos(id,isDone) {
    return model.updateOne({ _id: id }, { $set: { isDone } })
}

function upAllTodos(ids,isDone) {
    return model.updateMany({ _id: { $in: ids } }, { $set: { isDone } })
}

module.exports = {
    upTodos,
    upAllTodos
}
