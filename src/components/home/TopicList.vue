<template>
    <div>
        <TopicItem v-for="item in topicList" :topic-info="item" :key="item.id" />
    </div>
</template>

<script>
import TopicItem from "./TopicItem.vue";
export default {
    components: { TopicItem },
    data() {
        return {
            topicList: [
                {
                    id: 1,
                    title: "测试标题",
                    section: "测试板块",
                    time: "2020/6/30"
                },
                {
                    id: 2,
                    title: "测试标题",
                    section: "测试板块",
                    time: "2020/6/30"
                },
                {
                    id: 3,
                    title: "测试标题",
                    section: "测试板块",
                    time: "2020/6/30"
                },
                {
                    id: 4,
                    title: "测试标题",
                    section: "测试板块",
                    time: "2020/6/30"
                },
                {
                    id: 5,
                    title: "测试标题",
                    section: "测试板块",
                    time: "2020/6/30"
                }
            ]
        };
    }
};
</script>

<style>
</style>