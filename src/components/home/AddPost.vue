<template>
    <el-drawer
        title="新增主题帖"
        :visible.sync="show"
        direction="btt"
        size="50%"
        :before-close="handleClose"
    ></el-drawer>
</template>

<script>
export default {
    name: "AddPost",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            table: {},
            gridData: {
                data: "",
                name: "",
                address: ""
            }
        };
    },
    methods: {
        handleClose() {
            this.$emit("cancelEvent");
        }
    }
};
</script>

<style>
</style>