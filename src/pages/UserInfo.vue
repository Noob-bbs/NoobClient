<!--个人信息组件-->
<template>
    <!--使用时间线展示,现在只获取了当前用户的id，用这个id去请求服务器获取该用户最近的发帖，用时间线展示-->
    <el-container style="height: 100%;">
        <el-header style="margin-top: 5%;">
            <h1 style="text-align: center;">用户信息</h1>
        </el-header>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-avatar
                        style="margin-left: 47.2%"
                        class="uesr_portrait"
                        :size="80"
                        :src="avatarUrl"
                    ></el-avatar>
                    <br />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" style="text-align: center;">
                    <h2>{{this.user.nick}}</h2>
                    <br />
                    <h3>账户:{{this.user.account}}</h3>
                    <h3>邮箱:{{this.user.email}}</h3>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-timeline style="margin: 5% 15% 5% 15%">
                        <el-timeline-item
                            v-for="(post,index) in posts"
                            :key="index"
                            :timestamp="post.timestamp"
                            placement="top"
                        >
                            <TimeCard :content="post.content" />
                        </el-timeline-item>
                    </el-timeline>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import TimeCard from "@/components/userInfo/TimeCard.vue";
import { timeUtils } from "@/utils/utils.js";
export default {
    name: "UserInfo",
    components: { TimeCard },
    data() {
        return {
            user: {},
            loaded: false,
            avatarUrl: "",
            posts: []
        };
    },
    computed: {},
    methods: {
        getUserInfo() {
            this.$axios
                .get(`/getuserinfo?userId=${this.$route.params.id}`)
                .then(re => {
                    if (re.data.statusCode == 200) {
                        this.user = re.data.data.user;
                        this.avatarUrl = require("@/assets/avatar/icon-test_0.png");
                        //加工获取到的posts
                        let postList = re.data.data.user.postList;
                        for (let post of postList) {
                            this.posts.push({
                                timestamp: timeUtils.timeStampConvert(
                                    post.time
                                ),
                                content: post.content.substr(0, 200) + "..."
                            });
                            console.log(timeUtils.timeStampConvert(post.time));
                        }
                    }
                })
                .catch(ex => {
                    console.log(JSON.stringify(ex));
                });
        }
    },
    beforeMount: function() {
        this.getUserInfo();
    }
};
</script>
<style>
.info-header {
    text-align: center;
}
</style>