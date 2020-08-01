<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        created() {
            let loading = document.getElementById('preloader');
            if (loading !== null) {
                document.body.removeChild(loading);
            }
        },
    }
</script>

<style>
    #app {
        width: 100vw;
        height: 100vh;
        background-color: rgb(255, 255, 255);
    }
</style>
