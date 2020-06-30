<template>
    <el-row class="topic-item">
        <el-col :span="3" style="text-align: center;">
            <el-avatar class="nav-avatar" :size="45" :src="avatarUrl" style="margin: 10px;"></el-avatar>
        </el-col>
        <el-col :span="12">
            <h2 style="margin: 0;">{{topicInfo.title}}</h2>
            <div>
                <span>{{topicInfo.type}}</span>
                <span style="margin-left:5%;">{{topicInfo.tags}}</span>
                <span style="margin-left:10%;">{{topicInfo.postList[0].time}}</span>
            </div>
        </el-col>
        <el-col :span="5"></el-col>
        <el-col :span="4"></el-col>
    </el-row>
</template>

<script>
export default {
    name: "TopicItem",
    props: ["topicInfo"],
    data() {
        return{
        avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        }
    }
};
</script>

<style>
</style>