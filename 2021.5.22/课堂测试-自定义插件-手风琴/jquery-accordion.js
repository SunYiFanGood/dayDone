$.fn.accordion=function (color){
  //给所有li按顺序增加传入的颜色
  $(this).find("li").each(function (index,item){
    $(item).css({
      backgroundColor:color.colors[index],
    })
    //如果传入颜色少于li数量，让后面的li随机颜色
    if (color.colors.length<$(this).parent().find("li").length){
      for (var i=color.colors.length;i<$(this).parent().find("li").length;i++){
        var rColor='#' + Math.random().toString(16).substr(2, 6).toUpperCase();
        console.log($(item).parent().find("li")[i])
        $($(item).parent().find("li")[i]).css({
          backgroundColor:rColor
        })
      }
    }
  })
  //给所有li计算宽度并赋值
  $(this).children("ul").children("li").css({
    width:$(this).width()/$(this).children("ul").children("li").length
  })
  //给li绑定鼠标移入事件
  $(this).on("mouseenter","ul li",function (){
    var width=$(this).parent().parent().width()*0.7;
    var oWidth=$(this).parent().parent().width()*0.3/($(this).parent().children("li").length-1);
    $(this).parent().children("li").stop(true).animate({
      width:oWidth
    })
    $(this).stop(true).animate({
      width:width
    })
  })
  //移除恢复
  $(this).on("mouseleave","ul li",function (){
    var width=$(this).parent().parent().width()/$(this).parent().children("li").length;
    $(this).parent().children("li").stop(true).animate({
      width:width
    })
  })
}
