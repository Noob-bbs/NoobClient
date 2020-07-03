<!--回帖展示项-->
<template>
    <div>
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
        return {};
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