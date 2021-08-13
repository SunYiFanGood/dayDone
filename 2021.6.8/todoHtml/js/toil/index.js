Util={
    myAjax:function (obj){
        let {url,type="get",timeout=30000,dataType="json",data,beforeSend,success,error,complete}=obj;
        let str=Util.obj2Str(data);//处理data转成查询字符串并保存
        if (!url)return;//如果没传url则直接退出
        const xhr=new XMLHttpRequest();//获取ajax对象
        xhr.timeout=timeout;
        if (type==="get"){//如果传输类型为get则拼接url，并将data赋值为null
            url+=url+"?"+str;
            data=null;
        };
        xhr.open(type,url);
        if (type==="post"){//如果
            xhr.setRequestHeader( "content-type", "application/x-www-form-urlencoded");
        };
        let beforeS=beforeSend && beforeSend();
        if (beforeS===false)return;
        xhr.send(Util.obj2Str(data));
        xhr.onreadystatechange=function (){
            if (xhr.readyState===4){
                let value=JSON.parse(xhr.responseText);
                xhr.status===200?(dataType==="text"?(success&&success(xhr.responseText)):(dataType==="json"?(success&&success(value)):null)):(error && error(xhr));
                complete && complete();
            }
        }
    },
    obj2Str:function (obj){
        let arr=[];
        for(let key in obj){
            arr.push(key+"="+obj[key]);
        }
        return arr.join("&")
    },
    getTodos:function (data){
        let todoList=document.querySelector(".todo-main");
        let str="";
        let count=0;
        let newArr=data.map((item)=>{
            if (item.isDone==="true"){
                count++;
            }
            return `<li data-isdone=${item.isDone}>
              <label>
                <input data-id=${item._id} type="checkbox" ${item.isDone==='true'?'checked':''}>
                <span class="${item.isDone==='true'?'active':''}">${item.todoName}</span>
              </label>
              <button data-id=${item._id} class="btn btn-danger" >删除</button>
            </li>`
        })
        str=newArr.join("")
        todoList.innerHTML=str;
        let hasDone=document.querySelector("#hasDone");
        hasDone.textContent=`已完成 ${count}`;
        hasDone.nextElementSibling.textContent=`/全部 ${data.length}`;
        let allCheck=document.querySelector(".todo-footer label input");
        if (data.length>0&&count===data.length){
            allCheck.checked=true;
        }else {
            allCheck.checked=false;
        }
        if (data.length===0){
            document.getElementById("tip").style.display="block";
            document.querySelector(".todo-main").style.display="none"
            document.querySelector(".todo-footer").style.display="none"
        }else {
            document.getElementById("tip").style.display="none";
            document.querySelector(".todo-main").style.display="block"
            document.querySelector(".todo-footer").style.display="block"
        }

    }
}