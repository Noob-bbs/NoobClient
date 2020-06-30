<template>
    <el-drawer
        title="新增主题帖"
        :visible.sync="show"
        direction="btt"
        size="70%"
        :before-close="handleClose"
    >
        <el-form :model="form">
            <el-row>
                <el-col :span="14">
                    <el-form-item>
                        <el-input v-model="form.title" placeholder="在此输入您的主题帖的标题"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="2">
                    <el-form-item>
                        <el-select v-model="value" placeholder="请选择板块">
                            <el-option
                                v-for="item in sections"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-button type="info" style="padding: 15px 20px; margin-left: 5%;">
                            <i class="el-icon-close" />撤销
                        </el-button>
                        <el-button style="padding: 15px 20px;margin-left: 1px;" @click="post">
                            <i class="el-icon-check" />提交
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <Markdown v-model="form.content" style="text-align:left;" />
        </el-form>
    </el-drawer>
</template>

<script>
import Markdown from "vue-meditor";
export default {
    name: "AddPost",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    components: { Markdown },
    data() {
        return {
            table: {},
            gridData: {
                data: "",
                name: "",
                address: ""
            },
            form: {
                title: "",
                section: "",
                content: ""
            },
            sections: [
                {
                    label: "板块一",
                    value: 1
                },
                {
                    label: "板块二",
                    value: 2
                },
                {
                    label: "板块三",
                    value: 3
                }
            ],
            value: ""
        };
    },
    methods: {
        handleClose() {
            this.$emit("cancelEvent");
        },
        post(){
            //提交文章，先检查几个选项是否都设置了
            if(this.title === "" || this.form.section === "" || this.form.content ===""){
                this.$message.error("发帖失败,请检查是否存在未填写的部分")
            }
            else{
                //this.$axios
                //.post()
            }
            console.log(this.form.content)
        }
    }
};
</script>

<style>
</style>