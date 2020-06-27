<template>
    <div>
        <img alt="Vue logo" src="../assets/logo.png">
        <div>
        用户名:<input type="text" v-model="user.account" placeholder="请输入用户名"/>
        密码:<input type="password" v-model="user.password" placeholder="请输入密码"/>
        <button @click="login">登录</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            user: {
                account:'',
                password:''
            },
            responseResult: []
        }
    },
    methods: {
        login() {
            this.$axios
                .post('/login',{
                    account: this.user.account,
                    password: this.user.password
                })
                .then(successResponse =>{
                    if(successResponse.data.code === 200){
                        this.$router.replace({path: '/index'})
                        console.log("登陆成功")
                    }
                })
                .catch(failReponse=>{
                    console.log('login error' + failReponse)
                })
        }
    }
}
</script>

<style>

</style>