import Vue from 'vue'
import VueRouter from 'vue-router'

//导出admin根组件
const Admin = () => import('../components/admin')
const Login = () => import('../components/admin/login')
const Index = () => import('../components/admin/index')
const Total = () => import( '../components/admin/total')
const Write = () => import( '../components/admin/write')
const Modify = () => import( '../components/admin/modify')
const Category = () => import( '../components/admin/cotagory')
const Mywords = () => import( '../components/admin/mywords')
const AdminLiuyan = () => import( '../components/admin/liuyan')
const ATimeline = () => import( '../components/admin/timeline')

Vue.use(VueRouter)

//---------------------------------------------------
import Markdown from '../components/markdown'
//---------------------------------------------------
//导出home的根组件
const Home = () => import( '../components/home')
const Post = () => import( '../components/home/posts')
const Timeline = () => import( '../components/home/timeline')
const Detail = () => import('../components/home/detail')
const Liuyan = () => import('../components/home/liuyan')
const PL = () => import( '../components/pl')

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
            path: '/home/index',
            component: Post,
            meta:{
                title:'我的学习分享',
                keywords:'coderlyz',
                description:'coderlyz的个人网站，个人的学习记录和学习问题以及解决方式的记录与分享'
            }


        }, {
            path: '/home/index/:categoryId',
            component: Post
        }, {
            path: '/home/timeline',
            component: Timeline
        }, {
            path: '/home/detail/:index',
            name: 'detail',
            component: Detail
        },
            {
                path: '/home/liuyan',
                name: 'liuyan',
                component: Liuyan
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
                name: 'login',
                path: '/admin/login',
                component: Login
            },
            {
                name: 'index',
                path: '/admin/index',
                component: Index,
                redirect: '/admin/index/total',
                children: [{
                    name: 'total',
                    path: '/admin/index/total',
                    component: Total
                }, {
                    name: 'write',
                    path: '/admin/index/write',
                    component: Write
                }, {
                    name: 'modify',
                    path: '/admin/index/modify',
                    component: Modify
                }, {
                    name: 'category',
                    path: '/admin/index/category',
                    component: Category
                }, {
                    name: 'mywords',
                    path: '/admin/index/mywords',
                    component: Mywords
                }, {
                    name: 'liuyan',
                    path: '/admin/index/liuyan',
                    component: AdminLiuyan
                },
                    {
                        name: 'timeline',
                        path: '/admin/index/timeline',
                        component: ATimeline
                    }
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
    const token = window.sessionStorage.getItem('token')
    // console.log(to.path)
    //如果未登录就访问后台页面
    if ((to.path === '/admin/index/total' || to.path === '/admin/index/write' || to.path === '/admin/index/modify' || to.path === '/admin/index/category' || to.path === '/admin/index/mywords' || to.path === '/admin/index/liuyan' || to.path === '/admin/index/timeline') && token === null) {
        next('/admin/login')
    } else {
        /* 路由发生变化修改页面title */
        if (to.meta.title) {
            document.title = to.meta.title
        }
        /* 路由发生变化修改页面的description */
        if(to.meta.description){
            // document.querySelector('meta[name="Keywords"]').setAttribute('content', to.meta.keywords)
            // document.querySelector('meta[name="Description"]').setAttribute('content', to.meta.description)
            // document.description = to.meta.description
            console.log('路由发生变化修改页面的description')
        }
        next()
    }

})

export default router
