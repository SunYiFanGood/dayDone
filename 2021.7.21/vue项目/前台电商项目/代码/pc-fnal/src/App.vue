<template>
  <div>
    <Header />
    <!-- 显示路由组件：Login\Register... -->
    <router-view />
    <!-- 
      需求：Footer组件在登录&注册不显示
      解决：
        判断当前是否在登录或注册？
        1. v-if="$route.path !== '/login' && $route.path !== '/register'"
        2. v-if="!$route.meta.isFooterHide"
     -->
    <!-- <Footer v-if="$route.path !== '/login' && $route.path !== '/register'" /> -->
    <Footer v-if="!$route.meta.isFooterHide" />
  </div>
</template>
<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>


<style lang="less">
</style>
