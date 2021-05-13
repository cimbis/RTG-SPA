import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

import App from "../App.vue";
import { UI_STATE } from "./ui-state.js";
import SearchContainer from "../components/SearchContainer.vue";
import FavouritesContainer from "../components/FavouritesContainer.vue";


export const ROUTES = Object.freeze({
    SEARCH: `/${ UI_STATE.SEARCH }`,
    FAVOURITES: `/${ UI_STATE.FAVOURITES }`,
})

const routes = [
    {
        path: "*",
        component: App,
        redirect: ROUTES.SEARCH,
    },
    {
        path: ROUTES.SEARCH,
        component: SearchContainer
    },
    {
        path: ROUTES.FAVOURITES,
        component: FavouritesContainer
    }

]

export const router = new VueRouter({
    routes,
    mode: 'history'
});