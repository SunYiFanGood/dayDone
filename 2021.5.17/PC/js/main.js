//放大镜
magnifier();

function magnifier() {
    //获取节点
    var oMask = document.querySelector(".previewArea .preview .smallArea .mask");
    var oSmall = document.querySelector(".previewArea .preview .smallArea");
    var oBig = document.querySelector(".previewArea .preview .bigArea");
    var oBigImg = document.querySelector(".previewArea .preview .bigArea img");
    
    oSmall.onmousemove = function (e) {
        oMask.style.display = "block"; //当鼠标进入小图区显示小图
        oBig.style.display = "block"; //当鼠标进入小图区显示大图
        var oMaskLocation = {
            left: e.clientX - oSmall.getBoundingClientRect().left - oMask.offsetWidth / 2, //获取移入时幕布的位置=鼠标相对视口的x坐标-小图区相对窗口的左距离-幕布的宽度
            top: e.clientY - oSmall.getBoundingClientRect().top - oMask.offsetHeight / 2 //获取移入时幕布的位置=鼠标相对视口的y坐标-小图区相对窗口的上距离-幕布的高度
        }
        if (oMaskLocation.left < 0) { //判断临界值，幕布不能超出小图区
            oMaskLocation.left = 0;
        } else if (oMaskLocation.left > oSmall.clientWidth - oMask.offsetWidth) {
            oMaskLocation.left = oSmall.clientWidth - oMask.offsetWidth;
        }
        if (oMaskLocation.top < 0) { //判断临界值，幕布不能超出小图区
            oMaskLocation.top = 0;
        } else if (oMaskLocation.top > oSmall.clientHeight - oMask.offsetHeight) {
            oMaskLocation.top = oSmall.clientHeight - oMask.offsetHeight;
        }
        oMask.style.left = oMaskLocation.left + "px"; //给幕布的left赋值
        oMask.style.top = oMaskLocation.top + "px"; //给幕布的top赋值
        //计算幕布移动时大图的移动比例，大图区图片的移动距离=小图区幕布移动距离/小图区宽度*大图区宽度
        var scale = (oBigImg.offsetWidth-oBig.clientWidth) / (oSmall.offsetWidth-oMask.clientWidth);
        oBigImg.style.left = -oMaskLocation.left * scale + "px"; //给大图定位
        oBigImg.style.top = -oMaskLocation.top * scale + "px"; //给大图定位
        oSmall.onmouseleave = function () {
            oMask.style.display = "none"; //当鼠标离开小图区隐藏小图
            oBig.style.display = "none"; //当鼠标离开小图区隐藏大图
        }
    }
}
//动态生成缩略图
getThumbnail();
function getThumbnail(){
    var oList = document.querySelector('.previewArea .prescroll .listOut .list');
    var data=goodData.imgsrc;
    var node=document.createDocumentFragment();
    data.forEach(
        function(value,index){
            var newLi=document.createElement("li");
            var newImg=new Image();
            newImg.src=data[index].s;
            newLi.appendChild(newImg);
            node.appendChild(newLi);
        }
    );
    oList.appendChild(node);
}
//缩略图列表
Thumbnail();

function Thumbnail() {
    var oLeft = document.querySelector(".previewArea .prescroll .left");
    var oRight = document.querySelector(".previewArea .prescroll .right");
    var oLis = document.querySelectorAll(".previewArea .prescroll .listOut .list li");
    var oList= document.querySelector(".previewArea .prescroll .listOut .list");
    var oListImg= document.querySelectorAll(".previewArea .prescroll .listOut .list img");
    var oBigImg = document.querySelector(".previewArea .preview .bigArea img");
    var oSmallImg= document.querySelector(".previewArea .preview .smallArea img");
    var data
    //缩略图的按钮切换
    var location = 0;//声明变量保存ul位置
    var moveAll = (oLis.length - 5) * oLis[0].offsetWidth;//计算可移动的总距离
    var everyMove=2*oLis[0].offsetWidth;//计算每次可以移动的距离
    var data=goodData.imgsrc;
    oRight.onclick = function (e) {//绑定点击事件
        if(everyMove>moveAll-location){//判断移动到最后是不是单数不够两个距离，不够则直接让最大柯移动距离等于location
            location=moveAll;
        }else {
            location+=2*oLis[0].offsetWidth;//不是则每次移动2个li的距离
        }
        oList.style.transform="translateX(-" + location + "px)";//赋值让li偏移
    }
    oRight.onselectstart=function (){return false}//阻止选中事件
    oLeft.onselectstart=function (){return false}//阻止选中事件
    oLeft.onclick = function (e) {//绑定点击事件
        if(everyMove<moveAll-location){//判断移动到最后是不是单数不够两个距离，不够则直接让0等于location
            location=0;
        }else {
            location-=2*oLis[0].offsetWidth;//不是则每次移动2个li的距离
        }
        oList.style.transform="translateX(-" + location + "px)";//赋值让li偏移
    }
    //点击切换图片
    oListImg.forEach(function(value ,index){//遍历所有图片
        oListImg[index].onclick=function (){//给所有图片绑定点击事件
            oSmallImg.src=value.src;//把小图src赋值为当前点击的图片src
            oBigImg.src=data[index].b;//把大图src赋值为当前点击的图片src
        }
    });
}

//动态获取详情
detailData();
function detailData(){
    var  data=goodData.goodsDetail;
    var detail=document.querySelector(".detailArea .priceArea");
    detail.innerHTML="<h3 class=\"title\">"+data.title+"</h3>\n" +
        "                        <p class=\"con1\">"+data.recommend+"</p>\n" +
        "                        <div class=\"price\">\n" +
        "                            <div class=\"priceDetail\">\n" +
        "                                <p>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</p>\n" +
        "                                <p>￥ <span>"+data.price+"</span> 元</p>\n" +
        "                            </div>\n" +
        "                            <div class=\"buy\">\n" +
        "                                <p>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</p>\n" +
        "                                <p><span>"+data.promoteSales.type+"</span>"+data.promoteSales.content+"</p>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <div class=\"support\">\n" +
        "                            <div class=\"supportDetail\">\n" +
        "                                <p>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</p>\n" +
        "                                <p>"+data.support+"</p>\n" +
        "                            </div>\n" +
        "                            <div class=\"address\">\n" +
        "                                <p>配&nbsp;送&nbsp;至</p>\n" +
        "                                <p>"+data.address+"</p>\n" +
        "                            </div>\n" +
        "                        </div>";
}