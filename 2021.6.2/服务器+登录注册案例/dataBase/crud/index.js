const mongoose=require("mongoose");
const schemaObj=require("../schema");
const modelObj = mongoose.model('user', schemaObj);
module.exports=function createUser(body){
    return modelObj.findOne({username:body.username},(err,data)=>{
        if (err){
            console.log(err)
        }else{
                if (!(data==null)){//如果账号已经存在则不创建
                    console.log("存在账号")
                }else{
                    return modelObj.create({//账号不存在则创建新账号
                            username:body.username,
                            pw:body.pw
                        })
                }


        }
    })


};

