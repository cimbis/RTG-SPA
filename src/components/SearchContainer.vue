<template>
    <div class="search-container">
        <Search
            :search-param="searchParam"
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
            return this.$store.getters.getSearchResults;
        },
        giffiesLoading() {
            return this.$store.getters.getGiffiesLoadingBoolean;
        },
        searchParam() {
            return this.$store.getters.getSearchParam;
        }
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!to.query['searchTerm'] && vm.searchParam.length > 0) {
                vm.$router.push({ query: { searchTerm: vm.searchParam } })
            }

            else if (!to.query['searchTerm'] || to.query['searchTerm'] === vm.searchParam) {
                next()
            }

            else if (to.query['searchTerm'] !== vm.searchParam) {
                vm.searchTermApplied(to.query['searchTerm']);
                next();
            }
        })


    },

    methods: {
        searchTermApplied(searchParam) {
            this.$store.commit('setGiffiesLoading', true);
            const randomTimeout = Math.random() * (3000 - 500) + 500;

            setTimeout(() => {
                this.getGiffies(searchParam)
                    .then(gifies => {
                        this.$store.commit('setSearchResults', gifies);
                        this.$store.commit('setGiffiesLoading', false);
                        this.$store.commit('setSearchParam', searchParam);
                    })
                    .catch(e => console.error(e));
            }, randomTimeout)

            if (this.$router.currentRoute.query['searchTerm'] !== searchParam) {
                this.$router.push({ query: { searchTerm: searchParam } })
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