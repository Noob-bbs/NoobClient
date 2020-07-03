<template>
    <div>
        <PostItem v-for="(post,index) in postList" :post="post" :key="post.id" :floor="index"></PostItem>
    </div>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
    name: "PostList",
    props: ["topicId"],
    components: { PostItem },
    data() {
        return {
            postList: []
        };
    },
    methods: {
        getPostList() {
            //发送请求获取当前文章的回帖
            this.$axios
                .get(
                    `/post/getlist?pageSize=20&pageNum=0&topicId=${this.topicId}`
                )
                .then(response => {
                    this.postList = response.data.data.postList;
                    //删除第一个post(后端第一个post存的是主题帖内容)
                    this.postList.shift();
                    //console.log(JSON.stringify(this.postList));
                })
                .catch(exception => {
                    console.log(JSON.stringify(exception));
                    this.$message.error("获取回帖失败" + JSON.stringify(exception));
                });
        }
    },
    beforeMount: function() {
        this.getPostList();
    },
    computed: {
        ifNeedUpdate() {
            return this.$store.state.postListUpdate;
        }
    },
    watch: {
        ifNeedUpdate(val) {
            console.log("post的state变化" + val);
            if (val) {
                console.log("需要刷新post列表");
                this.getPostList();
                //再改回false
                this.$store.commit("postListUpdate", false);
            }
        }
    }
};
</script>

<style>
</style>