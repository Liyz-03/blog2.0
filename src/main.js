
import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入全局css样式
import './css/reset.min.css'

//导入全局js文件

//导入全局css文件
import './css/global.css'

// //引入组件
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
Vue.use(MarkdownItVue)



//导入editor
import Editor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(Editor)

//导入element ui
import './plugins/element';
//注册滚动条
import GeminiScrollbar from 'vue-gemini-scrollbar'

Vue.use(GeminiScrollbar)
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Axios from 'axios'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts;


Vue.use(Axios)
// Axios.defaults.baseURL = 'http://192.168.43.228:8888';

const axiosInstance = Axios.create({
   
    baseURL : 'http://127.0.0.1:8888',
});
Vue.prototype.$http = axiosInstance;

axiosInstance.interceptors.request.use(config => {
    // console.log(config);
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    nprogress.start()
    config.headers.sessionToken = window.sessionStorage.getItem('token');
    return config;
})
axiosInstance.interceptors.response.use(config=>{
    nprogress.done()
    return config
})




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
