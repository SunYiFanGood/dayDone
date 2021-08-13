const express = require("express");
const router=express.Router();
router.get("/home", (request,response)=>{
    let {user}=request.cookies;
    if (user._id){
        response.render('home', user)
    }else {
        response.redirect("http://127.0.0.1:5000/login.html")
    }
})


module.exports = router;
