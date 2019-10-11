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
import Axios from 'axios'
import App from './App.vue'
import router from './router'
import config from "./config";
import './registerServiceWorker'
import * as firebase from "firebase";
import Notifications from 'vue-notification'
import ArgonDashboard from './plugins/argon-dashboard'

Vue.use(Notifications);

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;

var domain = config.SSL === 'true' ? 'https' : 'http';
domain += `://${window.location.hostname}:${config.SRV_PORT}`;
Vue.prototype.$api = domain;

Vue.prototype.$InLoading = false;

Vue.use(ArgonDashboard);

/**
 * Init Firebase
 * @type {{storageBucket: string, apiKey: string, messagingSenderId: string, appId: string, projectId: string, measurementId: string, databaseURL: string, authDomain: string}}
 */

var firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASEKEY,
    authDomain: process.env.VUE_APP_FIREBASEDOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASEDATABASE,
    projectId: process.env.VUE_APP_FIREBASEPROJECT,
    storageBucket: process.env.VUE_APP_FIREBASESTORAGE,
    messagingSenderId: process.env.VUE_APP_FIREBASESENDER,
    appId: process.env.VUE_APP_FIREBASEAPP,
    measurementId: process.env.VUE_APP_FIREBASEMEASUREMENT
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/**
 * Init Mine Application
 */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');