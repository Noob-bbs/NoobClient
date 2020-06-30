<template>
    <el-container>
        <el-header></el-header>
        <el-main>
            <h1>主题帖</h1>
            <p>{{displayContent}}</p>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "Topic",
    computed: {},
    data() {
        return {
            displayContent: ""
        };
    },
    beforeMount: function() {
        console.log("文章参数:" + this.$route.params.id);
        //查询当前主题帖下的post
        this.$axios
            .get(
                `/post/getlist?pageSize=100&pageNum=0&topicId=${this.$route.params.id}`
            )
            .then(response => {
                console.log("TOPIC:" + JSON.stringify(response));
                if (response.data.statusCode == 200) {
                    this.displayContent = response.data.data;
                }
            })
            .catch(exception => {
                console.log(JSON.stringify(exception));
            });
    }
};
</script>

<style>
</style>