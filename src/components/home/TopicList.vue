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
            topicList: [],
            page: 0
        };
    },
    methods: {
        //获取分页后的主题帖列表
        getTopicList() {
            this.$axios
                .get(`/topic/list?pageSize=10&pageNum=${this.page}`)
                .then(response => {
                    if (response.data.statusCode == 200) {
                        console.log(
                            "自动获取" +
                                JSON.stringify(response.data.data.topicList)
                        );
                        this.topicList = response.data.data.topicList;
                    } else this.$message.error("获取话题列表失败" + response);
                })
                .catch(exception => {
                    console.log(exception);
                    this.$message.error("获取话题列表失败" + exception);
                });
        }
    },
    computed: {
        ifNeedUpdate() {
            return this.$store.state.topicListUpdate;
        }
    },
    watch: {
        ifNeedUpdate(val) {
            console.log("state变化" + val);
            if (val) {
                console.log("需要刷新列表");
                this.getTopicList();
                this.$store.commit("topicListUpdate", false);
            }
        }
    },
    beforeMount: function() {
        //模板挂载后请求
        this.getTopicList();
    }
};
</script>

<style>
</style>