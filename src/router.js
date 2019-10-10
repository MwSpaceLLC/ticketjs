import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: 'dashboard',
            component: DashboardLayout,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
                },

                {
                    path: '/ticket/:id',
                    name: 'aperti',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Ticket.vue')
                },

                {
                    path: '/aperti',
                    name: 'aperti',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Aperti.vue')
                },
                {
                    path: '/ricevuti',
                    name: 'ricevuti',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Ricevuti.vue')
                },
                {
                    path: '/scaduti',
                    name: 'scaduti',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Scaduti.vue')
                },
                {
                    path: '/chiusi',
                    name: 'chiusi',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Chiusi.vue')
                },
                {
                    path: '/collezione',
                    name: 'collezione',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Collezione.vue')
                },
            ]
        },
        {
            path: '/',
            redirect: 'login',
            component: AuthLayout,
            meta: {
                guest: true
            },
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
                }
            ]
        },

        {
            path: '*',
            name: 'notfound',
            component: () => import(/* webpackChunkName: "demo" */ './views/Notfound.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.is_admin == 1) {
                    next()
                } else {
                    next({name: 'userboard'})
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({name: 'userboard'})
        }
    } else {
        next()
    }
})

export default router;

