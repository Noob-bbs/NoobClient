<template>
    <div>
        <el-row>
            <el-col :span="18">
                <el-container>
                    <el-header
                        style="border: 1px; border-color: black; border-style: solid; text-align: left;"
                    >
                        <el-button
                            type="primary"
                            style="margin: 10px 0px  10px 20%;"
                            
                            v-if="!this.$store.state.loginStatus"
                            @click="changeModeL"
                        >登录以发表主题</el-button>
                        <el-button
                            v-else
                            type="primary"
                            @click="addPost = true"
                            style="margin: 10px 0px  10px 30%;"
                        >发表主题</el-button>
                        <el-dropdown @command="handleTopicSelect" style="margin-left: 35%;">
                            <el-button plain>
                                {{showTopic}}
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="全部主题">全部主题</el-dropdown-item>
                                <el-dropdown-item command="新建主题">新建主题</el-dropdown-item>
                                <el-dropdown-item command="未回复主题">未回复主题</el-dropdown-item>
                                <el-dropdown-item command="最近回复主题">最近回复主题</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleSectionSelect" style="margin-left: 1%;">
                            <el-button plain>
                                {{showSection}}
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                <el-dropdown-item>双皮奶</el-dropdown-item>
                                <el-dropdown-item>蚵仔煎</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-header>
                    <el-aside class="side-bar" style="width: 200px;margin-top: 20px">
                        <switch></switch>
                        <!--<SideMenu></SideMenu>-->
                    </el-aside>
                    <el-main>
                        <!--<posts></posts>-->
                    </el-main>
                </el-container>
            </el-col>
            <el-col :span="6" style="border: 1px solid black; margin-top: 20px;">AAAA</el-col>
        </el-row>
        <AddPost :show="addPost" @cancelEvent="handleCancelEvent"></AddPost>
    </div>
</template>

<script>
import AddPost from "@/components/home/AddPost.vue";
export default {
    name: "Home",
    components: { AddPost },
    data() {
        return {
            showTopic: "全部主题",
            showSection: "全部板块",
            addPost: false
        };
    },
    methods: {
        handleTopicSelect(command) {
            console.log("command:" + command);
            this.showTopic = command;
        },
        handleSectionSelect(command) {
            console.log("command:" + command);
        },
        changeModeL() {
            this.$router.replace({ path: "/login" });
        },
        handleCancelEvent() {
            this.$confirm("确认关闭？")
                .then(response => {
                    console.log("关闭编辑框" + response);
                    this.addPost = false;
                })
                .catch(response => {
                    console.log("取消关闭编辑框" + response);
                });
        }
    }
};
</script>

<style>
.side-bar {
    margin-right: 20px;
}
</style>