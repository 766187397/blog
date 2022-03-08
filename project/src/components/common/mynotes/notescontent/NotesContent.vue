<template>
  <div class="notescontent">
    <div v-if="article.length != 0">
      <div class="notesCenter" v-for="(item, index) in article" :key="index">
        <h1>{{ item.title }}</h1>
        <div class="center">
          <div v-if="item.cover_img" class="articleimg">
            <img
              :src="item.cover_img"
              title="点击查看详细文章"
              @click="sendNotesId(item.id)"
            />
          </div>
          <div class="articlecenter">
            <p title="点击查看详细文章" @click="sendNotesId(item.id)">
              {{ item.pres }}
            </p>
          </div>
        </div>
        <div class="operation">
          <p>
            <span @click="user_id(item.u_id)" title="点击查询作者"
              >作者：{{ item.username }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <div class="null" v-else>
      <h1>没有这一类的内容！</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotesContent",
  props: {
    articledata: [],
  },
  data() {
    return {
      article: [],
    };
  },
  methods: {
    sendNotesId(id) {
      // 切换路由 查看文章详细信息
      var path = this.$route.path;
      this.$router.push({ name: "notesItem", query: { id, path } });
    },
    user_id(id) {
      // 切换路由 查看用户详细信息
      this.$router.push({ path: "/introduce", query: { id } });
    },
  },
  watch: {
    articledata: function (v) {
      this.article = v;
    },
  },
};
</script>

<style scoped>
.notescontent {
  flex: 3;
  overflow: hidden;
}

.notesCenter {
  border-top: #ccc 1px solid;
  margin: 30px 0;
}

.notesCenter:hover {
  cursor: pointer;
  transform: scale(1.01);
}

.notesCenter > h1 {
  font-size: 1.3em;
  padding: 0;
  margin: 10px;
}
.center {
  display: flex;
}
.articleimg {
  flex: 1;
  padding: 10px;
}
.articleimg img {
  width: 100%;
}

.articlecenter {
  flex: 3;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
}

.articlecenter p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.operation {
  padding: 10px;
  padding-top: 0;
  display: flex;
  align-items: center;
}

.operation > p {
  display: flex;
  align-items: center;
  margin-right: 20px;
  /* 文字不换行 */
  white-space: nowrap;
}
.operation > p > img {
  width: 20px;
  margin-right: 5px;
}

.operation > p > span {
  padding: 8px;
}

.null h1 {
  text-align: center;
  margin: 30vh 0;
}

@media (max-width: 720px) {
  .null h1 {
    text-align: center;
    margin: 0;
  }
}
</style>