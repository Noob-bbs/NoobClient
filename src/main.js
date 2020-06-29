import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
//注意修改原型链的用途
axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(Element);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
