<template>
  <el-row class="topic-item">
    <el-col class="nav-avatar" :span="3">
      <el-avatar :size="45" :src="avatarUrl" style="margin: 10px;"></el-avatar>
    </el-col>
    <el-col :span="12">
      <router-link class="post_portrait" :to="`/topic/${topicInfo.id}`">{{topicInfo.title}}</router-link>
      <div class="post_details">
        <span class="post_details_public post_plate">{{topicInfo.type}}</span>
        <el-tag type="info" v-for="tag in topicInfo.tags" :key="tag">{{tag}}</el-tag>
        <span class="post_details_public post_time">{{time}}</span>
      </div>
    </el-col>
    <el-col class="post_statistics" :span="5">
      <ul>
        <li class="post_statistics_num">{{topicInfo.postList[0].likeNum}}</li>
        <li class="post_statistics_text">赞同</li>
      </ul>
      <ul>
        <li class="post_statistics_num">{{topicInfo.postList.length}}</li>
        <li class="post_statistics_text">帖子</li>
      </ul>
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
/* 头像样式 */
.nav-avatar {
  text-align: center;
  margin: 5px 0 0 0;
}

/* 帖子模块整体样式 */
.topic-item {
  margin: 10px 0 10px 0;

  border-radius: 35px;
  width: 935px;
  height: 70px;
}
.topic-item:hover {
  background: rgba(0, 0, 0, 0.1);
}

/* 帖子标题样式 */
.post_portrait {
  display: inline-block;
  margin: 8px 0 0 0;
  color: #00a4ff;
  font-size: 25px;
}
.post_portrait:hover {
  color: #0289d1;
}

/* 帖子详情信息模块 */
.post_details {
  width: 470px;
  height: 25px;
  line-height: 25px;
}
.post_details_public {
  display: inline-block;
  border-radius: 10px;
  height: 20px;

  line-height: 20px;
  font-size: 14px;
  text-align: center;
}
.post_plate {
  width: 50px;
  background-color: #00a4ff;
}
.post_time {
  margin: 0 0 0 40px;
  width: 200px;
  background: rgba(134, 134, 134, 0.2);
}

/*帖子统计信息模块 */
.post_statistics {
  padding: 10px 0;
  height: 70px;
}
.post_statistics ul {
  float: right;

  margin: 0 60px 0 0;
  text-align: center;
}
.post_statistics_num {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 22px;
}
.post_statistics_text {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  color: #868686;
}
</style>
