import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import request from './utils/request';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.$request = request




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
