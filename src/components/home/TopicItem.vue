<template>
    <el-row class="topic-item">
        <el-col :span="3" style="text-align: center;">
            <el-avatar class="nav-avatar" :size="45" :src="avatarUrl" style="margin: 10px;"></el-avatar>
        </el-col>
        <el-col :span="12">
            <router-link class="topic-item-title" :to="`/topic/${topicInfo.id}`">{{topicInfo.title}}</router-link>
            <div>
                <span>{{topicInfo.type}}</span>
                <el-tag type="info" v-for="tag in topicInfo.tags" :key="tag">{{tag}}</el-tag>
                <span style="margin-left:10%;">{{time}}</span>
            </div>
        </el-col>
        <el-col :span="5">
            <span>{{topicInfo.postList[0].likeNum}}赞同</span>
            <span>{{topicInfo.postList.length}}帖子</span>
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
</template>

<script>
export default {
    name: "TopicItem",
    props: ["topicInfo"],
    data() {
        return {
            avatarUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        };
    },
    computed: {
        time: function() {
            //选取最早的帖子（即楼主发的帖子的时间戳
            let dateObj = new Date(this.topicInfo.postList[0].time);
            let year = dateObj.getYear() + 1900;
            let month = dateObj.getMonth() + 1;
            let theDate = dateObj.getDate();
            let hour = dateObj.getHours();
            let minute = dateObj.getMinutes();
            let second = dateObj.getSeconds();
            return (
                year +
                "-" +
                month +
                "-" +
                theDate +
                " " +
                hour +
                ":" +
                minute +
                ":" +
                second
            );
        }
    }
};
</script>

<style>
.topic-item-title {
    font-size: 1.2em;
}
</style>