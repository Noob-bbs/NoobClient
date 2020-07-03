<!--回帖展示项-->
<template>
    <div class="post_reply">
        <el-avatar class="uesr_portrait" :size="55" :src='require("@/assets/avatar/icon-test_" + Math.round(Math.random() * 10) + ".png")'></el-avatar>
        <div class="reply_content">
            <ul>
                <li class="reply_name">{{post.nick}}</li>
                <li class="reply_time">发布于 {{cTime(post.time)}}</li>
            </ul>
            <div class="clear"></div>
            <p class="reply_text">{{post.content}}</p>
        </div>
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
                "@/assets/avatar/icon-test_" +
                Math.round(Math.random() * 10) +
                ".png"
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
/* CSS初始化 */
* {
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
    color: #868686;
}
ul,
li,
ol {
    list-style: none;
}
h1,
h2,
h3,
h4,
h5 {
    font-weight: 400;
}

/* 定义回帖整体样式 */
.post_reply {
    float: left;
    width: 80%;
    margin: 10px 0;
    padding: 20px;
    /* background-color: pink; */
    border-bottom: 0.5px solid #868686;
}

/* 定义用户头像样式 */
.uesr_portrait {
    float: left;
    margin: 5px 0 0 0;
}

/* 定义回帖内容整体样式 */
.reply_content {
    float: left;
    margin: 0 0 0 20px;
}

.reply_content ul li {
    float: left;
    padding: 0 30px 0 0;
    height: 30px;
    line-height: 30px;
}

/* 定义回帖者昵称样式 */
.reply_name {
    font-size: 20px;
    color: #333;
}

/* 定义回帖时间样式 */
.reply_time {
    font-size: 14px;
    color: #868686;
}

/* 定义回帖内容样式 */
.reply_text {
    margin: 15px 0;
    font-size: 16px;
}
/* 清除浮动 */
.clear {
    clear: both;
}
</style>