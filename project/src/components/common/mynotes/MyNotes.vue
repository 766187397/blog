<template>
  <div class="notes">
    <div class="notes_content">
      <notes-search
        @active="Active"
        @art_con="Art_con"
        :get="get"
      ></notes-search>
      <notes-content :articledata="postsdata"></notes-content>
    </div>
    <page
      @Pageitem="NewPage"
      :PageNum="data.PageNum"
      :currentPage="data.currentPage"
      :get="get"
    ></page>
  </div>
</template>

<script>
import NotesContent from "@/components/common/mynotes/notescontent/NotesContent.vue";
import NotesSearch from "@/components/common/mynotes/notescontent/NotesSearch.vue";
import Page from "@/components/independence/Page";
import axios from "@/components/network/request";

export default {
  name: "MyNotes",
  components: { NotesContent, NotesSearch, Page },
  data() {
    return {
      postsdata: [],
      active: "最新",
      art_con: [],
      data: {
        PageNum: 1, //总页数
        currentPage: 1, //当前页码
      },
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      const currentPage = this.data.currentPage - 1;
      if (this.active == "最新") {
        this.active = "";
      }
      if (this.$route.query.id || localStorage.getItem("userInfo")) {
        var id =
          this.$route.query.id ||
          JSON.parse(localStorage.getItem("userInfo")).data.id;
        var url = `http://127.0.0.1:3007/api/recentPosts/getrecentPosts?u_id=${id}&currentPage=${currentPage}&active=${this.active}&searchdata=${this.art_con}`;
      } else {
        var url = `http://127.0.0.1:3007/api/recentPosts/getrecentPosts?currentPage=${currentPage}&active=${this.active}&searchdata=${this.art_con}`;
      }
      axios({
        method: "get",
        url: url,
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
    },

    Active(v) {
      this.active = v;
    },

    Art_con(v) {
      this.art_con = v;
    },
  },
};
</script>

<style scoped>
.notes_content {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
}
@media (max-width: 720px) {
  .notes_content {
    display: block;
  }
}
</style>