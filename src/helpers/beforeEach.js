import router from "../router";
import store from './store'
import Vue from "vue";

router.beforeEach((to, from, next) => {

    /**
     * @fetch User
     * Prevent refresh wrong data*/
    const user = localStorage.getItem('user');
    if (user) {
        if (!Vue.prototype.$user)
            Vue.prototype.$user = JSON.parse(user);
    }

    /**
     * @close ticket editor
     * prevent opened editor*/
    var teditor = document.getElementById('reply-editor');
    if (teditor) {
        if (user) {
            if (teditor.classList.contains('active')) {
                teditor.classList.remove('active');
                teditor.classList.add('mni-active')
            }
        } else {
            teditor.classList.remove('active');
            teditor.classList.remove('mni-active');
        }
    }
    // if (!user) teditor.classList.remove('mni-active');

    /**
     * @Unauthorized
     * Handling Unauthorized Access Cases */
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) return next();
        return next('/login');
    }
    return next();
});