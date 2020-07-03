<template>
    <el-card>
        <h3>发帖</h3>
        <el-divider></el-divider>
        <p>{{this.content}}</p>
    </el-card>
</template>

<script>
export default {
    name: "TimeCard",
    props: ["content"]
};
</script>

<style>
</style>