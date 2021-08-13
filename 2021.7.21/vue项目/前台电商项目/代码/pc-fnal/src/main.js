import Vue from "vue";
import VueLazyload from 'vue-lazyload'
import App from "./App.vue";
import router from "./router";
import store from "./store";

import error from './assets/error.jpeg';
import loading from './assets/loading.gif';

// 引入mock使其生效
import './mock'

import "./styles/reset.css";
import "./styles/iconfont.css";

// 安装插件
Vue.use(VueLazyload, {
  preLoad: 1.3, // 预载高度比例
  error: error, // 加载失败时图像
  loading: loading, // 加载时图像
  attempt: 2 // 尝试次数
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
