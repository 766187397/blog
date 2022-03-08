<template>
  <div class="photo_wall">
    <h2>照片墙</h2>
    <div class="photo" v-for="(item, index) in add" :key="index">
      <p>第{{ index + 1 }}张：</p>
      <!-- <input type="text" v-model="photo_wall[index]" /> -->
      <div class="img_photo"><base-64 @base64="user_img"></base-64></div>
    </div>
    <br />
    <button @click="photoadd">添加</button>
    <button @click="register">提交</button>
  </div>
</template>

<script>
import axios from "@/components/network/request";
import Base64 from "@/components/http/Base64";
export default {
  name: "PhotoWall",
  components: { Base64 },
  data() {
    return {
      add: 1,
      photo_wall: [{ img: "", u_id: 0 }],
    };
  },
  methods: {
    user_img(v) {
      this.photo_wall[this.add - 1].img = v;
    },

    photoadd() {
      if (this.add < 12) {
        if (this.photo_wall[this.add - 1].img) {
          this.add++;
          this.photo_wall.push({
            img: "",
            u_id: JSON.parse(localStorage.getItem("userInfo")).data.id,
          });
        } else {
          alert("请添加图片！");
        }
      } else {
        alert("最多选择12张图片");
      }
    },
    register() {
      if (this.photo_wall[this.add - 1].img != "") {
        const { photo_wall } = this;
        axios({
          method: "POST",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
          url: "http://127.0.0.1:3007/my/PhotoWork/postPhotoWork",
          data: photo_wall,
        }).then((res) => {
          // console.log(res, "res");
          alert(res.message);
        });
      } else {
        alert("图片不能为空");
      }
    },
  },
  mounted() {
    if (localStorage.getItem("userInfo")) {
      this.photo_wall[this.add - 1].u_id = JSON.parse(
        localStorage.getItem("userInfo")
      ).data.id;
    }
  },
};
</script>

<style scoped>
.photo_wall {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo_wall h2 {
  margin: 20px 0;
}

.photo_wall > span,
.photo_wall > button {
  text-align: center;
  margin: 10px 9px;
  display: inline-block;
  width: 280px;
}

.photo_wall > button {
  border-style: none;
  padding: 5px 0;
  border-radius: 8px;
  background-color: #01c0ff;
}

.photo_wall > button:active {
  transform: scale(0.9);
}

.photo {
  margin-bottom: 15px;
}

.photo > p {
  margin-bottom: 10px;
}

.img_photo {
  padding: 10px;
  width: 200px;
  height: 125px;
}
</style>