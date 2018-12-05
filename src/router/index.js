import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from '../pages/home/'
import memberComponent from '../pages/member/'
import searchComponent from '../pages/search/'
import shopcarComponent from '../pages/shopcar/'
import newListComponent from '../pages/newList/'
import newInfoComponent from '../pages/newInfo/'
import photoListComponent from '../pages/photoList/'
import photoInfoComponent from '../pages/photoList/photoInfo/'
import goodsListComponent from '../pages/goodsList/'
import goodsInfoComponent from '../pages/goodsList/goodsInfo'
import goodsdescComponent from '../pages/goodsList/goodsdesc'
import goodscommentComponent from '../pages/goodsList/goodscomment'

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
        { path: '/home/photoInfo/:id', component: photoInfoComponent },
        { path: '/home/goodsList', component: goodsListComponent },
        { path: '/home/goodsInfo/:id', component: goodsInfoComponent, name: 'goodsInfo' },
        { path: '/home/goodsdesc/:id', component: goodsdescComponent, name: 'goodsdesc' },
        { path: '/home/goodscomment/:id', component: goodscommentComponent, name: 'goodscomment' }
    ],

})