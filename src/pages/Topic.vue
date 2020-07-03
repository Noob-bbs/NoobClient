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
                    <el-button
                        type="success"
                        v-if="!this.$store.state.loginStatus"
                        @click="changeModeL"
                    >登录以点赞</el-button>
                    <el-button v-else type="success" @click="like">
                        <i class="el-icon-thumb" />
                        赞 {{likeNum}}
                    </el-button>
                    <el-button
                        type="primary"
                        v-if="!this.$store.state.loginStatus"
                        @click="changeModeL"
                        style="margin-right: 10px;"
                    >登录以回复</el-button>
                    <el-button
                        v-else
                        type="primary"
                        @click="addPost=true"
                        style="margin-right: 10px;"
                    >评论</el-button>
                    
                        <el-tooltip
                            content="您不是该帖子的主人或者管理员"
                            placement="bottom"
                            effect="light"
                            :disabled="canDel"
                        >
                            <span>
                                <el-button type="info" :disabled="!canDel" @click="deleteTopic">删除</el-button>
                            </span>
                        </el-tooltip>
                </div>
            </div>
            <div>
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
            this.$store.commit("setPrevUrl", `/topic/${this.$route.params.id}`);
            this.$router.replace({ path: "/login" });
        },
        like() {
            //点赞/取消点赞
            this.$axios
                .get(
                    `/post/addlike?userId=${this.$store.state.user.id}&postId=${this.firstPostId}`
                )
                .then(response => {
                    console.log("点赞结果");
                    if (response.data.statusCode == "200") {
                        this.likeNum = response.data.data;
                        this.$message.success("成功点赞");
                    } else if (response.data.statusCode == "201") {
                        this.likeNum = response.data.data;
                        this.$message.success("你已经点过赞了哦，取消点赞");
                    } else {
                        this.$message.error("点赞出错");
                    }
                    console.log(JSON.stringify(response));
                })
                .catch(exception => {
                    console.log(JSON.stringify(exception));
                });
        },
        checkPermission() {
            //检查权限
            if (this.userId == this.$store.state.user.id) {
                console.log("文章主人，可删帖");
                this.canDel = true;
            } else if (this.$store.state.user.roleSet[0].roleName == "ADMIN") {
                console.log("管理员，可删帖");
                this.canDel = true;
            } else {
                console.log(this.userId + "------" + this.$store.state.user.id);
            }
        },
        deleteTopic() {
            //删帖,同时后端也要检验，其实更安全的做法 用户id应该直接从session里面读取
            this.$axios
                .get(
                    `/topic/deletetopic?userId=${this.$store.state.user.id}&topicId=${this.$route.params.id}`
                )
                .then(re => {
                    if (re.data.statusCode == 200) {
                        this.$message.success("删帖成功");
                        this.$router.replace({ path: "/" });
                    } else {
                        this.$message.error("删帖失败" + re.data.data);
                    }
                })
                .catch(ex => {
                    this.$message.error("删帖失败" + JSON.stringify(ex));
                });
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
            addPost: false,
            likeNum: 0,
            firstPostId: 0,
            canDel: false,
            userId: 0
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
                    this.firstPostId = rd.postList[0].id;
                    this.type = rd.type;
                    this.loaded = true;
                    this.userId = rd.userId;
                    //检测当前用户是否有权限删除帖子（帖子的发帖者或者管理员可以删除
                    this.checkPermission();
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