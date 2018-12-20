import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/store'
import Vuex from 'vuex'
import axios from 'axios'
//import NProgress from 'nprogress' // 进度条
//import 'nprogress/nprogress.css'
import router from './routes'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI)
Vue.use(Vuex)
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (!token && to.path != '/login' && token != '') {
    next({ path: '/login' })
  } else {
    console.log(token)
    axios.defaults.headers.Authorization = 'bearer ' + token;
    next()
  }
//   if (to.path == '/login') {
//     if (sessionStorage.getItem('user') != null) {
//       window.location.reload();
//       sessionStorage.removeItem('user');
//     }
//   }
//   if (to.path != '/TemplateMan' && to.path != '/TemplateEditing') {
//     sessionStorage.removeItem('data');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })
// router.afterEach(transition => {
//   NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');