#### 背景

格式：`background:image position repeat color`



####  列表

每个列表都会给自己设置内边距（左）和外边距（上、下），缩进列表。

有时候我们不需要默认带的margin和padding所以我们将他都设置为0。



CSS中的每个列表选项是块状元素再加上标记，但是前面的记号不参与文档布局。不管你的列表在哪里它只会依附在列表的一侧（左侧）

每个li都会生成两个盒子（标记盒子、内容盒子）



#### 列表类型

格式： `list-style-type:value`

* none，没有标识。

  当有序列表中li被设置为none时不阻断有序列表的计算。

#### 列表图像

可以使用图片作为每个列表项前面的记号，使用`list-style-image`

* `url()`，图片的地址。

#### 设置列表记号的位置

格式：`list-style-position:value`

* outside，默认值。将记号放在标记盒子中。
* inside，将记号放在内容盒子中（标记盒子始终存在，只不过为空）。



#### 列表样式的简写属性

`list-style:type image position`

列表中如果有列表图片优先显示列表图片不显示系统自带的标记。

背景中如果有背景图片优先显示背景图片，不显示自己设置的background-color。



#### 表格标题

`caption-side:value`

* top，放在表格框之上
* bottom，放在表格框之下

使用在`table`上面继承下去，或者直接在caption上面使用。



#### 表格的边框

`border-collapse:value`

* separate，分离边框，边框之间有距离。
* collapse，单元格之间没有距离。边框都会被折叠在一起。

