<template>
    <el-dialog title="跟帖" :visible="show">
        <el-form>
            <el-form-item :label-width="formLabelWidth">
                <el-input type="textarea" placeholder="请输入" v-model="content"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleSubmmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "AddPost",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        tid: {
            type: Number
        }
    },
    methods: {
        handleClose: function() {
            console.log("关闭对话框");
            this.$emit("closeEvent");
        },
        handleSubmmit: function() {
            //回帖
            let postObj = {
                content: this.content,
                likeNum: 0,
                time: new Date().getTime(),
                userId: this.$store.state.user.id,
                account: this.$store.state.user.acccount,
                nick: this.$store.state.user.nick,
                topicId: this.tid
            };
            console.log("回帖" + JSON.stringify(postObj));
            this.$axios
                .post("/post/addpost", postObj)
                .then(response => {
                    console.log(JSON.stringify(response));
                })
                .catch(exception => {
                    console.log(JSON.stringify(exception));
                });
        }
    },
    data() {
        return {
            formLabelWidth: "120px",
            form: {},
            content: ""
        };
    },
    computed: {
        showDia() {
            return this.show;
        }
    }
};
</script>

<style>
</style>