<template>
  <div class="work">
    <h2>掌握技能</h2>
    <br />
    <div class="work_img" v-for="(item, index) in add" :key="index">
      <div class="text">
        <p>第{{ index + 1 }}张图片的名称</p>
        <input type="text" v-model="work[index].title" />
      </div>
      <!-- <input type="text" v-model="work[index].img" /> -->
      <div class="img">
        <p>第{{ index + 1 }}张图片</p>
        <div class="img_item"><base-64 @base64="user_img"></base-64></div>
      </div>
    </div>
    <br />
    <button @click="addwork">添加</button>
    <button @click="register">提交</button>
  </div>
</template>

<script>
import axios from "@/components/network/request";
import Base64 from "@/components/http/Base64";
export default {
  name: "Work",
  components: { Base64 },
  data() {
    return {
      add: 1,
      title: "",
      work: [
        {
          title: "",
          img: "",
        },
      ],
    };
  },
  methods: {
    user_img(v) {
      this.work[this.add - 1].img = v;
    },

    addwork() {
      if (this.add < 12) {
        if (this.work[this.add - 1].img && this.work[this.add - 1].title) {
          this.add++;
          this.work.push({
            title: "",
            img: "",
            u_id: JSON.parse(localStorage.getItem("userInfo")).data.id,
          });
        } else {
          alert("请添加名称或图片！");
        }
      } else {
        alert("最多选择12张图片");
      }
    },
    register() {
      if (
        this.work[this.add - 1].img != "" &&
        this.work[this.add - 1].title != ""
      ) {
        const { work } = this;
        axios({
          method: "POST",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
          url: "http://127.0.0.1:3007/my/PhotoWork/postPhotoWork",
          data: work,
        }).then((res) => {
          // console.log(res, "res");
          alert(res.message);
        });
      } else {
        alert("图片和名称不能为空");
      }
    },
  },
  mounted() {
    if (localStorage.getItem("userInfo")) {
      this.work[this.add - 1].title = this.title;
      this.work[this.add - 1].u_id = JSON.parse(
        localStorage.getItem("userInfo")
      ).data.id;
    }
  },
};
</script>

<style scoped>
.work {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.work h2 {
  margin: 20px 0;
}

.work > span,
.work > button {
  text-align: center;
  margin: 10px 9px;
  display: inline-block;
  width: 122px;
}

.work > button {
  border-style: none;
  padding: 5px 0;
  border-radius: 8px;
  background-color: #01c0ff;
}

.work > button:active {
  transform: scale(0.9);
}

input {
  margin: 10px 9px;
  width: 180px;
  background: none;
  border: 1px #fff solid;
  padding: 5px 10px;
}

.img_item {
  width: 200px;
  height: 120px;
  padding: 10px;
}
</style>