import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from '../pages/home/'
import memberComponent from '../pages/member/'
import searchComponent from '../pages/search/'
import shopcarComponent from '../pages/shopcar/'
import newListComponent from '../pages/newList/'
import newInfoComponent from '../pages/newInfo/'
import photoListComponent from '../pages/photoList/'
import photoInfoComponent from '../pages/photoList/photoInfo'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: homeComponent },
        { path: '/member', component: memberComponent },
        { path: '/search', component: searchComponent },
        { path: '/shopcar', component: shopcarComponent },
        { path: '/home/newList', component: newListComponent },
        { path: '/home/newInfo/:id', component: newInfoComponent },
        { path: '/home/photoList', component: photoListComponent },
        { path: '/home/photoInfo/:id', component: photoInfoComponent }
    ],
    linkActiveClass: 'mui-active'
})