// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'

// 导入vue-resource
import VueResource from 'vue-resource'
// 注册vue-resource
Vue.use(VueResource)

// 导入 vue-lazyload
import VueLazyload from 'vue-lazyload'
// 注册 vue-lazyload
Vue.use(VueLazyload)

// 安装 缩略图插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

// 导入mui样式
// import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入自己的全局样式
import './css/common.less'

Vue.config.productionTip = false

// 配置vue-resource的请求根域名
Vue.http.options.root = 'http://www.lovegf.cn:8899/'
    // 配置post请求形式
Vue.http.options.emulateJSON = true;

// 按需导入需要的mint-ui组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
//注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)

// 定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    // 直接调用表示获取当前时间
    return moment(dateStr).format(pattern)
})



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})