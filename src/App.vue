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

            <router-view/>
        </div>

        <notifications
            classes="notification"
            group="notifications"
            position="top center"
        />
    </fragment>
</template>

<script>
import { GifyService } from "./scripts/gify-service.js";
import { ROUTES } from "./scripts/router.js";
import { UI_STATE } from "./scripts/ui-state.js";

import Title from "./components/Title.vue";
import Nav from "./components/Nav.vue";


export default {
    name: "App",

    components: {
        Title,
        Nav,
    },

    mixins: [GifyService],

    data() {
        return {
            titleMessage: "Gify App",
            titleDescription: "The only one you'll ever need",
            UI_STATE_ENUM: UI_STATE,
        };
    },

    computed: {
        uiState() {
            const currentPath = this.$router.currentRoute.path;
            return currentPath.slice(1, currentPath.length);
        },
        searchTerm() {
            return this.$store.getters.getSearchParam;
        }
    },

    methods: {
        uiStateChanged(state) {
            const path = state === this.UI_STATE_ENUM.SEARCH
                ? ROUTES.SEARCH
                : ROUTES.FAVOURITES;

            this.$router.push(path);
        },
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