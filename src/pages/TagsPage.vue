<template>
    <div>
        <el-row>
            <el-col :span="24">
                <h1 style="text-align: center; margin-top:5%;">标签页</h1>
            </el-col>
        </el-row>
        <el-row style="margin: 5% 30% 5% 30%;">
            <el-col :span="24">
                <el-tag
                    v-for="(value,key) in tagsMap"
                    :key="key"
                    type="success"
                    style="margin-left: 10px;"
                    @click="handleTagClick"
                ><router-link :to="`/tags/${key}`">{{key}} {{value}}</router-link></el-tag>
                <el-divider content-position="center">点击任意标签以显示</el-divider>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24"></el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-timeline style="margin: 5% 15% 5% 15%">
                    <el-timeline-item
                        v-for="(topic,index) in tagedTopic"
                        :key="index"
                        :timestamp="cTime(topic.createTime)"
                        placement="top"
                    >
                        <TagsCard
                            :content="topic.content.substr(0,50) + '...'"
                            :title="topic.title"
                            :author="topic.postList[0].nick"
                            :rurl="`/topic/${topic.id}`"
                        />
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
    </div>
</template>

<script>
//import VueWordCloud from 'vuewordcloud';
import TagsCard from "@/components/tagspage/TagsCard.vue";
import { timeUtils } from "@/utils/utils.js";
export default {
    components: { TagsCard },
    name: "TagsPage",
    data() {
        return {
            tagsMap: [],
            curTag: [],
            tagedTopic: []
        };
    },
    beforeMount: function() {
        this.$axios
            .get("/gettags")
            .then(re => {
                if (re.data.statusCode == 200) {
                    console.log(JSON.stringify(re));
                    this.tagsMap = re.data.data;
                }
            })
            .catch(ex => {
                console.log("出错了" + JSON.stringify(ex));
            });
        //另外，如果进入页面时有参数
        let tagPar = this.$route.params.tag;
        if (tagPar != "" && tagPar != null && tagPar != undefined) {
            console.log("url带参数tag=" + tagPar);
            //发送请求获取当前tag所有topic
            this.$axios
                .get(`/topic/listbytag?pageSize=30&pageNum=0&tag=${tagPar}`)
                .then(re => {
                    if (re.data.statusCode == 200) {
                        console.log(
                            "根据标签获取\n" + JSON.stringify(re.data.data)
                        );
                        this.tagedTopic = re.data.data;
                    }
                })
                .catch(ex => {
                    console.log("出错了" + JSON.stringify(ex));
                });
        } else {
            console.log("url不带参数tag");
        }
    },
    methods: {
        randomRgbaColor() {
            //随机生成RGB颜色
            var r = Math.floor(Math.random() * 256); //随机生成256以内r值
            var g = Math.floor(Math.random() * 256); //随机生成256以内g值
            var b = Math.floor(Math.random() * 256); //随机生成256以内b值
            return `rgb(${r},${g},${b})`; //返回rgba(r,g,b,a)格式颜色
        },
        handleTagClick(v) {
            console.log("标签点击" + JSON.stringify(v));
        },
        cTime(timestamp) {
            return timeUtils.timeStampConvert(timestamp);
        }
    }
};
</script>

<style>
</style>