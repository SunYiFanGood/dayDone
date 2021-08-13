# Search

## 搜索条件params和query处理

1. 点击搜索按钮跳转到Search组件，需要携带params参数
```js

// Header组件
methods: {
  toSearch() {
    const keyword = this.keyword.trim();

    this.$router.history.push({
      name: "Search",
      params: { keyword }
    });
  }
}

// router/index.js
{
  name: 'Search',
  path: '/search/:keyword',
  component: Search
}
```

2. 点击三级分类不需要携带params，此时跳转路径就有问题

```js
// router/index.js
// 可选的params参数
{
  name: 'Search',
  path: '/search/:keyword?',
  component: Search
}
```

3. 点击搜索按钮携带params参数的同时，也要携带上query参数
```js
methods: {
  toSearch() {
    const keyword = this.keyword.trim();

    this.$router.history.push({
      name: "Search",
      // 添加上query参数
      query: this.$route.query,
      params: {
        keyword
      }
    });
  },
},
```
4. 点击三级分类携带query参数的同时，也要携带上params参数
```js
methods: {
  toSearch() {
    const { categoryname, categoryid, level } = e.target.dataset;
    // 如果点击的是空白区域，那么就获取不到自定义属性，return
    if (!level) return;

    this.$router.history.push({
      name: "Search",
      query: {
        categoryName: categoryname,
        [`category${level}Id`]: categoryid,
      },
      // 携带上params
      params: this.$route.params,
    });
  }
},
```
5. 点击搜索按钮如果值为空，跳转地址有问题
```js
methods: {
  toSearch() {
    const keyword = this.keyword.trim();

    const location = {
      name: "Search",
      // 添加上query参数
      query: this.$route.query,
    };

    // 问题：当keyword没有值，直接点击搜索跳转，路径会不正确
    // 解决：可以跳转，但是当keyword没有值，不要携带params参数
    if (keyword) {
      location.params = { keyword };
    }

    this.$router.history.push(location);
  },
},
```