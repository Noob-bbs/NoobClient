<template>
    <div v-loading="loading" element-loading-text="请求中">
        <transition name="el-fade-in-linear" mode="out-in">
            <el-form class="login-container" label-position="left" label-width="0px">
                <h3 class="login_title">登录</h3>
                <el-form-item>
                    <el-input
                        type="text"
                        v-model="user.account"
                        auto-complete="off"
                        placeholder="账号"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        type="password"
                        v-model="user.password"
                        auto-complete="off"
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
                <el-form-item style="width: 100%">
                    <el-checkbox v-model="remember">记住登录信息</el-checkbox>
                    <el-button
                        type="primary"
                        style="width: 100%;background: #505458;border: none"
                        v-on:click="login"
                    >登录</el-button>
                </el-form-item>
                <el-form-item class="form-link">
                    <el-link type="primary" @click="changeModeR">注册账号</el-link>
                </el-form-item>
            </el-form>
        </transition>
    </div>
</template>

<script>
export default {
    components: {},
    name: "Login",
    data() {
        return {
            user: {
                account: "",
                password: ""
            },
            responseResult: [],
            remember: false,
            loading: false
        };
    },
    methods: {
        login() {
            //首先先检测密码输入了没
            if (this.user.account === "" || this.user.password === "") {
                this.$message.error("输入信息不完整,无法登录哦");
            } else {
                this.loading = true;
                this.$axios
                    .post("/login", {
                        account: this.user.account,
                        password: this.user.password
                    })
                    .then(successResponse => {
                        console.log(
                            "成功发送请求" + JSON.stringify(successResponse)
                        );
                        if (successResponse.data.statusCode === 200) {
                            this.$notify({
                                title: "登陆成功",
                                message: "欢迎回到菜鸟论坛",
                                duration: 5000
                            });
                            this.loading = false;
                            this.$store.commit(
                                "login",
                                successResponse.data.data
                            );
                            //注意，如果之前保存了页面的话，跳转回原来的页面
                            if (this.$store.state.preUrl === "") {
                                this.$router.replace({ path: "/" });
                            } else {
                                console.log(
                                    "跳转到之前的页面" +
                                        this.$store.state.prevUrl
                                );
                                this.$router.replace({
                                    path: this.$store.state.prevUrl
                                });
                                this.$store.commit("setPrevUrl", "");
                            }
                            console.log("登陆成功");
                        } else {
                            this.loading = false;
                            this.$message.error(
                                "登陆失败" + successResponse.data.data
                            );
                        }
                    })
                    .catch(failReponse => {
                        this.loading = false;
                        this.$message.error("登陆失败" + failReponse);
                        console.log("login error" + failReponse);
                    });
            }
        },
        changeModeR() {
            this.$router.replace({ path: "/register" });
        },
        logout() {
            this.$axios
                .get("/me")
                .then(response => {
                    console.log("成功发送请求" + JSON.stringify(response));
                })
                .catch(failReponse => {
                    console.log("错误" + failReponse);
                });
        },
        me() {
            this.$axios
                .get("/me")
                .then(response => {
                    console.log("成功发送请求" + JSON.stringify(response));
                })
                .catch(failReponse => {
                    console.log("错误" + failReponse);
                });
        }
    }
};
</script>

<style scoped>
el-input {
    width: 100%;
}

.register-link {
    margin-top: 20px;
    left: 0px;
}
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 0px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}

.form-link {
    text-align: left;
}
</style>
