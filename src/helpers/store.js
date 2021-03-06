import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from "../config";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        session: localStorage.getItem('session') || '',
        user: JSON.parse(localStorage.getItem('user')) || {}
    },
    mutations: {
        fresh_user(state, user) {
            state.user = user;
        },
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success';
            state.token = token;
            state.user = user;
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = '';
            state.token = ''
        },
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios.post(`${config.API}/login`, user)
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        const session = resp.data.session;

                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));

                        axios.defaults.headers.common['Authorization'] = token;

                        localStorage.setItem('session', session);
                        axios.defaults.headers.common['Session'] = session;

                        commit('auth_success', token, user);
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        reject(err)
                    })
            })
        },

        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios.post(`${config.API}/register`, user)
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        const session = resp.data.session;

                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));

                        axios.defaults.headers.common['Authorization'] = token;

                        localStorage.setItem('session', session);
                        axios.defaults.headers.common['Session'] = session;

                        commit('auth_success', token, user);
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err);
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        reject(err)
                    })
            })
        },

        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                delete axios.defaults.headers.common['Authorization'];
                resolve()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    }
})