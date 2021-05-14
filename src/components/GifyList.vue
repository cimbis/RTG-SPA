<template>
    <div
        ref="gifyListContainer"
        aria-label="Gify List"
        class="gify-list page-element"
        role="list"
    >
        <div
            v-for="(gify, index) in gifies"
            :key="index"
            class="gify-container"
            role="listitem"
        >
            <div class="gif-img">
                <figure>
                    <img
                        :alt="gify.title"
                        :src="gify.gif_url"
                    >
                </figure>
            </div>

            <div class="gif-description">
                <span
                    class="title"
                    tabindex="0"
                    @click="(e) => copyGifyLink(e, gify)"
                    @keydown.enter.space.prevent="(e) => copyGifyLink(e, gify)"
                >
                    <div class="sr-only">
                        Click to copy gify link to clipboard
                    </div>
                    {{ gify.title }}
                </span>
                <div class="username">
                    {{ gify.username }}
                </div>
            </div>

            <div
                v-if="uiState === UI_STATE_ENUM.SEARCH"
                class="gif-action"
            >
                <button
                    aria-label="add to favourites"
                    class="action-btn"
                    @click="addToFavourites(gify)"
                >
                    {{ themeBasedHeart }}
                </button>
            </div>

            <div
                v-if="uiState === UI_STATE_ENUM.FAVOURITES"
                class="gif-action"
            >
                <button
                    class="action-btn"
                    @click="removeFromFavourites(gify)"
                >
                    💔
                </button>
            </div>
        </div>

        <input
            ref="invisibleTextRef"
            class="invisible"
            type="text"
        >
    </div>
</template>

<script>
import { UI_STATE } from '../scripts/ui-state.js';
import Vue from "vue";


export default {
    name: 'GiffyList',

    props: {
        gifies: {
            type: Array,
            default: () => []
        },
        uiState: {
            type: String,
            default: UI_STATE.SEARCH
        }
    },

    data() {
        return {
            UI_STATE_ENUM: UI_STATE,
            themeBasedHeart: '',
        }
    },

    created() {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        mq.addEventListener('change', e => this.updateTheme(e));
        this.updateTheme(mq)
    },

    mounted() {
        this.$nextTick(() => {
            this.$refs.gifyListContainer.setAttribute('tabindex', '0');
            this.$refs.gifyListContainer.focus();
            this.$refs.gifyListContainer.addEventListener('focusout', () => {
                this.$refs.gifyListContainer.removeAttribute('tabindex');
            });
        })
    },

    beforeDestroy() {
        this.$refs.gifyListContainer.removeEventListener('focusout', () => {
            this.$refs.gifyListContainer.removeAttribute('tabindex');
        })
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
        },

        copyGifyLink(evt, gify) {
            this.$refs.invisibleTextRef.value = gify.bitly_url;

            this.$copyText(this.$refs.invisibleTextRef.value)
                .then(() => {
                    Vue.notify({
                        group: 'notifications',
                        title: 'Link to Gify copied!',
                        text: gify.title,
                        duration: 2000
                    });
                    this.$refs.invisibleTextRef.value = "";
                })
                .catch(e => console.log(e))
        }
    }
}
</script>

<style lang="scss" scoped>

.gify-list {
    overflow: scroll;
    height: calc(100% - 4rem);
    //padding: 0.5rem 0 1rem;
}

.gify-container {
    display: flex;

    &:not(:last-of-type) {
        margin-bottom: 1rem;
    }
}

.gif-img {
    display: flex;
    background: linear-gradient(223deg, #383737 0.42%, #393838);
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
    min-width: 100px;
}

.gif-description {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.title {
    color: var(--a);
    text-decoration: underline;

    &:hover {
        cursor: pointer;
    }
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

.invisible {
    display: none;
}
</style>
