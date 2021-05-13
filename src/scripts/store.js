import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        gifySearchResults: [],
        gifyFavourites: [],
        searchParam: '',
        giffiesLoading: false,
    },
    getters: {
        getSearchResults: state => state.gifySearchResults,
        getFavourites: state => state.gifyFavourites,
        getSearchParam: state => state.searchParam,
        getGiffiesLoadingBoolean: state => state.giffiesLoading,
    },
    mutations: {
        setSearchResults(state, results) {
            state.gifySearchResults = results;
        },
        addToFavourites(state, gify) {
            state.gifyFavourites.push(gify);
            if (state.gifyFavourites.length > 10) {
                state.gifyFavourites.shift();
            }
            Vue.notify({
                group: 'notifications',
                title: 'Added to Favourites',
                text: gify.title,
                duration: 2000
            });
        },
        removeFromFavourites(state, gify){
            state.gifyFavourites =
                state
                    .gifyFavourites
                    .filter(favourite => favourite.gif_url !== gify.gif_url);

            Vue.notify({
                group: 'notifications',
                title: 'Removed from Favourites',
                text: gify.title,
                duration: 2000
            });
        },
        setSearchParam(state, searchParam) {
            state.searchParam = searchParam;
        },
        setGiffiesLoading(state, areGiffiesLoading) {
            state.giffiesLoading = areGiffiesLoading;
        }
    }
})