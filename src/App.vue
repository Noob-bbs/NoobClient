<template>
    <div id="app">
        <NavBar />
        <router-view />
    </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
    components: { NavBar }
};
</script>
<style>
body {
    margin: 0px;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: center;
}
</style>
