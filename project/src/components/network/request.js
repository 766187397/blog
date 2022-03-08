// 封装独立的请求 后期更好修改
import axios from "axios"
import qs from "qs"

// 添加请求拦截器
axios.interceptors.request.use(function(config) {

    config.timeout = 24000
    config.headers.token = '';
    // console.log(config, '0000')
    config.data = qs.stringify(config.data)
    return config
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    // console.log(response, 'response')
    if (response.status !== 200) {
        return alert(response.statusText)
    }
    return response.data
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
});

export default axios