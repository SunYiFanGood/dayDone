const mongoose=require("mongoose")
const Schema = mongoose.Schema;
const schemaObj = new Schema({
    todoName: {
        type: String,
        unique: true,
        required: true
    },
    isDone: {
        type: String,
        required: true,
        default:"false"
    },

});
module.exports = mongoose.model('todos', schemaObj)
