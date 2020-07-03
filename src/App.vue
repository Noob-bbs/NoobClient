<template>
    <div id="app">
        <NavBar />
        <router-view class="backtop" />
        <AddThis publicId="ra-5e6530eddf8f6adf"></AddThis>
        
    </div>
</template>
<script>
import NavBar from "@/components/common/NavBar.vue";
import AddThis from 'vue-simple-addthis-share'
export default {
    components: { NavBar, AddThis }
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
