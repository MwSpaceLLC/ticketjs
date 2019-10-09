/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import Axios from 'axios'
import config from "./config";
import Notifications from 'vue-notification'

Vue.use(Notifications);

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;

var domain = config.SSL === 'true' ? 'https' : 'http';
domain += `://${window.location.hostname}:${config.SRV_PORT}`;
Vue.prototype.$api = domain;

Vue.prototype.$InLoading = false;

Vue.use(ArgonDashboard);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
