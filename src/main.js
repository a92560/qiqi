// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import Scroller from "./components/Scroller/Scroller";
import Loading from "./components/Loading/Loading";
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUi)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.filter('setWH',(url,arg) =>{
  if(url){
    return url.replace(/w\.h/,arg)
  }
})
//全局注册Scroller组件
Vue.component('Scroller',Scroller)
//全局注册Loading组件
Vue.component('Loading',Loading)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
