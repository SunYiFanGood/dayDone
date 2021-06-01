const mongoose=require("mongoose")
mongoose.set('useCreateIndex', true);
module.exports= mongoose.connect('mongodb://127.0.0.1:27017/web0323', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})