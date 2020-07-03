<!--回帖展示项-->
<template>
    <div>
        <el-avatar :size="45" :src="avatarUrl" style="margin: 10px;"></el-avatar>
        <p>----{{post.nick}}-----</p>
        <p>{{cTime(post.time)}}</p>
        <p>{{post.content}}</p>
    </div>
</template>
<script>
import { timeUtils } from "@/utils/utils.js";
export default {
    name: "PostItem",
    props: ["floor", "post"],
    data() {
        return {
            avatarUrl:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        };
    },
    methods: {
        cTime(timeStamp) {
            return timeUtils.timeStampConvert(timeStamp);
        }
    }
};
</script>

<style>
</style>