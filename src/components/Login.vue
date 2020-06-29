<template>
    <div v-loading="loading" element-loading-text="请求中">
        <transition name="el-fade-in-linear" mode="out-in">
            <el-form
                class="login-container"
                label-position="left"
                label-width="0px"
                v-if="mode == 'login'"
            >
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
                    <el-link type="primary" @click="mode = 'register'">注册账号</el-link>
                </el-form-item>
            </el-form>
            <el-form
                class="login-container"
                label-position="left"
                label-width="0px"
                v-if="mode == 'register'"
            >
                <h3 class="login_title">注册</h3>
                <el-form-item>
                    <el-input
                        type="text"
                        v-model="user.account"
                        auto-complete="off"
                        placeholder="账号"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="email" v-model="user.nick" auto-complete="off" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        type="email"
                        v-model="user.email"
                        auto-complete="off"
                        placeholder="邮箱"
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
                    <el-button
                        type="primary"
                        style="width: 100%;background: #505458;border: none"
                        v-on:click="register"
                    >注册账号</el-button>
                </el-form-item>
                <el-form-item class="form-link">
                    <el-link type="primary" @click="mode = 'login'">登录</el-link>
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
                nick: "",
                password: "",
                email: ""
            },
            responseResult: [],
            mode: "login",
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
                                duration: 5
                            });
                            this.loading = false;
                            setTimeout(() => {
                                this.mode = "login";
                            }, 2500);
                            this.$router.replace({ path: "/" });
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
        register() {
            if (
                this.user.account === "" ||
                this.user.password === "" ||
                this.user.email === "" ||
                this.user.nick === ""
            ) {
                this.$message.error("信息不完整，无法注册");
            } else {
                this.loading = true;
                this.$axios
                    .post("/register", {
                        account: this.user.account,
                        password: this.user.password,
                        email: this.user.email,
                        nick: this.user.nick
                    })
                    .then(successResponse => {
                        console.log(
                            "成功发送注册请求" + JSON.stringify(successResponse)
                        );
                        if (successResponse.data.statusCode === 200) {
                            console.log("注册成功");
                            this.$notify({
                                title: "注册成功",
                                message: "您已成功注册账户，欢迎来到菜鸟论坛",
                                duration: 5000
                            });
                            setTimeout(() => {
                                this.mode = "login";
                            }, 1500);
                        } else {
                            this.$message.error(
                                "注册失败" + successResponse.data.data
                            );
                        }
                        this.loading = false;
                    })
                    .catch(failReponse => {
                        this.loading = false;
                        console.log("注册错误" + failReponse);
                        this.$message.error("注册失败" + failReponse);
                    });
            }
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
    border: 1px solid #eaeaea;
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
