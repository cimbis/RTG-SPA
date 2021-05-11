<template>
    <div id="title" class="page-element">
        <h1>{{ msg }}</h1>
        <p>{{ desc }}</p>
    </div>
</template>

<script>
export default {
    name: 'Title',
    props: {
        msg: String,
        desc: String,
    }
}
</script>

<style lang="scss" scoped>

#title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1rem;

    h1 {
        font-size: 4rem;
        margin-block-end: 0;
        margin-block-start: 0;
    }

    p {
        font-style: italic;
    }
}

@media (screen and max-width: 576px) {
    #title {
        margin: 0 auto;

        h1 {
            font-size: 2rem;
        }
    }

}
</style>
