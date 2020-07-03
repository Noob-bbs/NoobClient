<!--个人信息组件-->
<template>
    <!--使用时间线展示,现在只获取了当前用户的id，用这个id去请求服务器获取该用户最近的发帖，用时间线展示-->
    <h1>{{Number(this.$route.params.id)}}</h1>
</template>

<script>
export default {
    name: "UserInfo",
    data() {
        return {};
    },
    computed: {}
};
</script>

<style>
</style>