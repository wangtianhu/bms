import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.css'
import Vuex from 'vuex'
import router from './router'
Vue.use(Vuex);
import api from './http/index'
Vue.use(api)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
