# 品牌管理

## 配置路径别名

目的：写路径可以更加简单

配置：

1. 修改 vue 脚手架配置：vue.config.js

```js
alias: {
  "@": resolve("src"),
  "@comps": resolve("src/components"),
  "@assets": resolve("src/assets"),
  "@api": resolve("src/api"),
  "@views": resolve("src/views"),
  "@utils": resolve("src/utils")
}
```

此时路径就可以使用，但是没有提示

2. 配置 VSCODE 路径提示：jsconfig.json

```json
"paths": {
  "@/*": ["src/*"],
  "@comps/*": ["src/components/*"],
  "@assets/*": ["src/assets/*"],
  "@api/*": ["src/api/*"],
  "@views/*": ["src/views/*"],
  "@utils/*": ["src/utils/*"]
}
```

此时写路径就有提示了，如果还没有，重启 VSCODE 试试~

## 配置代码模板

目的：写组件时更加简单

配置：设置 --> 用户代码片段 --> vue.json

```json
"Print to vue": {
  "prefix": "vue",
  "body": [
    "<template>",
    "  <div>$1</div>",
    "</template>",
    "",
    "<script>",
    "export default {",
    "  name: '$1',",
    "}",
    "</script>",
    "",
    "<style lang=\"sass\" scoped>",
    "",
    "</style>",
    ""
  ],
  "description": "快速创建vue组件"
}
```

## 配置路由

1. 定义路由组件
   trademark attr sku spu
2. 配置路由: router/index.js
   详见代码

## 完成静态组件

模板项目已经完整引入了 element-ui 了，我们不需要手动引入了（详见 main.js）

1. 整体结构：

- el-card
  - el-button
  - el-table
  - el-pagination

2. 修改 el-pagination 的样式

- 在 styles/element-ui.scss 中修改，能对所有路由组件生效

## 分页展示数据

1. 配置代理服务器

- vue.config.js

```js
"/dev-api": {
  // 目标服务器地址
  target: "http://39.98.123.211/",
  // 路径重写
  pathRewrite: {
    "^/dev-api": ""
  }
}
```

2. 修改 utils/request.js

我们使用模板项目自带的登录功能，这个功能使用 mock 实现的，默认返回数据 code 为 20000 代表成功

而我们真实服务器接口，默认返回数据 code 为 200 代表成功，所以要处理我们的情况

```js
if (res.code !== 20000 && res.code !== 200) { ... }
```

3. 定义 api/trademark.js

4. 组件引入，mounted 发送请求

5. 实现分页展示

## 解决 eslint 报错

1. 配置 vetur 插件

插件 -- 扩展设置 -- settings.json

```json
"vetur.format.defaultFormatterOptions": {
  "prettier": {
    // 去掉分号
    "semi": false,
    // 单引号
    "singleQuote": true,
    // 结尾不要逗号
    "trailingComma": "none"
  }
}
```

修改 vue 文件的格式化

2. 配置 prettier

在项目根目录新建 .prettierrc.js

```js
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none'
}
```

修改 js 文件的格式化

3. 其他错误就需要手动修改

## 问题：发送添加品牌请求，请求失败

登录方面的请求，是模板项目自带的，采用 mock 方式

其他请求，是需要请求目标服务器才能返回数据。
为了解决跨域，先发送给代理服务器，再由代理服务器转发请求到目标服务器上，从而得到数据的

问题原因：请求还没来到代理服务器，被 mock 服务器处理了，导致请求失败

解决：

1. 在 vue.config.js 中，将 before 改成 after
   为了让请求先来到代理服务器，再去 mock 服务器

2. 新建 requestMock.js 文件，将 baseURL 改为 /mock

3. user 相关的请求，请求的文件改为 requestMock
   让 user 相关的请求走 mock 服务器
   其他请求没改，所以走代理服务器

4. mock/mock-server.js 将请求前缀改为 /mock
