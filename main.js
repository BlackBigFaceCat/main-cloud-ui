import Vue from 'vue'
import App from './App'
// 引入axios
import Request from './plugins/pocky-request/index.js'

Vue.config.productionTip = false

Vue.prototype.$serverUrl = 'https://unidemo.dcloud.net.cn';
// Vue 引入全局属性 axios 
Vue.prototype.axios = Request()
/**
	this.axios.request({
        url:'/demo/url',
        method:'get',
        param:{}
    }).then(function({data}){
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
 */

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()