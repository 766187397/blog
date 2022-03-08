<template>
  <div class="release">
    <form>
      <div class="title">
        <h2>标题</h2>
        <input
          type="text"
          placeholder="写一个吸引人的标题吧！"
          v-model="pub_art.title"
        />
      </div>
      <div class="art_introduced">
        <h2>内容介绍</h2>
        <div class="pres">
          <input
            type="text"
            placeholder="写一个吸引人的介绍吧！"
            v-model="pub_art.pres"
          />
        </div>
      </div>
      <div class="cover">
        <h2>封面图片</h2>
        <div class="cover_img">
          <base-64 :img="pub_art.cover_img" @base64="cover_img"></base-64>
        </div>
      </div>
      <div class="classify">
        <h2>分类</h2>
        <div class="classify_item">
          <label v-for="(item, index) in classify" :key="index" :for="item">
            <input
              type="radio"
              v-model="pub_art.classify"
              :id="item"
              :value="item"
            />
            <span>{{ item }}</span>
          </label>
        </div>
      </div>
      <div class="art_con">
        <h2>内容</h2>
        <quill-editor
          :con="pub_art.art_con"
          @quillEditor="mycontent"
        ></quill-editor>
      </div>
      <div class="submit" @click="register">提交</div>
    </form>
  </div>
</template>

<script>
import QuillEditor from "@/components/independence/QuillEditor";
import Base64 from "@/components/http/Base64";
import axios from "@/components/network/request";

export default {
  name: "Release",
  components: { QuillEditor, Base64 },
  data() {
    return {
      classify: ["html", "css", "js", "mysql", "php", "vue", "node", "小程序"],
      pub_art: {
        cover_img: "",
        art_con: "",
        u_id: JSON.parse(localStorage.getItem("userInfo")).data.id,
      },
    };
  },
  methods: {
    // 当前时间
    addDate() {
      let nowDate = new Date();
      let date = {
        // 年月日
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
        // 时分秒
        hh: new Date().getHours(),
        mf:
          new Date().getMinutes() < 10
            ? "0" + new Date().getMinutes()
            : new Date().getMinutes(),
        ss:
          new Date().getSeconds() < 10
            ? "0" + new Date().getSeconds()
            : new Date().getSeconds(),
      };
      this.pub_art.releasetime = `${date.year}-${date.month}-${date.date} ${date.hh}:${date.mf}:${date.ss}`;
      // console.log(this.pub_art.releasetime);
    },
    cover_img(v) {
      this.pub_art.cover_img = v;
    },
    mycontent(value) {
      this.pub_art.art_con = value;
    },
    // 提交
    register() {
      // 获取时间
      this.addDate();
      const { pub_art } = this;
      axios({
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).token,
        },
        url: "http://127.0.0.1:3007/my/article/addarticle",
        data: pub_art,
      }).then((res) => {
        console.log(res);
        if (res.status === 0) {
          alert(res.message);
          this.pub_art = {
            cover_img: "",
            art_con: "",
            u_id: JSON.parse(localStorage.getItem("userInfo")).data.id,
          };
          this.$router.push({ path: "/release", query: "" });
        } else {
          alert(res.message);
        }
      });
    },
  },
  mounted() {
    // 获取用户id和昵称
    this.pub_art.u_id = JSON.parse(localStorage.getItem("userInfo")).data.id;
    this.pub_art.username = JSON.parse(
      localStorage.getItem("userInfo")
    ).data.username;
    // 获取携带的id
    if (this.$route.query.id) {
      // 获取文章信息
      axios({
        method: "get",
        url:
          "http://127.0.0.1:3007/my/article/getarticle?id=" +
          this.$route.query.id,
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).token,
        },
      }).then((res) => {
        this.pub_art = res.data[0];
      });
    }
  },
};
</script>

<style scoped>
.user_pic {
  width: 100px;
  height: 100px;
  margin-left: 70px;
  /* margin: 0 auto; */
}

.user_pic img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

input[type="text"] {
  background: none;
  border: 1px#fff solid;
  padding: 5px 10px;
  color: #fff;
}

input[type="text"]:focus {
  outline: none;
}

form div h2 {
  margin: 20px 0;
}

.classify_item {
  display: flex;
  flex-wrap: wrap;
}

.classify_item span {
  padding-left: 5px;
}

.classify_item span:hover {
  cursor: pointer;
}

label {
  margin: 0 10px;
}

.submit {
  width: 35px;
  border-style: none;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: #03a9f4;
}

.submit:hover {
  cursor: pointer;
}

.submit:active {
  transform: scale(0.95);
}

.cover_img {
  width: 200px;
  height: 100px;
}
</style>