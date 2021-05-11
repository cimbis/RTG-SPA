<template>
    <div class="page-element">
        <div v-for="(gify, index) in gifies"
             :key="index"
             class="gify-container">

            <div class="gif-img">
                <figure>
                    <img :alt="gify.title" :src="gify.gif_url">
                </figure>
            </div>

            <div class="gif-description">
                <a :href="gify.bitly_url" class="title" target="_blank">
                    {{ gify.title }}
                </a>
                <div class="username">
                    {{ gify.username }}
                </div>
            </div>

            <div v-if="uiState === uiStateEnum.SEARCH" class="gif-action">
                <button
                    aria-label="add to favourites"
                    class="action-btn"
                    @click="addToFavourites(gify)"
                >
                    {{ themeBasedHeart }}
                </button>
            </div>

            <div v-else class="gif-action">
                <button
                    class="action-btn"
                    @click="removeFromFavourites(gify)"
                >
                    💔
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import { UI_STATE } from '../scripts/ui-state.js';


export default {
    name: 'GiffyList',

    props: {
        gifies: Array,
        uiState: String,
    },

    data() {
        return {
            uiStateEnum: UI_STATE,
            themeBasedHeart: '',
        }
    },

    created() {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        mq.addEventListener('change', e => this.updateTheme(e));
        this.updateTheme(mq)
    },

    methods: {
        addToFavourites(gify) {
            this.$emit("addToFavourites", gify);
        },

        removeFromFavourites(gify) {
            this.$emit("removeFromFavourites", gify);
        },

        updateTheme(mq) {
            mq.matches
                ? this.themeBasedHeart = '🤍'
                : this.themeBasedHeart = '🖤';
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/colors.css";
@import "../styles/common.css";

.page-element {
    overflow: scroll;
}

.gify-container {
    display: flex;

    &:not(:last-child) {
        margin-bottom: 1rem;
    }
}

.gif-img {
    display: flex;
    background: linear-gradient(223deg, #383737 0.42%, #393838);
    box-shadow: var(--gif-shadow) 0 5px 25px;
    height: 6.25rem;
    width: 6.25rem;
    justify-content: center;
    align-items: center;
    border-radius: 1.25rem;
    transition: box-shadow 0.1s ease-in-out, scale 0.3s ease-in-out;
    --deprecated: "do not use figure";
}

figure {
    overflow: hidden;
    margin: 0;
    border-radius: 1.25rem;
    border: 1px solid #656363;
    height: 100%;
}

figure img {
    height: 100%;
}

.gif-description {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.username {
    font-style: italic;
    color: var(--username-color);
}

.gif-action {
    margin-left: auto;
    align-self: center;

    button {
        border: none;
        background-color: transparent;
        font-size: 2rem;
        width: 3rem;
        height: 3rem;
        box-sizing: border-box;

        &:hover {
            cursor: pointer;
        }

        &:active {
            cursor: pointer;
            background-color: var(--button-color-hover);

            border-radius: 50%;
            padding: 0.6rem;
            font-size: 1.5rem;
        }
    }
}


</style>
