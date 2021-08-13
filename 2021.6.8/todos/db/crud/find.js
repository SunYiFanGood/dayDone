const model = require('../schema/index')
//定义一个添加任务的函数
function findTodos() {
    return model.find()
}

module.exports = {
    findTodos,
}
