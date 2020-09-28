import Vue from 'vue'
import App from './App'
// 引入 axios
import Request from './plugins/pocky-request/index.js'
// 引入第三方 ColorUI
import cuCustom from './colorui/components/cu-custom.vue'
import commonFuc from '@/utils/util.js'
Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false
// 图片模板加载、请求的配置地址
Vue.prototype.$serverUrl = 'https://unidemo.dcloud.net.cn';
// Vue 引入全局属性 axios 
Vue.prototype.axios = Request()
Vue.prototype.$util = commonFuc
/** 请求小栗子：
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