const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const app = express();
app.use(express.static("./public"))
app.use(express.urlencoded({extended: true}))
app.post("", (request, response) => {
    let body = request.body;


    //连接数据库
    (async function () {
        try {
            // 2. 连接数据库
            await mongoose.connect('mongodb://127.0.0.1:27017/web0323', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })

            // 3. 这里的代码可以执行表示数据库连接成功
            console.log('数据库连接成功')
            const Schema = mongoose.Schema;
            const schemaObj = new Schema({
                    username: {
                        type: String,
                        required: true,
                    },
                    pw: {
                        type: String
                    },
                    register_date: {
                        type: Date,
                        default: Date.now(),
                    }

                },
                {collection: 'user'}
            );
            const modelObj = mongoose.model('user', schemaObj);
            const mod=modelObj.create({
                username:body.username,
                pw:body.pw
            })
            console.log(mod)
            response.send("注册成功")
        } catch (err) {
            console.log(err)
            response.send("注册失败,已存在该用户名或者用户名格式错误！")
        }
    }())


})
app.listen(5000, (err) => {
    if (err) console.log('服务器启动失败', err)
    else console.log('服务器启动成功')
})