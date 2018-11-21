// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入vue-resource
import VueResource from 'vue-resource'
// 注册vue-resource
Vue.use(VueResource)

Vue.config.productionTip = false

// 配置vue-resource的请求根域名
Vue.http.options.root = 'http://www.lovegf.cn:8899/'

// 按需导入需要的mint-ui组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
//注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

// 导入mui样式
// import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入自己的全局样式
import './css/common.less'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})