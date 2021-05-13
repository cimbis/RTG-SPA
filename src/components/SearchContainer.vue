<template>
    <div class="search-container">
        <Search
            @searchGifies="searchTermApplied"
        />
        <div
            v-if="giffiesLoading === false && gifyList.length > 0"
            class="gify-list-container"
        >
            <GifyList

                :gifies="gifyList"
                :ui-state="UI_STATE_ENUM.SEARCH"
                @addToFavourites="addToFavourites"
            />
        </div>
        <div v-if="giffiesLoading === true">
            <Loader/>
        </div>
    </div>
</template>

<script>
import Search from "./Search.vue";
import GifyList from "./GifyList.vue";
import Loader from "./Loader.vue";
import { UI_STATE } from "../scripts/ui-state.js";
import { GifyService } from "../scripts/gify-service.js";


export default {
    name: "SearchContainer",

    components: {
        Search,
        GifyList,
        Loader,
    },

    mixins: [GifyService],

    data() {
        return {
            UI_STATE_ENUM: UI_STATE,
        }
    },

    computed: {
        gifyList() {
            const results = this.$store.getters.getSearchResults;
            console.log(results);
            return results;
        },
        giffiesLoading() {
            const loading = this.$store.getters.getGiffiesLoadingBoolean;
            console.log(loading);
            return loading;
        }
    },

    methods: {
        searchTermApplied(searchTerm) {
            this.$store.commit('setGiffiesLoading', true);
            const randomTimeout = Math.random() * (3000 - 500) + 500;

            setTimeout(() => {
                this.getGiffies(searchTerm)
                    .then(gifies => {
                        this.$store.commit('setSearchResults', gifies);
                        this.$store.commit('setGiffiesLoading', false);
                        this.$store.commit('setSearchParam', searchTerm);
                    })
                    .catch(e => console.error(e));
            }, randomTimeout)

            if (this.$router.currentRoute.query['searchTerm'] !== searchTerm) {
                this.$router.push({ query: { searchTerm: searchTerm } })
            }
        },

        addToFavourites(gify) {
            this.$store.commit('addToFavourites', gify)
        }
    }
}
</script>

<style scoped>
.search-container {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    overflow: auto;
}

.gify-list-container {
    height: 100%;
    overflow: auto;
}
</style>