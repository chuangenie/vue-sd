import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from '../pages/home/'
import memberComponent from '../pages/member/'
import searchComponent from '../pages/search/'
import shopcarComponent from '../pages/shopcar/'
import newListComponent from '../pages/newList/'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: homeComponent },
        { path: '/member', component: memberComponent },
        { path: '/search', component: searchComponent },
        { path: '/shopcar', component: shopcarComponent },
        { path: '/home/newList', component: newListComponent }
    ],
    linkActiveClass: 'mui-active'
})