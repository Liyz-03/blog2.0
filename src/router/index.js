import Vue from 'vue'
import VueRouter from 'vue-router'

//导出admin根组件
import Admin from '../components/admin'
import Login from '../components/admin/login'
import Index from '../components/admin/index'
import Total from '../components/admin/total'
import Write from '../components/admin/write'
import Modify from '../components/admin/modify'
import Category from '../components/admin/cotagory'
import Mywords from '../components/admin/mywords'
import AdminLiuyan from '../components/admin/liuyan'
import ATimeline from '../components/admin/timeline'


Vue.use(VueRouter)

//---------------------------------------------------
import Markdown from '../components/markdown'
//---------------------------------------------------
//导出home的根组件
import Home from '../components/home'
import Post from '../components/home/posts'
import Timeline from '../components/home/timeline'
import Detail from '../components/home/detail'
import Liuyan from '../components/home/liuyan'
import PL from '../components/pl'


const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    //-----------------Test-----------------------------
    {
        path: '/markdown',
        component: Markdown
    },
    {
        path: '/pl',
        component: PL
    },
    //---------------------------------------------------
    //home根组件
    {
        path: '/home',
        component: Home,
        redirect: '/home/index',
        children: [{
            path: '/home/index', component: Post
        },{
            path: '/home/index/:categoryId', component: Post
        }, {
            path: '/home/timeline', component: Timeline
        }, {
            path: '/home/detail/:index', name: 'detail', component: Detail
        },
            {
                path: '/home/liuyan', name: 'liuyan', component: Liuyan
            }]
    },
    //admin根组件
    {
        name: 'admin',
        path: '/admin',
        component: Admin,
        redirect: '/admin/login',
        children: [
            {
                name: 'login', path: '/admin/login', component: Login
            },
            {
                name: 'index',
                path: '/admin/index',
                component: Index,
                redirect: '/admin/index/total',
                children: [{
                    name: 'total', path: '/admin/index/total', component: Total
                }, {
                    name: 'write', path: '/admin/index/write', component: Write
                }, {
                    name: 'modify', path: '/admin/index/modify', component: Modify
                }, {
                    name: 'category', path: '/admin/index/category', component: Category
                }, {
                    name: 'mywords', path: '/admin/index/mywords', component: Mywords
                }, {
                    name: 'liuyan', path: '/admin/index/liuyan', component: AdminLiuyan
                },
                    {name: 'timeline', path: '/admin/index/timeline', component: ATimeline}
                ]
            },
        ]
    }]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    const token = window.sessionStorage.getItem('token');
    // console.log(to.path)
    //如果未登录就访问后台页面
    if ((to.path === '/admin/index/total' || to.path === '/admin/index/write' || to.path === '/admin/index/modify' || to.path === '/admin/index/category' || to.path === '/admin/index/mywords' || to.path === '/admin/index/liuyan' || to.path === '/admin/index/timeline') && token === null) {
        next('/admin/login');
    }
   else {
        next();
    }

})


export default router
