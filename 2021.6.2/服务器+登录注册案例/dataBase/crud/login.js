const mongoose = require("mongoose");
const schemaObj = require("../schema");
const modelObj = mongoose.model('user', schemaObj);
module.exports = function loginUser(body) {
    return  modelObj.findOne({username: body.username, pw: body.pw})

};