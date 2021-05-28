//绑定顶部输入框增加事件
$(".todo-header input").keyup( function (e) {
    if (e.keyCode === 13) {
        var value = $(this).val().trim();
        if (!value)return
        var str = '<li> <label> <input type="checkbox"> <span>' + value +'</span></label><button class="btn btn - danger" style="display:none">删除</button></li>';
        $(".todo-container ul").append(str);
        $(this).val("");
        checkNow();
    }
})
//选中时改变样式
$(".todo-main").on("click","li label input",function (){
    $(this).next().toggleClass("isDown");
    checkNow();
})
//点击全选
$(".todo-footer label input").click(function (){
    $(".todo-main li label input").prop("checked",$(".todo-footer label input:checked").val()==="on");
    if ($(".todo-footer label input:checked").val()==="on"){
        $(".todo-main li label span").addClass("isDown")
    }else {
        $(".todo-main li label span").removeClass("isDown")
    }
    checkNow();
})
//删除所有已完成的事件
$(".todo-footer button").click(function (){
    $(".todo-main li label input:checked").parent().parent().remove();
    checkNow();
})
//鼠标移入时显示删除按钮
$(".todo-main li").mouseenter(function (){
    $(this).children("button").show()
});
$(".todo-main li").mouseleave(function (){
    $(this).children("button").hide()
})
//点击删除时删除整个li
$(".todo-main li button").click(function (){
    $(this).parent().remove();
    checkNow()
})
//动态更新数量函数
function checkNow(){
    var checked=$(".todo-main li label input:checked").length;
    var allCheck=$(".todo-main li label input").length;
    $(".todo-footer label input").prop("checked",checked===allCheck&&allCheck!==0);
    $(".todo-footer span").html("<span>\n" + "          <span>已完成"+checked+"</span> / 全部"+allCheck+"\n" + "        </span>")
}