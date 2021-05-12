import Vue from 'vue';
import App from './App.vue';

import './styles/colors.css';
import './styles/common.css';


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app');
