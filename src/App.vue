<template>
    <fragment>
        <div id="app">
            <Title
                :desc="titleDescription"
                :msg="titleMessage"
            />
            <Nav
                :ui-state="uiState"
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

        <notifications
            classes="notification"
            group="notifications"
            position="top center"
        />
    </fragment>
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

    components: {
        Title,
        Nav,
        Search,
        GifyList,
        Loader,
    },

    mixins: [GifyService],

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
            this.$notify({
                group: 'notifications',
                title: 'Added to Favourites',
                text: gify.title,
                duration: 2000
            });
        },

        removeFromFavourites(gify) {
            this.gifyFavourites =
                this
                    .gifyFavourites
                    .filter(favourite => favourite.gif_url !== gify.gif_url);

            this.$notify({
                group: 'notifications',
                title: 'Removed from Favourites',
                text: gify.title,
                duration: 2000
            });
        }
    },
};
</script>

<style lang="scss">
.notification {
    display: flex;
    flex-direction: column;
    max-width: 320px;
    max-height: 12rem;
    min-height: 7rem;
    margin: 2rem;
    padding: 1rem;
    box-shadow: var(--background) 0 1rem 1rem;
    background-color: var(--page-element-background);
    border-radius: 1.25rem;
    border: 1px solid var(--a);

    .notification-title {
        padding: 1rem 1rem 0;
        font-size: 1.25rem;
    }

    .notification-content {
        padding: 1rem;
    }
}
</style>