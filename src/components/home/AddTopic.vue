<template>
    <el-drawer
        title="新增主题帖"
        :visible.sync="show"
        direction="btt"
        size="80%"
        :before-close="handleDrawerClose"
    >
        <el-form :model="form" v-loading="loading" element-loading-text="请求中">
            <el-row>
                <el-col :span="14">
                    <el-form-item>
                        <el-input v-model="form.title" placeholder="在此输入您的主题帖的标题"></el-input>
                    </el-form-item>
                    <el-tag
                        :key="tag"
                        v-for="tag in form.tags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                    >{{tag}}</el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                    ></el-input>
                    <el-button
                        v-else
                        class="button-new-tag"
                        size="small"
                        @click="showInput"
                        style="margin-left: 10px;"
                    >+ New Tag</el-button>
                </el-col>
                <el-col :span="8" :offset="2">
                    <el-form-item>
                        <el-select v-model="form.section" placeholder="请选择板块">
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
                        <el-button
                            style="padding: 15px 20px;margin-left: 1px;"
                            @click="submmitTopic"
                        >
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
    name: "AddTopic",
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
                userId: this.$store.state.user.id,
                title: "",
                section: "",
                content: "",
                tags: []
            },
            sections: [
                {
                    label: "板块一",
                    value: "板块1"
                },
                {
                    label: "板块二",
                    value: "板块2"
                },
                {
                    label: "板块三",
                    value: "板块3"
                }
            ],
            loading: false,
            inputVisible: false,
            inputValue: ""
        };
    },
    methods: {
        handleDrawerClose() {
            this.$emit("cancelEvent");
        },
        submmitTopic() {
            //提交文章，先检查几个选项是否都设置了
            if (
                this.form.title === "" ||
                this.form.section === "" ||
                this.form.content === ""
            ) {
                this.$message.error("发帖失败,请检查是否存在未填写的部分");
            } else {
                //console.log(JSON.stringify(this.form));
                this.loading = true;
                this.$axios
                    .post("/topic/create", {
                        userId: this.form.userId,
                        title: this.form.title,
                        type: this.form.section,
                        content: this.form.content,
                        tags: this.form.tags
                    })
                    .then(response => {
                        console.log(
                            "发送发帖POST请求" + JSON.stringify(response)
                        );
                        if (response.data.statusCode == 200) {
                            this.$message.success("发帖成功");
                            this.form = {
                                userId: this.$store.state.user.id,
                                title: "",
                                section: "",
                                content: "",
                                tags: []
                            };
                            this.$store.commit("topicListUpdate", true);
                        } else this.$message.error("发帖失败" + response.data);
                        this.$emit("closeDrawer");
                    })
                    .catch(exception => {
                        console.log(exception);
                    });
                this.loading = false;
                //.topic()
            }
            console.log(this.form.content);
        },
        handleClose(tag) {
            this.form.tags.splice(this.form.tags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.form.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = "";
        }
    }
};
</script>

<style>
.el-tag + .el-tag {
    margin-left: 10px;
    margin-bottom: 5px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>