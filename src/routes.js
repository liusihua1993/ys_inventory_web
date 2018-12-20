import Home from './views/Home.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: resolve => require(['./views/Login.vue'], resolve), 
            name: '登录',
            hidden: true
        },
        {
            path: '/404',
            component: resolve => require(['./views/404.vue'], resolve),
            name: '404',
            hidden: true
        },
        //产品
        {
            path: '/',
            component: Home,
            name: '产品',
            hidden: true,
            leaf: true, // 没有子级为true，相反为false
            iconCls: require('./assets/images/nav/ic_pc_shouye.png'),
            children: [
                { 
                    path: '/', 
                    component: resolve => require(['./views/nav1/parduct.vue'], resolve),  
                    name: '产品',
                    redirect: '/product'
                },
            ]
        },
        //产品
        {
            path: '/',
            component: Home,
            name: '产品',
            leaf: true, // 没有子级为true，相反为false
            iconCls: require('./assets/images/nav/ic_pc_shouye.png'),
            children: [
                { path: '/product', component: resolve => require(['./views/nav1/parduct.vue'], resolve),  name: '产品' },
            ]
        },
        // 产品详情
        {
            path: '/',
            component: Home,
            name: '产品详情',
            hidden: true,
            children: [
                { path: '/productDetails', component: resolve => require(['./views/nav1/parductDetails.vue'], resolve),  name: '产品详情' },
            ]
        },
        //产品模板
        {
            path: '/',
            component: Home,
            name: '产品模板',
            leaf: true, // 没有子级为true，相反为false
            iconCls: require('./assets/images/nav/ic_pc_shouye.png'),
            children: [
                { path: '/parductTemplate', component: resolve => require(['./views/parductTemplate/parductTemplate.vue'], resolve),  name: '产品模板' },
            ]
        },
         // 产品模板详情
        {
            path: '/',
            component: Home,
            name: '产品模板详情',
            hidden: true,
            children: [
                { path: '/parductTemplate/TemplateDetails', component: resolve => require(['./views/parductTemplate/TemplateDetails.vue'], resolve),  name: '产品模板详情' },
            ]
        },
        // // 产品详情
        // {
        //     path: '/',
        //     component: Home,
        //     name: '产品模板',
        //     hidden: true,
        //     children: [
        //         { path: '/productDetails', component: resolve => require(['./views/parductTemplate/parductDetails.vue'], resolve),  name: '产品模板' },
        //     ]
        // },
        // 原料
        {
            path: '/',
            component: Home,
            name: '原料',
            leaf: true,
            iconCls: require('./assets/images/nav/ic_pc_shouye.png'),
            children: [
                { path: '/meterial', component: resolve => require(['./views/meterial/Meterial.vue'], resolve),  name: '原料' },
            ]
        },
        // 原料详情
        {
            path: '/',
            component: Home,
            name: '原料详情',
            hidden: true,
            children: [
                { path: '/meterialDetails', component: resolve => require(['./views/meterial/meterialDetails.vue'], resolve),  name: '原料详情' },
            ]
        },
        // 日志
        {
            path: '/',
            component: Home,
            name: '日志',
            leaf: true, // 没有子级为true，相反为false
            iconCls: require('./assets/images/nav/ic_pc_shouye.png'),
            children: [
                { path: '/logs', component: resolve => require(['./views/logs/Log.vue'], resolve),  name: '日志' },
            ]
        },
        {
            path: '*',
            hidden: true,
            redirect: { path: '/404' }
        }
    ]
})


