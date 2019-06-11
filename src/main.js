import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import echarts from "echarts"
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import store from './store';
//import "./assets/css/SearchInfoWindow_min.css";
import './components/common/directives';
import "babel-polyfill";
import vuecroll from "vuescroll";
import VueCookies from 'vue-cookies'
import * as utils from './utils/utils'
import XLSX from 'xlsx'; 

// import gallery from 'img-vuer'
// Vue.use(gallery, {
//   swipeThreshold: 150, // 滑动阈值，默认值 100
// })


Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(vuecroll)
Vue.prototype.$xlsx = XLSX;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$cookie = VueCookies;
Vue.prototype.$utils=utils;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if (sessionStorage.getItem("enumerationData")) { //判断session中是否有枚举值存在
        store.commit('enumerationData', JSON.parse(sessionStorage.getItem("enumerationData")));
        store.commit('enumSelectionChange', JSON.parse(sessionStorage.getItem("enumSelectionChange")));
        // if (to.path == "/SystemOperationMonitoring") {

        //     window.location.href = "/serveApi/hbj/druid/index.html"
        // }
        if (!role && to.path !== '/login') {
            next('/login');
        } else if (to.meta.permission) {
            // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
            role === 'admin' ? next() : next('/403');
        } else {
            // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
            if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
                Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                    confirmButtonText: '确定'
                });
            } else {
                next();
            }
        }
    } else {
        //处理枚举值类型
        let obj = {};
        let obj2 = {};
        axios({
            method: "post",
            url: "/serveApi/hbj/enum/select",
            params: { sidebar: "" },
            headers: {
                "Content-Type": "application/json"
            },
            data: {}
        }).then(function (res) {
            if (res.data.code == -1) {//预防枚举值报错
                // if (to.path == "/SystemOperationMonitoring") {

                //     window.location.href = "/serveApi/hbj/druid/index.html"
                // }
                if (!role && to.path !== '/login') {
                    next('/login');
                } else if (to.meta.permission) {
                    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
                    role === 'admin' ? next() : next('/403');
                } else {
                    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
                    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
                        Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                            confirmButtonText: '确定'
                        });
                    } else {
                        next();
                    }
                }
            } else {
                res.data.data.forEach(element => {  //处理枚举值
                   element.sz=element.sz.toString();//数值转字符串 确保下拉框取值正常 
                    if (obj[element.lx.toLowerCase()]) {
                        obj[element.lx.toLowerCase()][element.sz] = element.xmnr;
                        obj2[element.lx.toLowerCase()].push(element)
                    } else {
                        obj[element.lx.toLowerCase()] = {};
                        obj[element.lx.toLowerCase()][element.sz] = element.xmnr;
                        obj2[element.lx.toLowerCase()] = [];
                        obj2[element.lx.toLowerCase()].push(element)
                    }
                });
                sessionStorage.setItem('enumerationData', JSON.stringify(obj))
                sessionStorage.setItem('enumSelectionChange', JSON.stringify(obj2))
                store.commit('enumerationData', obj);
                store.commit('enumSelectionChange', obj2);
              
                if (!role && to.path !== '/login') {
                    next('/login');
                } else if (to.meta.permission) {
                    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
                    role === 'admin' ? next() : next('/403');
                } else {
                    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
                    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
                        Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                            confirmButtonText: '确定'
                        });
                    } else {
                        next();
                    }
                }
            }

        });
    }
})



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')