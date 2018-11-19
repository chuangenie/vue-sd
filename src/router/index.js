import Vue from 'vue'
import Router from 'vue-router'

import HomeComponent from '../pages/home/'
import MemberComponent from '../pages/member/'
import SearchComponent from '../pages/search/'
import ShopcarComponent from '../pages/shopcar/'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeComponent },
        { path: '/member', component: MemberComponent },
        { path: '/search', component: SearchComponent },
        { path: '/shopcar', component: ShopcarComponent }
    ],
    linkActiveClass: 'mui-active'
})