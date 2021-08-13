let username = document.querySelector("input[name=username]")
let pw = document.querySelector("input[name=pw]")
let submit = document.querySelector("input[type=submit]")
let flag=[];//设置提交校验


//校验用户名密码的函数封装
function userText(reg,info,index){
    return function (e) {
        const value = this.value.trim();
        if (!value) {
            this.nextElementSibling.textContent=""
            return;
        };
        const span = this.nextElementSibling;
        if (reg.test(value)) {
            span.textContent = "可用";
            span.style.color = "green";
            flag[index]=true;
        } else {
            span.textContent = info;
            span.style.color = "red";
            flag[index]=false;
        }

    }
}

username.oninput =userText(/^web\w{5,8}$/,"不可用！请输入以web开头的8-12位字符",0)
//密码的表单验证
pw.oninput =userText(/^[A-z0-9]{6,16}$/,"不可用！请输入数字或字母6-16位",1);

//提交时验证是否所有的输入框都满足条件，有一项不满足则提示并不提交
submit.onclick = function (e) {
    if (!flag.every((value)=>{return value===true})){//当所有项都满足条件时则不执行下面语句
        e.preventDefault();//阻止提交默认事件
        this.nextElementSibling.textContent="登录失败，请确保每一项填写正确"
        this.nextElementSibling.style.color="red"
    }

}

