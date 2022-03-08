<template>
  <div class="notescontent">
    <h2>猜你喜欢</h2>
    <div class="change">
      <span @click="change">换一换</span>
    </div>
    <div class="guess">
      <div class="notesCenter" v-for="(item, index) in article" :key="index">
        <h1>{{ item.title }}</h1>
        <div class="center" :class="{ even: index % 2 == 0 }">
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
            <span @click="user_id(item.u_id)">作者：{{ item.username }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/components/network/request";
export default {
  name: "Recommended",
  data() {
    return {
      PageNum: "",
      currentPage: 0,
      article: [
        {
          id: 1,
          title: "node",
          cover_img: "",
          pres: "简单的说 Node.js 就是运行在服务端的 JavaScript。Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。",
          username: "",
        },
      ],
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

    get() {
      axios({
        method: "get",
        url: `http://127.0.0.1:3007/api/recentPosts/getrecentPosts?&currentPage=${this.currentPage}`,
      }).then((res) => {
        this.article = res.data[0];
        this.PageNum =
          res.data[1][0].sunPage % 10 == 0
            ? Math.floor(res.data[1][0].sunPage / 10)
            : Math.ceil(res.data[1][0].sunPage / 10);
      });
    },

    change() {
      // 随机数不相等则查询  确保每一次换页
      var i = true;
      while (i) {
        if (this.currentPage != Math.floor(Math.random() * this.PageNum)) {
          this.currentPage = Math.floor(Math.random() * this.PageNum);
          i = false;
          this.get();
        }
      }
    },
  },
  mounted() {
    this.get();
  },
};
</script>

<style scoped>
.notescontent {
  padding: 10vh 10vw;
  overflow: hidden;
}

.notescontent h2 {
  text-align: center;
}

.change {
  padding-right: 20px;
  line-height: 50px;
  text-align: right;
  color: #eee;
  /* 设置文字不可选择 ↓ 使用按钮更丝滑 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.change span:hover {
  cursor: pointer;
  color: #4fc08d;
}

.notesCenter {
  margin-bottom: 10px;
}

.notesCenter:hover {
  cursor: pointer;
  transform: scale(1.01);
}

.notesCenter > h1 {
  font-size: 2em;
  padding: 0;
  margin: 10px;
}

.center {
  display: flex;
}

.articleimg {
  flex: 1;
  padding: 10px;
  max-width: 300px;
  min-width: 100px;
}
.articleimg img {
  width: 100%;
}

.articlecenter {
  padding: 10px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.articlecenter p {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.operation {
  padding: 10px;
  padding-top: 0;
}

.operation > p {
  margin-right: 20px;
  /* 文字不换行 */
  white-space: nowrap;
}
.operation > p > img {
  width: 20px;
  margin-right: 5px;
}

.even {
  flex-direction: row-reverse;
}

@media (max-width: 720px) {
  .notesCenter h1 {
    text-align: center;
  }
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>