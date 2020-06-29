<template>
    <el-row :gutter="20">
        <el-col :span="4">
            <div class="nav-brand">
                <router-link to="/" class="nav-brand-link">菜鸟论坛</router-link>
            </div>
        </el-col>
        <el-col :offset="1" :span="12">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                router
            >
                <el-menu-item index="index">
                    <i class="el-icon-edit"></i>主页
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-files" />板块
                    </template>
                    <el-menu-item index="2-1">板块1</el-menu-item>
                    <el-menu-item index="2-2">板块2</el-menu-item>
                    <el-menu-item index="2-3">板块3</el-menu-item>
                </el-submenu>
                <el-menu-item index="3">
                    <i class="el-icon-collection-tag" />标签
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-alarm-clock"></i>最新帖子
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="6" :offset="1">
            <div class="nav-account" v-if="!this.$store.state.loginStatus">
                <el-button type="text">登录</el-button>
                <el-button type="text">注册</el-button>
            </div>
            <el-dropdown @command="handleCommand" style="margin-top: 15px;" v-else>
                <el-avatar class="nav-avatar" :size="35" :src="circleUrl"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "NavBar",
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleCommand(command) {
            console.log(command);
            if (command === "logout") {
                this.$axios
                    .get("/logout")
                    .then(response => {
                        this.$message.info(response.data.data);
                        this.$store.commit("logout");
                        console.log("成功发送请求" + JSON.stringify(response));
                    })
                    .catch(failReponse => {
                        console.log("错误" + failReponse);
                    });
            }
        }
    },
    data() {
        return {
            circleUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            activeIndex: "1"
        };
    }
};
</script>

<style>
.nav-brand {
    margin-left: 20px;
    text-align: center;
    padding: 1em;
}

.nav-brand-link {
    font-size: 1.5em;
    text-decoration: none;
    text-decoration-line: none;
    color: grey;
    font-weight: bold;
}

.nav-account {
    line-height: 100%;
    margin: 1em;
}

.nav-avatar {
    margin-left: 1em;
}
</style>