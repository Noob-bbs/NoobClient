<template>
    <div>
        <TopicItem v-for="item in topicList" :topic-info="item" :key="item.id" />
        <div class="block" style="text-align: center;">
            <el-pagination
                layout="prev, pager, next"
                :page-size="5"
                :current-page="page"
                :total="5 * lastPage"
                @current-change="changePage"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import TopicItem from "./TopicItem.vue";
export default {
    components: { TopicItem },
    data() {
        return {
            topicList: [],
            page: 1,
            lastPage: 1
        };
    },
    methods: {
        //获取分页后的主题帖列表
        getTopicList() {
            this.$axios
                .get(`/topic/list?pageSize=6&pageNum=${this.page - 1}`)
                .then(response => {
                    if (response.data.statusCode == 200) {
                        console.log(
                            "自动获取" +
                                JSON.stringify(response.data.data.lastPage)
                        );
                        this.lastPage = response.data.data.lastPage;
                        this.topicList = response.data.data.topicList;
                    } else this.$message.error("获取话题列表失败" + response);
                })
                .catch(exception => {
                    console.log(exception);
                    this.$message.error("获取话题列表失败" + exception);
                });
        },
        changePage(page) {
            this.page = page;
            this.getTopicList();
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