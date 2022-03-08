<template>
  <div class="posts">
    <table>
      <tr>
        <th>ID</th>
        <th>分类</th>
        <th>标题</th>
        <th>介绍</th>
        <th>操作</th>
      </tr>
      <tr class="postsdata" v-for="(item, index) in postsdata" :key="index">
        <td class="id">{{ item.id }}</td>
        <td class="classify">{{ item.classify }}</td>
        <td class="title">{{ item.title }}</td>
        <td class="pres">{{ item.pres }}</td>
        <td class="operation">
          <span @click="deleteArt(item.id)">删除</span>
          <span @click="sendNotesId(item.id)">修改</span>
        </td>
      </tr>
    </table>
    <page
      @Pageitem="NewPage"
      :PageNum="data.PageNum"
      :currentPage="data.currentPage"
      :get="get"
    ></page>
  </div>
</template>

<script>
import Page from "@/components/independence/Page";
import axios from "@/components/network/request";
export default {
  name: "Posts",
  components: {
    Page,
  },
  data() {
    return {
      postsdata: [],
      data: {
        PageNum: 6, //总页数
        currentPage: 1, //当前页码
      },
    };
  },
  methods: {
    get() {
      const id = JSON.parse(localStorage.getItem("userInfo")).data.id;
      const currentPage = this.data.currentPage - 1;
      axios({
        method: "get",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).token,
        },
        url:
          "http://127.0.0.1:3007/my/article/getarticle?u_id=" +
          id +
          "&currentPage=" +
          currentPage,
      }).then((res) => {
        this.postsdata = res.data[0];
        this.data.PageNum =
          res.data[1][0].sunPage % 10 == 0
            ? Math.floor(res.data[1][0].sunPage / 10)
            : Math.ceil(res.data[1][0].sunPage / 10);
      });
    },

    NewPage(v) {
      this.data.currentPage = v;
      // console.log(this.data.currentPage);
    },
    // 携带id跳转
    sendNotesId(id) {
      this.$router.push({ path: "release", query: { id } });
    },
    // 删除
    deleteArt(id) {
      axios({
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).token,
        },
        url: "http://127.0.0.1:3007/my/article/deletearticle",
        data: { id },
      }).then((res) => {
        alert(res.message);
        this.get();
      });
    },
  },
  mounted() {
    this.get();
  },
};
</script>

<style scoped>
table {
  width: 100%;
}

.postsdata td {
  min-width: 50px;
  max-width: 30vw;
  padding: 10px 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.postsdata td span {
  color: #4fc08d;
  cursor: pointer;
  padding: 0 2px;
}

.postsdata td span:active {
  color: #03a9f4;
}

.title {
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.art_con {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.operation {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>