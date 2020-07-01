<template>
    <el-container>
        <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="topic-header">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main v-show="loaded">
            <div class="first-post">
                <h1 class="first-post-title">{{topicTitle}}</h1>
                <p class="first-post-subtitle">Author:{{author}} Time:{{this.time}}</p>
                <div class="markdown-body">
                    <VueMarkdown :source="mdContent"></VueMarkdown>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import "github-markdown-css/github-markdown.css";
import VueMarkdown from "vue-markdown";
export default {
    components: { VueMarkdown },
    name: "Topic",
    data() {
        return {
            displayContent: "",
            topicTitle: "",
            author: "",
            createTime: "",
            mdContent: "",
            loaded: false
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
                    let rd = response.data.data;
                    this.displayContent = rd;
                    this.topicTitle = rd.title;
                    this.author = rd.postList[0].nick;
                    this.createTime = rd.postList[0].time;
                    this.mdContent = rd.postList[0].content;
                    this.loaded = true;
                }
            })
            .catch(exception => {
                console.log(JSON.stringify(exception));
            });
    },
    computed: {
        time: function() {
            //选取最早的帖子（即楼主发的帖子的时间戳
            let dateObj = new Date(this.createTime);
            let year = dateObj.getYear() + 1900;
            let month = dateObj.getMonth() + 1;
            let theDate = dateObj.getDate();
            let hour = dateObj.getHours();
            let minute = dateObj.getMinutes();
            let second = dateObj.getSeconds();
            return (
                year +
                "-" +
                month +
                "-" +
                theDate +
                " " +
                hour +
                ":" +
                minute +
                ":" +
                second
            );
        }
    }
};
</script>

<style>
.first-post {
    padding-left: 10%;
    padding-right: 10%;
}
.first-post-subtitle {
    text-align: center;
}
.topic-header {
    padding: 5% 10% 5% 10%;
    padding-left: 10%;
    padding-right: 10%;
}
.first-post-title {
    text-align: center;
}
</style>