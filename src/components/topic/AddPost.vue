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
            //console.log("回帖" + JSON.stringify(postObj));
            this.$axios
                .post("/post/addpost", postObj)
                .then(() => {
                    console.log("回帖成功");
                    this.$message.success("回帖成功")
                    this.content = ""
                    this.$emit("closeEvent");
                    //还要刷新一下页面
                    this.$store.commit("postListUpdate", true);
                    //返回的列表中的第一个是原帖，除去即可剩下的用来刷新展示的回帖列表
                    //console.log(JSON.stringify(response.data.data.postList));
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