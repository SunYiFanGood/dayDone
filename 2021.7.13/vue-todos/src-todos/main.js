import Vue from 'vue'
import App from './App.vue'
import "./styles/common.css";

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus=this
  },
  render: h => h(App),
}).$mount('#app')