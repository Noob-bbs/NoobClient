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

<body>
    <el-popover
        placement="bottom"
        width="200"
        trigger="click"
        <a href="" target="_blank">用户信息</a>
        <a href="" target="_blank">登出</a>
    >
    <a href="#"  style="width:100px; height:100px; border-radius:100%; overflow:hidden;">
        <img src="head.jpg">
    </a>
    <el-button type="primary" ;icon=""><h3>用户信息</h3><el-button>
    </el-popover>
</body>