<!--个人信息组件-->
<template>
    <!--使用时间线展示,现在只获取了当前用户的id，用这个id去请求服务器获取该用户最近的发帖，用时间线展示-->
    <el-container style="height: 100%;">
        <el-header style="margin-top: 5%;">
            <h1 style="text-align: center;">用户信息</h1>
        </el-header>
        <el-main>
            <el-avatar class="uesr_portrait" :size="70" :src="avatarUrl"></el-avatar>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "UserInfo",
    data() {
        return {
            user: {},
            loaded: false,
            avatarUrl: ""
        };
    },
    computed: {},
    methods: {
        getUserInfo() {
            this.$axios
                .get(`/getuserinfo?userId=${this.$route.params.id}`)
                .then(re => {
                    console.log(
                        "USER INFO" +
                            JSON.stringify(re.data.data.user) +
                            "\n_--------------"
                    );
                    if (re.data.statusCode == 200) {
                        this.user = re.data.data;
                        let num = re.data.data.user.avatarUrl;
                        this.avatarUrl = require('@/assets/avatar/icon-test_' + num + '.png');
                        console.log("头像" + this.avatarUrl);
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
<style scoped>
</style>