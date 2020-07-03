<template>
    <div id="app">
        <NavBar />
        <router-view class="backtop" :key="$route.fullPath" />
    </div>
</template>
<script>
import NavBar from "@/components/common/NavBar.vue";
export default {
    components: { NavBar }
};
</script>
<style>
body {
    margin: 0px;
}

.nav {
    position: fixed;
    width: 100%;
    top: 0px;
    background-color: white;
    margin-bottom: 10%;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    overflow: scroll;
}
::-webkit-scrollbar {
    width: 0 !important;
}
</style>
