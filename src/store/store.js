import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user'),
        role: localStorage.getItem('role'),
        isLoggedIn: localStorage.getItem('isLoggedIn') || false
    },
    mutations: {
        setStorage(state, payload) {
            axios.defaults.headers.common['Authorization']= 'Bearer '+payload.access_token;
            localStorage.setItem("token", 'Bearer ' +payload.access_token);
            localStorage.setItem("isLoggedIn", true);
            state.token = payload.access_token;
            state.isLoggedIn = true;
        },
        setIsloggedIn(state, payload){
            state.isLoggedIn = payload;
        },
        setUser(state, payload){
            state.user = payload.name;
            localStorage.setItem("user", payload.name);
        },
        setRole(state, payload){
            state.role = payload.role_id;
            localStorage.setItem("role", payload.role_id);
        },
        setToken(state, payload){
            state.token = payload;
        },
        destroyStorage(state){
            state.token = null;
            state.user = null;
            state.role = null;
            state.isLoggedIn = false;
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
        }
    },
    getters: {
        isLoggedInStatus(state) {
            return  JSON.parse(state.isLoggedIn);
        },
        getToken(state){
            return state.token;
        },
        getRole(state){
            return state.role;
        },
        getUser(state){
            return state.user;
        }
    },
    actions: {
        setUserAction(context, payload){
            context.commit('setUser', payload);
            context.commit('setRole', payload);
        },
        setIsloggedInAction(context, payload){
            context.commit('setIsloggedIn', payload);
        },
        setTokenAction(context, payload){
            context.commit('setToken', payload);
        },
        loginAction(context, payload){
            context.commit('setStorage', payload);
        },
        destroyStorageAction(context, payload){
            context.commit('destroyStorage');
        }
    }
});
