//打开页面首先刷新数据
let script = document.createElement("script");
script.src = 'http://127.0.0.1:5000/getTodoList?callback=getNewTodo';
document.body.appendChild(script);

function getNewTodo(data) {
    Util.getTodos(data);
}

//在输入框按下enter后发送ajax请求添加任务
let addTodo = document.querySelector(".todo-header input");//获取input元素
addTodo.onkeydown = function (e) {
    if (e.keyCode === 13) {
        let value = addTodo.value.trim();
        if (!value) return;
        Util.myAjax({
            url: "http://127.0.0.1:5000/addTodo",
            type: "post",
            timeout: null,
            dataType: "json",
            data: {todoName: value},
            beforeSend: null,
            success: function (data) {
                Util.getTodos(data)
            },
            error: null,
            complete: null
        });
        addTodo.value = "";
    }
}

//点击任务改变状态完成或未完成
let todo_main = document.querySelector(".todo-main");
todo_main.addEventListener("click", function (e) {
    if (e.target.nodeName === "INPUT") {
        const id = e.target.dataset.id;
        const isDone = e.target.checked;
        Util.myAjax({
            url: "http://127.0.0.1:5000/updateTodo",
            type: "post",
            timeout: null,
            dataType: "json",
            data: {id, isDone},
            beforeSend: null,
            success: function (data) {
                Util.getTodos(data)
            },
            error: null,
            complete: null
        })
    }
})
//点击删除按钮删除当前数据
todo_main.addEventListener("click", function (e) {
    if (e.target.nodeName === "BUTTON") {
        const id = e.target.dataset.id;
        Util.myAjax({
            url: "http://127.0.0.1:5000/deleteTodo",
            type: "post",
            timeout: null,
            dataType: "json",
            data: {id},
            beforeSend: null,
            success: function (data) {
                Util.getTodos(data)
            },
            error: null,
            complete: null
        })
    }
})
//清除所有已完成的任务
let cleanTodos = document.querySelector(".todo-footer .btn-danger");
cleanTodos.onclick = function (e) {
    let list = document.querySelectorAll(".todo-main li");
    let isDoneList = [];
    list.forEach(function (item) {
        if (item.dataset.isdone === "true") {
            let id = item.lastElementChild.dataset.id
            isDoneList.push(id)
        }
    });
    console.log(isDoneList)
    Util.myAjax({
        url: "http://127.0.0.1:5000/clearAllDoneTodos",
        type: "post",
        timeout: null,
        dataType: "json",
        data: {ids: JSON.stringify(isDoneList)},
        beforeSend: null,
        success: function (data) {
            Util.getTodos(data)
        },
        error: null,
        complete: null
    })

}
//全选按钮
let allDone = document.querySelector(".todo-footer input");
allDone.onclick = function () {
    let inputs = document.querySelectorAll(".todo-main input");
    inputs = Array.from(inputs);
    let checked = allDone.checked
    let ids = inputs.reduce((pre, item) => {
        if (item.checked === !checked) {
            pre.push(item.dataset.id)
        }
        return pre;
    }, [])
    //console.log(ids)
    Util.myAjax({
        url: "http://127.0.0.1:5000/updateAllTodos",
        type: "post",
        timeout: null,
        dataType: "json",
        data: {
            ids: JSON.stringify(ids),
            isDone: checked
        },
        beforeSend: null,
        success: function (data) {
            Util.getTodos(data)
        },
        error: null,
        complete: null
    })
}

