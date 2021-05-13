<template>
    <div class="favourites-container">
        <GifyList
            v-if="gifyList.length > 0"
            :gifies="gifyList"
            :ui-state="UI_STATE_ENUM.FAVOURITES"
            @removeFromFavourites="removeFromFavourites"
        />
        <div
            v-if="gifyList.length === 0"
            class="page-element"
        >
            No Faves yet :(
        </div>
    </div>
</template>

<script>
import { UI_STATE } from "../scripts/ui-state.js";
import GifyList from "./GifyList.vue";


export default {
    name: "SearchContainer",

    components: {
        GifyList,
    },

    data() {
        return {
            UI_STATE_ENUM: UI_STATE,
        }
    },

    computed: {
        gifyList() {
            return this.$store.getters.getFavourites
        },
    },

    methods: {
        removeFromFavourites(gify) {
            this.$store.commit('removeFromFavourites', gify);
        }
    }
}
</script>

<style scoped>
.favourites-container {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    overflow: auto;
}
</style>