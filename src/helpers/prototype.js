import Vue from 'vue'
import Axios from "axios";
import config from "../config";
import store from './store'

/** @extend with prototype */
Vue.prototype.$http = Axios;
Vue.prototype.$storage = localStorage;

var domain = config.SSL === 'true' ? 'https' : 'http';
domain += `://${window.location.hostname}:${config.SRV_PORT}`;
Vue.prototype.$api = domain;

Vue.prototype.$InLoading = false;