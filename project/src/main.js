import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'


import api from '@/components/http/api.js' //这里注意自己的路径
Vue.prototype.$api = api //注册为全局变量


Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// 导航条回到顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
})