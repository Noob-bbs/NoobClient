<template>
    <div>
        <img alt="Vue logo" src="../assets/logo.png" />
        <div>
            <div v-if="mode == 'login'">
                账户:
                <input type="text" v-model="user.account" placeholder="请输入用户名" />
                密码:
                <input
                    type="password"
                    v-model="user.password"
                    placeholder="请输入密码"
                />
                <button @click="login">登录</button>
                <button @click="mode = 'register'" class="register-link">注册账户</button>
                <button @click="logout">登出</button>
                <button @click="me">me</button>
            </div>
            <div v-else-if="mode == 'register'">
                账户:
                <input type="text" v-model="user.account" placeholder="请输入用户名" />
                密码:
                <input
                    type="password"
                    v-model="user.password"
                    placeholder="请输入密码"
                />
                邮箱:
                <input type="email" v-model="user.email" placeholder="请输入邮箱" />
                <button @click="register">注册</button>
                <button @click="mode == 'login'">登录</button>
            </div>
            <Card></Card>
        </div>
    </div>
</template>

<script>
import Card from './home/Card.vue' 
export default {
    components: {Card},
    name: "Login",
    data() {
        return {
            user: {
                account: "",
                password: ""
            },
            responseResult: [],
            mode: "login"
        };
    },
    methods: {
        login() {
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
                        this.$router.replace({ path: "/index" });
                        console.log("登陆成功");
                    }
                })
                .catch(failReponse => {
                    console.log("login error" + failReponse);
                });
        },
        register() {
            this.$axios
                .post("/register", {
                    account: this.user.account,
                    password: this.user.password,
                    email: this.user.email
                })
                .then(successResponse => {
                    console.log(
                        "成功发送请求" + JSON.stringify(successResponse)
                    );
                    if (successResponse.data.statusCode === 200) {
                        this.mode = "login";
                        console.log("注册成功");
                    }
                })
                .catch(failReponse => {
                    console.log("注册错误" + failReponse);
                });
        },
        logout() {
            this.$axios
                .get("/logout")
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
.register-link {
    margin-top: 20px;
    left: 0px;
}
</style>