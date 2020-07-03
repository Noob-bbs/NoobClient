<template>
    <el-card>
        <el-row>
            <el-col :span="10">
                <h2>{{this.title}}</h2>
            </el-col>
            <el-col :span="4" :offset="20">
                <el-button class="go-button" plain @click="go">前往</el-button>
            </el-col>
        </el-row>

        <el-divider></el-divider>
        <h3>作者:{{this.author}}</h3>
        <p>{{this.content}}</p>
    </el-card>
</template>

<script>
export default {
    name: "TagsCard",
    props: ["title", "author", "content", "rurl"],
    methods: {
        go() {
            console.log("前往标签页" + this.rurl);
            this.$router.replace(this.rurl);
        }
    }
};
</script>

<style>
.go-button {
    position: absolute;
    right: 10px;
    top: 1px;
}
</style>