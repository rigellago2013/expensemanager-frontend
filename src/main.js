import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import router from './routes.js';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import { ValidationObserver } from 'vee-validate';
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import {server_details} from "./config";
import axios from 'axios';
import VueAxios from 'vue-axios';
import {store} from './store/store';
import VueSweetalert2 from 'vue-sweetalert2';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@sweetalert2/themes/wordpress-admin/wordpress-admin.scss';
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.use(PerfectScrollbar)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)

axios.defaults.headers.common['Authorization'] = store.getters.getToken;
axios.defaults.baseURL = server_details.SERVER_URL;


Vue.config.productionTip = false;

export const bus=new Vue();

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedInStatus) {
            next({ name: 'Login' })
        } 
    } else {
        next() 
    }
})

new Vue({
  router,
  store:store,
  render: a => a(App),
  created(){
      window.addEventListener('beforeunload', (event) => {
          if(store.getters.isLoggedInStatus != localStorage.getItem('isLoggedIn')){
              store.dispatch('setIsloggedInAction', store.getters.isLoggedInStatus);
          }
          if(store.getters.getToken != localStorage.getItem('token')){
              store.dispatch('setTokenAction', store.getters.getToken);
          }
      });
  }
}).$mount('#app')
