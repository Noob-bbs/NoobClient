<template>
    <el-container>
        <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="topic-header">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>{{type}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{topicTitle}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main v-show="loaded">
            <div class="first-post">
                <h1 class="first-post-title">{{topicTitle}}</h1>
                <p class="first-post-subtitle">Author:{{author}} Time:{{this.time}}</p>
                <div class="markdown-body">
                    <VueMarkdown :source="mdContent"></VueMarkdown>
                </div>
                <div class="first-post-foot">
                    <el-button type="success">赞</el-button>
                    <el-button
                        type="primary"
                        v-if="!this.$store.state.loginStatus"
                        @click="changeModeL"
                    >登录以回复</el-button>
                    <el-button v-else type="primary" @click="addPost=true">评论</el-button>
                    <el-button type="info" disabled>删除</el-button>
                </div>
            </div>
            <div>
                回帖列表
                <PostList :topicId="this.$route.params.id"></PostList>
            </div>
        </el-main>
        <AddPost :show="addPost" :tid="Number(this.$route.params.id)" @closeEvent="addPost = false"></AddPost>
    </el-container>
</template>

<script>
import "github-markdown-css/github-markdown.css";
import AddPost from "@/components/topic/AddPost.vue";
import PostList from "@/components/topic/PostList.vue";
import VueMarkdown from "vue-markdown";
export default {
    components: { VueMarkdown, AddPost, PostList },
    name: "Topic",
    methods: {
        changeModeL() {
            //记录当前的页面，登陆成功后跳转回来
            this.$store.commit("setPrevUrl",`/topic/${this.$route.params.id}`)
            this.$router.replace({ path: "/login" });
        }
    },
    data() {
        return {
            displayContent: "",
            topicTitle: "",
            author: "",
            createTime: "",
            mdContent: "",
            loaded: false,
            type: "",
            addPost: false
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
                if (response.data.statusCode == 200) {
                    let rd = response.data.data;
                    this.displayContent = rd;
                    this.topicTitle = rd.title;
                    this.author = rd.postList[0].nick;
                    this.createTime = rd.postList[0].time;
                    this.mdContent = rd.postList[0].content;
                    this.type = rd.type;
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