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
        var scale = (oBigImg.offsetWidth - oBig.clientWidth) / (oSmall.offsetWidth - oMask.clientWidth);
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

function getThumbnail() {
    var oList = document.querySelector('.previewArea .prescroll .listOut .list');
    var data = goodData.imgsrc;
    var node = document.createDocumentFragment();
    data.forEach(
        function (value, index) {
            var newLi = document.createElement("li");
            var newImg = new Image();
            newImg.src = data[index].s;
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
    var oList = document.querySelector(".previewArea .prescroll .listOut .list");
    var oListImg = document.querySelectorAll(".previewArea .prescroll .listOut .list img");
    var oBigImg = document.querySelector(".previewArea .preview .bigArea img");
    var oSmallImg = document.querySelector(".previewArea .preview .smallArea img");
    var data
    //缩略图的按钮切换
    var location = 0;//声明变量保存ul位置
    var moveAll = (oLis.length - 5) * oLis[0].offsetWidth;//计算可移动的总距离
    var everyMove = 2 * oLis[0].offsetWidth;//计算每次可以移动的距离
    var data = goodData.imgsrc;
    oRight.onclick = function (e) {//绑定点击事件
        if (everyMove > moveAll - location) {//判断移动到最后是不是单数不够两个距离，不够则直接让最大柯移动距离等于location
            location = moveAll;
        } else {
            location += 2 * oLis[0].offsetWidth;//不是则每次移动2个li的距离
        }
        oList.style.transform = "translateX(-" + location + "px)";//赋值让li偏移
    }
    oRight.onselectstart = function () {
        return false
    }//阻止选中事件
    oLeft.onselectstart = function () {
        return false
    }//阻止选中事件
    oLeft.onclick = function (e) {//绑定点击事件
        if (everyMove < moveAll - location) {//判断移动到最后是不是单数不够两个距离，不够则直接让0等于location
            location = 0;
        } else {
            location -= 2 * oLis[0].offsetWidth;//不是则每次移动2个li的距离
        }
        oList.style.transform = "translateX(-" + location + "px)";//赋值让li偏移
    }
    //点击切换图片
    oListImg.forEach(function (value, index) {//遍历所有图片
        oListImg[index].onclick = function () {//给所有图片绑定点击事件
            oSmallImg.src = value.src;//把小图src赋值为当前点击的图片src
            oBigImg.src = data[index].b;//把大图src赋值为当前点击的图片src
        }
    });
}

//动态获取详情
detailData();

function detailData() {
    var data = goodData.goodsDetail;
    var detail = document.querySelector(".detailArea .priceArea");
    detail.innerHTML = "<h3 class=\"title\">" + data.title + "</h3>\n" +
        "                        <p class=\"con1\">" + data.recommend + "</p>\n" +
        "                        <div class=\"price\">\n" +
        "                            <div class=\"priceDetail\">\n" +
        "                                <p>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</p>\n" +
        "                                <p>￥ <span>" + data.price + "</span> 元</p>\n" +
        "                            </div>\n" +
        "                            <div class=\"buy\">\n" +
        "                                <p>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</p>\n" +
        "                                <p><span>" + data.promoteSales.type + "</span>" + data.promoteSales.content + "</p>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <div class=\"support\">\n" +
        "                            <div class=\"supportDetail\">\n" +
        "                                <p>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</p>\n" +
        "                                <p>" + data.support + "</p>\n" +
        "                            </div>\n" +
        "                            <div class=\"address\">\n" +
        "                                <p>配&nbsp;送&nbsp;至</p>\n" +
        "                                <p>" + data.address + "</p>\n" +
        "                            </div>\n" +
        "                        </div>";
}

//动态生成详情选择
chooseData();

function chooseData() {
    var oChoose=document.querySelector(".detailArea .chooseArea");
    var data=goodData.goodsDetail.crumbData;
    data.forEach(function(value,index){
        var oDl=document.createElement("dl");
        var oDt=document.createElement("dt");
        var oDdData=value.data;//获取数据
        oDt.textContent=value.title;//插入数据
        oChoose.appendChild(oDl);//把dl插入选择区
        oDl.appendChild(oDt);//把dt插入dl中
        oDdData.forEach(function (value,index){//遍历dl
            var oDd=document.createElement("dd");//创建dd
            oDd.textContent=value.type;//插入dd的数据
            oDd.dataset.price=oDdData[index].changePrice;
            oDl.appendChild(oDd)//在每个dl中插入对应的dd

        })

    })

}
//选择详情
choose();
function choose(){
    var oDls=document.querySelectorAll(".detailArea .chooseArea dl");
    var oChooseInsert=document.querySelector(".detailArea .chooseInsert");
    var data=goodData.goodsDetail.crumbData;
    var chooseArr=new Array(4);
    chooseArr.fill(null);
    oDls.forEach(function (value,index){//遍历dl
        var oDlIndex=index;//保存当前dl下标
        var oDds=value.querySelectorAll("dd");//获取当前dl里的dd
        oDds.forEach(function (value,index){//遍历所有的dd
            value.onclick=function (){//给每个dd绑定点击事件
                //先清除所有dd上的样式
                oDds.forEach(function (value,index){
                    value.style.color="#666";
                })
                this.style.color="red";
                //将点击的元素加入到数组中
                chooseArr[oDlIndex]=value;
                //遍历数组
                oChooseInsert.textContent="";//开始时清空mark后遍历重新生成
                chooseArr.forEach(function (value,index){
                    //创建一个mark标签
                    if (!value){//如果是空则跳过
                        return;
                    }
                    var oMark=document.createElement("mark");//创建mark标签
                    oMark.textContent=value.textContent;//将对应数组的值赋值给当前创建的mark
                    var oA=document.createElement("a");//创建a标签用来删除
                    oA.href="###"//设置a标签点击跳转的连接
                    oA.textContent="X";//a标签重插入文本x
                    oA.dataset.index=index;
                    oMark.appendChild(oA);//在mark中插入a标签
                    oChooseInsert.appendChild(oMark);//在ChooseInsert中插入mark

                })
                var deMark=oChooseInsert.querySelectorAll("mark a");//获取所有的a标签
                deMark.forEach(function (value,index){//遍历a，给所有a绑定点击事件
                    value.onclick=function(){
                        //删除当前mark
                        this.parentNode.remove();
                        //删除数组中的mark
                        chooseArr[this.dataset.index]=null;
                        //将当前a对应的dl下的dd恢复到默认位置
                        var deDd=oDls[this.dataset.index].querySelectorAll("dd");
                        deDd.forEach(function (value, index){
                            value.style.color="#666"
                        })
                        //把第一个设置为红色
                        deDd[0].style.color="red"
                        changePrice(chooseArr);//当触发mark删除时，改动价格
                    }
                })
                changePrice(chooseArr);//点击dd时改动价格

            }
        })

    })
}
//封装改价函数
function changePrice(arr){
    var basePrice=goodData.goodsDetail.price;//获取基础价格
    var place=document.querySelector(".detailArea .price .priceDetail p:nth-child(2) span")
    var sum=document.querySelector(".detailArea .goodsNum .num input");
    console.log(sum.value)
    arr.forEach(function (value,index){//遍历数组
        if (!value){
            return;
        }
        basePrice+=+value.dataset.price;
    })
    place.textContent=basePrice*sum.value;
}

//加入购物车数量
thingNum();
function thingNum(){
    var num=1;
    var oAdd=document.querySelector(".detailArea .goodsNum .num .plus");
    var oLess=document.querySelector(".detailArea .goodsNum .num .mins");
    var oInput=document.querySelector(".detailArea .goodsNum .num input");
    oAdd.onclick=function(){
        num++;
        oInput.value=num;
        //数量时改变价格
        var newPrice=document.querySelector(".detailArea .price .priceDetail p:nth-child(2) span");
        var allPrice=num*(+newPrice.textContent/(num-1));
        newPrice.textContent=allPrice;//将数量累积后的价格赋值

    };
    oLess.onclick=function(){
        if (num<=1){
            num=1;
            return;
        }
        num--;
        oInput.value=num;
        var newPrice=document.querySelector(".detailArea .price .priceDetail p:nth-child(2) span");
        var allPrice=num*(+newPrice.textContent/(num+1));
        newPrice.textContent=allPrice;
    }


}

//面向对象tap切换
function Tap(tabTitle,tabContent){
    this.tabTitle=tabTitle;//给实例化对象创建一个属性保存第一个实参
    this.tabContent=tabContent;//给实例化对象创建一个属性保存第二个实参
    var  _this=this;//保存当前的this，当前指向实例化对象
    tabTitle.forEach(function (item,index){
        item.onclick=function (){//遍历第一个实参，并绑定点击事件
            _this.click(this,index);//用实例化对象调用click对象，传入当前点击的目标和下标
        }
    })
}
Tap.prototype.click=function (o,i){//在原型对象上添加通用方法，初形参
    var _this=this;//保存当前的this，当前this指向实例化对象
    this.tabTitle.forEach(function (item,index){//遍历第一个形参
        item.classList.remove("active")//清除title样式
        _this.tabContent[index].classList.remove("active")//清除第二个实参里的active样式
    })
    //给当前点击的title和对应的content加active样式
    o.classList.add("active");
    this.tabContent[i].classList.add("active")

}
//通过实例化对象解决侧边栏的切换
aside();
function aside(){
    var tabTitle=document.querySelectorAll(".productDetial .aside .tabTitle h4");
    var tabContent=document.querySelectorAll(".productDetial .aside .tabContent .tab-pane")
    new Tap(tabTitle,tabContent);
}
//通过实例化对象解决产品详情的tap切换
content();
function content(){
    var tit=document.querySelectorAll(".productDetial .detail .intro .tab-wraped li")
    var con=document.querySelectorAll(".productDetial .detail .intro .tab-content .tab-pane")
    new Tap(tit,con);
}

//选择搭配
select();
function select(){
    var ipt=document.querySelectorAll(".productDetial .detail .fitting .good-suits .suits .suitsItem input");//获取所有的复选框
    var price=+document.querySelector(".productDetial .detail .fitting .good-suits .master p").textContent.slice(1);//获取基础手机的价格
    ipt.forEach(function (item,index){//遍历复选框
        item.onclick=function (){//绑定点击事件
            if (!item.checked===true){//如果没有被选中则总价格减去该没有被选中商品的价格
                price+=-item.value;
            }else {//如果被选中则总价格加上该没有被选中商品的价格
                price+=+item.value;
            }

            var priceNow=document.querySelector(".productDetial .detail .fitting .good-suits .result .price");//获取总价格的文本框
            priceNow.textContent="¥"+price;//赋值
        }

    })
}
//侧边菜单
asideMenu();
function asideMenu(){
    var menuBtn=document.querySelector(".toolBar .menu");
    var menu=document.querySelector(".toolBar");
    var lis=document.querySelectorAll(".toolBar .navList li")
    var liP=document.querySelectorAll(".toolBar .navList li p")
    var flag=true;
    menuBtn.onclick=function (){
        if (flag){
            menu.style.right=0+"px";
            flag=!flag;
        }else {
            menu.style.right=-294+"px";
            flag=!flag;
        }
    }
    lis.forEach(function (item,index){
        item.onmouseenter=function (){
            liP[index].style.left=-62+"px";
        };
        item.onmouseleave=function (){
            liP[index].style.left=35+"px";
        }
    })
}
