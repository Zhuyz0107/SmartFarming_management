/*
 * @Description: 主路由
 * @Author: Ronda
 * @Date: 2021-07-23 17:32:04
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-15 19:23:21
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/pages/base/redirect/index')
            }
        ]
    },
    {
        path: '/qr',
        component: () => import('@/pages/qr.vue'),
        hidden: true
    },
    {
        path: '/login',
        component: () => import('@/pages/base/login/index'),
        hidden: true
    },
    {
        path: '/register',
        component: () => import('@/pages/base/register/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/pages/base/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/pages/base/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/pages/base/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                hidden: false,
                component: () => import('@/pages/base/dashboard/Index'),
                name: 'dashboard',
                meta: { title: '数据大屏', icon: 'icon_20', affix: true }
            }
            /* {
              path: '/base/logs/Index',
              hidden: false,
              component: () => import('@/pages/base/logs/Index'),
              name: 'logs',
              meta: { title: '日志管理', icon: 'icon_14', affix: true }
            },
            {
              path: '/base/auth/Index',
              hidden: false,
              component: () => import('@/pages/base/auth/Index'),
              name: 'role',
              meta: { title: '权限管理', icon: 'icon_16', affix: true }
            },
            {
              path: '/base/role/Index',
              hidden: false,
              component: () => import('@/pages/base/role/Index'),
              name: 'role',
              meta: { title: '角色管理', icon: 'icon_16', affix: true }
            } */

        ]
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
