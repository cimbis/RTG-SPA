import Vue from 'vue';
import Notifications from "vue-notification";
import VueClipboard from 'vue-clipboard2';

import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
import { configure } from '@storybook/vue';

import GifyList from '../src/components/GifyList.vue';


export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    viewports: INITIAL_VIEWPORTS
}

// must set up notifications from scratch to have the same look as in app
// bet let's not do it now - we just need storybook not to give up on us.
Vue.use(Notifications);
Vue.use(VueClipboard);

// Register global components.
Vue.component('GifyList', GifyList);

configure(require.context('../src/stories', true, /\.stories\.js$/), module);