# 导航守卫
可以看作路由生命周期函数，当路由切换的时候，会自动触发
一上来也会触发

- 文档：https://router.vuejs.org/zh/guide/advanced/navigation-guards.html

## 全局导航守卫
对所有路由组件生效
- 全局前置守卫 beforeEach
- 全局解析守卫 beforeResolve
- 全局后置守卫 afterEach

## 路由导航守卫
只对当前路由组件生效
- beforeEnter

## 组件导航守卫
只会当前路由组件生效
- 组件前置守卫 beforeRouteEnter
- 组件更新守卫 beforeRouteUpdate
- 组件后置守卫 beforeRouteLeave