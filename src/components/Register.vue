<template>
    <el-form class="login-container" label-position="left" label-width="0px">
        <h3 class="login_title">注册</h3>
        <el-form-item>
            <el-input type="text" v-model="user.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="email" v-model="user.nick" auto-complete="off" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="email" v-model="user.email" auto-complete="off" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button
                type="primary"
                style="width: 100%;background: #505458;border: none"
                v-on:click="register"
            >注册账号</el-button>
        </el-form-item>
        <el-form-item class="form-link">
            <el-link type="primary" @click="changeModeL">登录</el-link>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            user: {
                account: "",
                nick: "",
                password: "",
                email: ""
            },
            responseResult: [],
            loading: false
        };
    },
    methods: {
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
                                this.$router.replace({ path: "/login" });
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
        changeModeL() {
            this.$router.replace({ path: "/login" });
        }
    }
};
</script>

<style>
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