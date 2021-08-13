# attr

## 编辑模式&显示模式

1. 添加要显示一行数据

`this.attrValueList.push({})`

2. 显示 el-input 需要聚焦

- 给元素设置 ref `<el-input ref="input"/>`
- 等 DOM 生成，才能通过 ref 获取到 DOM 元素，调用 focus 方法

```js
this.$nextTick(() => {
  this.$refs.input.focus()
})
```

3. 存在问题：将来所有 input 共享一个 ref

- 让 input 都有唯一的 ref `<el-input :ref="$index"/>`
- 因为添加属性值，每次添加时最后一条，下标就是 length - 1

```js
this.$nextTick(() => {
  this.$refs[this.attrValueList.length - 1].focus()
})
```

4. 编辑模式（el-input） 当失去焦点时要去显示模式(p)

- 为了保证唯一，给添加的每条数据增加一个属性 isEdit, 代表是否是编辑模式

```js
this.attrValueList.push({ isEdit: true })
```

- 给 input 绑定失去焦点事件，将 isEdit 改为 false
```js
<el-input @blur="showEdit(row, false)"/>

methods: {
  showEdit(row, isEdit) {
    row.isEdit = isEdit
  }
}
```

5. 显示模式(p)点击时去编辑模式（el-input）
```js
<p @click="showEdit(row, false, $index)"/>

methods: {
  showEdit(row, isEdit, index) {
    row.isEdit = isEdit
    if (isEdit) {
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    }
  }
}
```
