import Vue from 'vue';
import Fragment from 'vue-fragment';
import Notifications from "vue-notification";
import VueClipboard from 'vue-clipboard2';
import WhatInput from 'what-input';

import App from './App.vue';
import { router } from "./scripts/router.js";
import { store } from "./scripts/store.js";

import './styles/colors.css';
import './styles/common.css';


Vue.config.productionTip = false;

Vue.use(Fragment.Plugin);
Vue.use(Notifications);
Vue.use(VueClipboard)

WhatInput.specificKeys([9]);

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
