import { Toast } from "vant";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: () => import('../pages/myHome/MyHome'),
        },
        {
            path: '/cart',
            component: () => import('../pages/myCart/MyCart'),
            meta:{
                isAuth:true
            }
        },
        {
            path: '/order',
            component: () => import('../pages/myOrder/MyOrder'),
            meta:{
                isAuth:true
            }
        },
        {
            path: '/mine',
            component: () => import('../pages/mine/Mine'),
            meta:{
                isAuth:true
            }
        },
        {
            path: '/store',
            component: () => import('../pages/myStore/MyStore'),
        },
        {
            path: '/createorder',
            component: () => import('../pages/createOrder/CreateOrder'),
            meta:{
                isAuth:true
            }
        },
        {
            path: '/address',
            component: () => import('../pages/address/Address'),
            meta:{
                isAuth:true
            }
        },
        {
            path: '/addressedit',
            component: () => import('../pages/addressEdit/AddressEdit'),
            meta:{
                isAuth:true
            }
        },
        {
            path: '/login',
            component: () => import('../pages/login/Login'),
        },
        {
            path: '/register',
            component: () => import('../pages/register/Register'),
        },
        {
            path: '/userinfoedit',
            component: () => import('../pages/userinfoedit/UserInfoEdit'),
        },
    ]
})

router.beforeEach((to,from,next)=>{
    if(to.meta.isAuth){
        if(localStorage.isLogin==="1"){
            next()
        }else{
            Toast("请先登录")
            router.push("./login")
        }
    }else{
        next()
    }
})

export default router;