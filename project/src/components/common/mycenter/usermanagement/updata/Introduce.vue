<template>
  <div class="introduce">
    <h2>介绍设置</h2>
    <div class="user_introduce">
      <div class="user_img">
        <base-64 @base64="user_img"></base-64>
      </div>
      <div class="name">
        <p>姓名：</p>
        <input type="text" v-model="introduce_data.nickname" />
      </div>
      <div class="school">
        <p>学校：</p>
        <input type="text" v-model="introduce_data.school" />
      </div>
      <div class="Professional">
        <p>专业：</p>
        <input type="text" v-model="introduce_data.Professional" />
      </div>
      <div class="constellation">
        <p>星座：</p>
        <input type="text" v-model="introduce_data.constellation" />
      </div>
      <div class="evaluation">
        <p>自我评价：</p>
        <br />
        <textarea v-model="introduce_data.evaluation"></textarea>
      </div>
      <button @click="register">提交</button>
    </div>
  </div>
</template>

<script>
import axios from "@/components/network/request";
import Base64 from "@/components/http/Base64";
export default {
  name: "Introduce",
  components: { Base64 },
  data() {
    return {
      introduce_data: { user_pic: "", u_id: "" },
    };
  },
  methods: {
    user_img(v) {
      this.introduce_data.user_pic = v;
    },

    register() {
      const { introduce_data } = this;
      axios({
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user")).token,
        },
        url: "http://127.0.0.1:3007/my/introduce/newdata",
        data: introduce_data,
      }).then((res) => {
        // console.log(res, "res");
        alert(res.message);
      });
    },
  },
  mounted() {
    this.$bus.$on("userinfo", (value) => {
      this.introduce_data.u_id = value.id;
    });
  },
};
</script>

<style scoped>
.introduce {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type="text"] {
  background: none;
  border-style: none;
  border-bottom: 1px #fff solid;
  padding: 5px 10px;
  width: 150px;
}

input:focus {
  outline: none;
}

textarea {
  background: none;
  border: 1px #fff solid;
  padding: 10px;
  min-width: 200px;
  max-width: 200px;
}

textarea:focus {
  outline: none;
}

.introduce h2 {
  padding: 20px 0;
}

.user_introduce div {
  display: flex;
  margin: 20px auto;
  margin-top: 0;
}

.user_introduce p {
  border-bottom: 1px #fff solid;
  padding-bottom: 10px;
}
.evaluation {
  display: block !important;
}

.evaluation p {
  border: none;
}

button {
  border-radius: 5px;
  border-style: none;
  padding: 5px 10px;
  background-color: #01c0ff;
  width: 75px;
}

button:active {
  transform: scale(0.9);
}

.user_img {
  width: 100px;
  height: 100px;
}

.user_img >>> .base64 {
  border-radius: 50%;
  overflow: hidden;
}
</style>