<template>
    <div>
        <el-row>
            <el-col :span="18">
                <el-container>
                    <el-header
                        style="border: 0px; border-color: black; border-style: solid; text-align: left;"
                    >
                        <el-button
                            type="primary"
                            style="margin: 10px 0px  10px 15%;"
                            
                            v-if="!this.$store.state.loginStatus"
                            @click="changeModeL"
                        >登录以发表主题</el-button>
                        <el-button
                            v-else
                            type="primary"
                            @click="addTopic = true"
                            style="margin: 10px 0px  10px 15%;"
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
                                <el-dropdown-item command="全部板块">全部板块</el-dropdown-item>
                                <el-dropdown-item command="板块1">板块1</el-dropdown-item>
                                <el-dropdown-item command="板块2">板块2</el-dropdown-item>
                                <el-dropdown-item command="板块3">板块3</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-header>
                    <el-aside class="side-bar" style="width: 200px;margin-top: 20px;">
                        <switch></switch>
                        <!--<SideMenu></SideMenu>-->
                    </el-aside>
                    <el-main style="border: 0px solid gray; margin-left: 15%;">
                        <!--帖子列表信息-->
                        <TopicList :section="showSection"/>
                    </el-main>
                </el-container>
            </el-col>
            <!--<el-col :span="6" style="border: 1px solid black; margin-top: 7%;">AAAA</el-col>-->
        </el-row>
        <AddTopic :show="addTopic" @cancelEvent="handleCancelEvent" @closeDrawer="addTopic = false"></AddTopic>
    </div>
</template>

<script>
import AddTopic from "@/components/home/AddTopic.vue";
import TopicList from "@/components/home/TopicList.vue"

export default {
    name: "Home",
    components: { AddTopic,TopicList },
    data() {
        return {
            showTopic: "全部主题",
            showSection: "全部板块",
            addTopic: false
        };
    },
    methods: {
        handleTopicSelect(command) {
            console.log("command:" + command);
            this.showTopic = command;
        },
        handleSectionSelect(command) {
            console.log("板块切换:" + command);
            this.showSection = command;
            this.$store.commit("changeSec",command)
        },
        changeModeL() {
            this.$router.replace({ path: "/login" });
        },
        handleCancelEvent() {
            this.$confirm("确认关闭？")
                .then(response => {
                    console.log("关闭编辑框" + response);
                    this.addTopic = false;
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