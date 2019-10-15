/** @css */
import 'sweetalert2/dist/sweetalert2.min.css';

/** @Vue plugins */
import Vue from 'vue'

/** @import plugins */
import Notifications from 'vue-notification'
import ArgonDashboard from '../plugins/argon-dashboard'
import VueSweetalert2 from 'vue-sweetalert2';

/** @use plugins */
Vue.use(Notifications);
Vue.use(ArgonDashboard);
Vue.use(VueSweetalert2);