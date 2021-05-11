<template>
    <div id="app">
        <Title
            :desc="titleDescription"
            :msg="titleMessage"
        />
        <Nav
            :uiState="uiState"
            @selectedUiState="uiStateChanged"
        />
        <Search
            v-if="uiState === UI_STATE_ENUM.SEARCH"
            @searchGifies="searchTermApplied"
        />
        <GifyList
            v-if="!giffiesLoading && gifyList.length > 0"
            :gifies="gifyList"
            :ui-state="uiState"
            @addToFavourites="addToFavourites"
            @removeFromFavourites="removeFromFavourites"
        />
        <Loader v-if="giffiesLoading"/>
    </div>
</template>

<script>
import { UI_STATE } from "./scripts/ui-state.js";
import { GifyService } from "./scripts/gify-service.js";

import Title from "./components/Title.vue";
import Nav from "./components/Nav.vue";
import Search from "./components/Search.vue";
import GifyList from "./components/GifyList.vue";
import Loader from "./components/Loader.vue";


export default {
    name: "App",

    mixins: [GifyService],

    components: {
        Title,
        Nav,
        Search,
        GifyList,
        Loader,
    },

    data() {
        return {
            titleMessage: "Gify App",
            titleDescription: "The only one you'll ever need",

            gifySearchResults: [],
            gifyFavourites: [],

            UI_STATE_ENUM: UI_STATE,
            uiState: UI_STATE.SEARCH,

            giffiesLoading: false,
        };
    },

    computed: {
        gifyList() {
            return this.uiState === this.UI_STATE_ENUM.SEARCH
                ? this.gifySearchResults
                : this.gifyFavourites;
        },
    },

    methods: {
        uiStateChanged(state) {
            this.uiState = state;
        },

        searchTermApplied(searchTerm) {
            this.giffiesLoading = true;
            const randomTimeout = Math.random() * (3000 - 500) + 500;

            setTimeout(() => {
                this.getGiffies(searchTerm)
                    .then(gifies => {
                        this.gifySearchResults = gifies;
                        this.giffiesLoading = false;
                    })
                    .catch(e => console.error(e));
            }, randomTimeout)
        },

        addToFavourites(gify) {
            this.gifyFavourites.push(gify);
            if (this.gifyFavourites.length > 10) {
                this.gifyFavourites.shift();
            }
        },

        removeFromFavourites(gify) {
            this.gifyFavourites = this.gifyFavourites.filter(favourite => favourite.gif_url !== gify.gif_url);
        }
    },
};
</script>

<style lang="scss">
@import "styles/colors.css";
@import "styles/common.css";
</style>