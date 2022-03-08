<template>
  <div class="notesItem">
    <div class="ret" @click="ret" title="返回">&lt;</div>
    <div class="notescontent">
      <h1>{{ notesItemcontent.title }}</h1>
      <div class="label">
        <p>作者：{{ notesItemcontent.username }}</p>
        <p>发布时间：{{ notesItemcontent.releasetime }}</p>
        <p>分类标签：{{ notesItemcontent.classify }}</p>
      </div>
      <div class="text" v-html="notesItemcontent.art_con"></div>
      <div class="operation">
        <p>
          <span>作者：{{ notesItemcontent.username }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/components/network/request";
export default {
  name: "MyNotesItem",
  data() {
    return {
      notesItemcontent: [],
    };
  },
  methods: {
    ret() {
      const path = this.$route.query.path;
      this.$router.push({ path: path, query: "" });
    },
    get() {
      const id = this.$route.query.id;
      axios({
        method: "get",
        url: "http://127.0.0.1:3007/api/recentPosts/getrecentPosts?id=" + id,
      }).then((res) => {
        this.notesItemcontent = res.data[0];
      });
    },
  },
  mounted() {
    this.get();
  },
  updated() {
    // 通过js改变富文本的所有样式
    const all = document.querySelectorAll(".notescontent .text *");
    for (let i = 0; i < all.length; i++) {
      all[i].style.maxWidth = "100%";
      all[i].style.lineHeight = "25px";
      all[i].style.color = "#000";
      all[i].style.overflowX = "auto";
      all[i].style.overflowY = "hidden";
    }
    // 通过js改变富文本的a标签样式
    const a = document.querySelectorAll(".notescontent .text a");
    for (let i = 0; i < a.length; i++) {
      a[i].style.color = "#7ad5f7";
    }
    // 通过js改变富文本的h1标签样式
    const h1 = document.querySelectorAll(".notescontent .text h1");
    for (let i = 0; i < h1.length; i++) {
      h1[i].style.lineHeight = "40px";
    }
    // 通过js改变富文本的h2标签样式
    const h2 = document.querySelectorAll(".notescontent .text h2");
    for (let i = 0; i < h2.length; i++) {
      h2[i].style.lineHeight = "35px";
      h2[i].style.margin = "10px 0";
    }
    // 通过js改变富文本的h3标签样式
    const h3 = document.querySelectorAll(".notescontent .text h2");
    for (let i = 0; i < h3.length; i++) {
      h3[i].style.lineHeight = "32px";
    }
  },
};
</script>

<style scoped>
.notesItem * {
  color: #000;
}

.ret {
  width: 35px;
  position: fixed;
  top: 9vh;
  z-index: 99999999;
  font-size: 30px;
  color: #7ad5f7;
}

.ret:hover {
  cursor: pointer;
}

.notescontent {
  padding: 10px;
  background-color: #fff;
}

.label {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #f6f6f6;
}

.label > p {
  padding: 10px;
}

.label p:nth-child(2),
.label p:nth-child(3) {
  color: #c4cedc;
}

.text {
  padding: 50px 10px;
}

.operation {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.operation > p {
  padding: 10px;
  display: flex;
  align-items: center;
  /* 文字不换行 */
  white-space: nowrap;
}
.operation > p > img {
  width: 20px;
  margin-right: 5px;
}
</style>