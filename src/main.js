/**
 =========================================================
 * Ticketjs system - v1.0.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/argon-dashboard
 * Copyright 2019 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

 * Design by Creative Tim
 =========================================================
 * Vue Argon Dashboard - v1.0.0
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import store from './helpers/store'
import axios from "axios";
import config from "./config";

Vue.config.productionTip = false;

require('./helpers/imports');
require('./helpers/prototype');
require('./helpers/fbase');
require('./helpers/beforeEach');

const token = localStorage.getItem('token'),
    session = localStorage.getItem('session');

if (token)
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;

if (session)
    Vue.prototype.$http.defaults.headers.common['Session'] = session;

/**
 * Init Mine Application
 * @vue Application
 */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');