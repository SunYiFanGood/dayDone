function myAjax(obj){
    let {url,type="get",timeout=30000,dataType="json",data,beforeSend,success,error,complete}=obj;
    let str=obj2Str(data);//处理data转成查询字符串并保存
    if (url)return;//如果没传url则直接退出
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
    xhr.send(obj2Str(data));
    xhr.onreadystatechange=function (){
        if (xhr.readyState===4){
            let value=JSON.parse(xhr.responseText);
            xhr.status===200?(dataType==="text"?(success&&success(xhr.responseText)):(dataType==="json"?(success&&success(value)):null)):(error && error(xhr));
            complete && complete();
        }
    }
}
function obj2Str(obj){
    let arr=[];
    for(let key in obj){
        arr.push(key+"="+obj[key]);
    }
    return arr.join("&")
}
