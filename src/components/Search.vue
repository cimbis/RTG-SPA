<template>
    <div
        id="search"
        class="page-element"
    >
        <form
            id="search-form"
            aria-label="gify search form"
            @submit.prevent="onSubmit"
        >
            <input
                id="search-giffies"
                v-model.trim="searchTerm"
                aria-label="gify search box"
                placeholder="Search Gifies"
                type="text"
            >

            <button aria-label="search">
                🔍
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Search',

    data() {
        return {
            searchTerm: ''
        }
    },

    methods: {
        onSubmit() {
            this.$emit("searchGifies", this.searchTerm);
        }
    }
}
</script>

<style lang="scss" scoped>

form {
    display: flex;
    align-items: center;
}

input, button {
    z-index: 1000;
    box-sizing: border-box;
    height: 3rem;
    background-color: transparent;
    border: 0.0625rem solid var(--color);
    border-radius: 0;
}

input {
    flex-grow: 1;
    margin-right: -0.0625px;
    padding: 1rem;
    color: var(--color);
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-right: none;
    font-size: 1rem;
}

button {
    margin: 0;
    background-color: var(--button-background);
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    padding: 0 1rem;
    font-size: 1.25rem;

    &:hover {
        cursor: pointer;
        background-color: var(--button-color-hover);
    }
}

[data-whatintent="touch"] {
    input {
        margin-right: -0.1875rem;
    }
}
</style>
