<template>
  <div class="registered">
    <div class="form">
      <div>
        <p>头像：</p>
        <div class="user_img">
          <base-64
            @base64="user_img"
            @base64_img_name="user_img_name"
            old_img="选择用户图像"
          ></base-64>
          <p class="user_img_name">{{ user_pic_name }}</p>
        </div>
      </div>
      <div>
        <p>昵称：</p>
        <input type="text" v-model="userInfo.nickname" />
      </div>
      <div>
        <p>用户名：</p>
        <input type="text" v-model="userInfo.username" />
      </div>
      <div>
        <p>密码：</p>
        <input type="password" v-model="userInfo.password" />
      </div>
      <div>
        <p>邮箱</p>
        <input type="text" v-model="userInfo.email" />
      </div>
      <div>
        <button @click="register">注册</button>
      </div>
      <router-link class="login-a" to="/login"
        >已经有账号了，点击登录</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "@/components/network/request";
import Base64 from "@/components/http/Base64";
export default {
  name: "MyRegistered",
  components: { Base64 },
  data() {
    return {
      user_pic_name: "",
      userInfo: { user_pic: "" },
      email: "",
    };
  },
  methods: {
    register() {
      // 账号（用户名） 不能有空格 字母数字 1~20位
      const username_verify = /\S[a-zA-Z0-9]{1,20}/;
      // 密码 不能有空格 字母数字下划线 4~16位
      const password_verify = /\S\w{4,16}/;
      // 昵称 字母数字下划线 1~16位
      const nickname_verify = /\w{4,16}/;
      // 邮箱
      const email_verify = /$|(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
      if (
        !username_verify.test(this.userInfo.username) ||
        this.userInfo.username == ""
      ) {
        alert(`账号错误！请检查账号！账号1~20位且只能为字母数字不能有空格`);
      } else if (
        !password_verify.test(this.userInfo.password) ||
        this.userInfo.password == ""
      ) {
        alert(`密码错误！请检查密码！密码4~16位位且只能为字母数字下划线不能有空格`);
      } else if (!nickname_verify.test(this.userInfo.nickname)) {
        alert(`昵称错误！请检查昵称！字母数字下划线 1~16位`);
      } else if (!email_verify.test(this.userInfo.email)) {
        alert(`邮箱错误！请检查邮箱！`);
      } else {
        const { userInfo } = this;
        axios({
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          url: "http://127.0.0.1:3007/api/reguser",
          data: userInfo,
        }).then((res) => {
          // console.log(res, "res");
          alert(res.message);
        });
      }
    },

    user_img(v) {
      this.userInfo.user_pic = v;
    },
    user_img_name(v) {
      this.user_pic_name = v;
    },
  },
};
</script>

<style scoped>
.registered .form {
  width: 25%;
  min-width: 280px;
  margin: 0 auto;
  margin-top: 10vh;
  padding: 50px 20px;
  border-radius: 10px;
  background-image: linear-gradient(to bottom left, #e69d9d, #cb78fa);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.registered .form div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}

.registered .form div p {
  flex: 3;
}

.registered .form div input {
  flex: 5;
  background: none;
  outline-style: none;
  border: 1px solid #ccc;
  padding: 5px 8px;
}

.registered .form div button {
  width: 90%;
  height: 30px;
  margin: 0 auto;
  border-radius: 10px;
  background: none;
  border: 1px solid #ccc;
}

.registered .form div button:hover {
  background-image: linear-gradient(to bottom right, #e69d9d, #cb78fa);
}

.login-a {
  text-align: right;
  color: #225592;
  font-size: 12px;
  text-decoration: underline;
}

.user_img {
  flex: 7;
}

.user_img >>> .base64 {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.user_img {
  flex-wrap: wrap;
}

.user_img_name {
  min-width: 196px;
  text-align: center;
}
</style>