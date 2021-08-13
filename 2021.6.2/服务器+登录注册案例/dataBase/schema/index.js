const mongoose=require("mongoose")
const Schema = mongoose.Schema;
const schemaObj = new Schema({
        username: {
            type: String,
            unique:true,
            required: true
        },
        pw: {
            type: String,
            required: true,
        },
        register_date: {
            type: Date,
            default: Date.now(),
        }

    },
    {collection: 'user'}
);
module.exports =schemaObj;
