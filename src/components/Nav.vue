<template>
    <div
        id="nav"
        class="page-element"
    >
        <form>
            <div
                id="segmented-navigation"
                class="segmented-navigation"
                role="radiogroup"
            >
                <input
                    id="search-segment"
                    v-model="radioState"
                    :value="UI_STATE_ENUM.SEARCH"
                    class="radio"
                    name="ui-state"
                    type="radio"
                    @change="radioSelected"
                >
                <label
                    class="segment"
                    for="search-segment"
                >
                    Search
                </label>

                <input
                    id="favourites-segment"
                    v-model="radioState"
                    :value="UI_STATE_ENUM.FAVOURITES"
                    class="radio"
                    name="ui-state"
                    type="radio"
                    @change="radioSelected"
                >
                <label
                    class="segment"
                    for="favourites-segment"
                >
                    Favourites
                </label>
            </div>
        </form>
    </div>
</template>

<script>
import { UI_STATE } from "../scripts/ui-state.js";


export default {
    name: "Navigation",
    props: {
        uiState:{
            type: String,
            default: UI_STATE.SEARCH
        }
    },
    data() {
        return {
            UI_STATE_ENUM: UI_STATE,
            radioState: this.uiState,
        }
    },
    methods: {
        radioSelected(evt) {
            this.$emit("selectedUiState", evt.target.value);
        },
    },
};
</script>

<style lang="scss" scoped>

.segmented-navigation {
    border: 0.0625rem solid var(--color);
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
}

.radio {
    opacity: 0;
    position: fixed;
    width: 0;
}

.segment {
    z-index: 1000;
    flex: 1 1 0;
    padding: 0.75rem;
    text-align: center;
    color: var(--color);
    background-color: transparent;
    white-space: nowrap;

    &:not(:last-of-type) {
        border-right: 1px solid var(--color);
    }

    &:first-of-type {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }

    &:last-of-type {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
}

.segment:focus {
    outline: none;
}

.radio:checked + .segment {
    background-color: var(--button-color-selected);
}

.radio + .segment:hover,
.radio:checked + .segment:hover {
    background-color: var(--button-color-hover);
    cursor: pointer;
}

[data-whatinput="keyboard"] .radio:focus + .segment {
    outline: 3px dashed var(--color);
}

[data-whatintent="touch"] .radio + .segment:hover,
[data-whatintent="touch"] .radio:checked + .segment:hover {
    background-color: var(--button-color-selected);
}

</style>
