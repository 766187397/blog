<template>
  <div class="login">
    <div class="form">
      <div>
        <p>用户名：</p>
        <input type="text" v-model="userInfo.username" />
      </div>
      <div>
        <p>密码：</p>
        <input type="password" v-model="userInfo.password" />
      </div>
      <div>
        <button @click="toLogin">登录</button>
      </div>
      <router-link class="registered" to="/registered"
        >还没有账号？点击注册</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "@/components/network/request";
export default {
  name: "MyLogin",
  data() {
    return {
      userInfo: {},
      userdata: Object,
      loginstatus: {
        type: Boolean,
        default: false,
      },
    };
  },
  methods: {
    toLogin() {
      // 账号 不能有空格 字母数字 1~20位
      const username_verify = /\S[a-zA-Z0-9]{1,20}/;
      // 密码 不能有空格 字母数字下划线 4~16位
      const password_verify = /\S\w{4,16}/;
      if (
        !username_verify.test(this.userInfo.username) ||
        this.userInfo.username == ""
      ) {
        alert(`账号错误！请检查账号！账号1~20位且只能为字母数字不能有空格`);
      } else if (
        !password_verify.test(this.userInfo.password) ||
        this.userInfo.username == ""
      ) {
        alert(
          `密码错误！请检查密码！密码4~16位且只能为字母数字下划线不能有空格`
        );
      } else {
        const _this = this;
        const { userInfo } = this;
        // 登录
        axios({
          method: "POST",
          url: "http://127.0.0.1:3007/api/login",
          data: userInfo,
        }).then((res) => {
          // 判断是否登录成功
          if (res.status == 0) {
            // 将登录的信息存储到localStorage---->user
            localStorage.setItem("user", JSON.stringify(res));
            // 切换路由
            this.$router.push({ name: "center", query: "" });
            //
          } else {
            alert("登录失败，请检查账号密码是否正确");
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.login .form {
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

.login .form div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.login .form div p {
  flex: 1;
}

.login .form div input {
  flex: 3;
  background: none;
  outline-style: none;
  border: 1px solid #ccc;
  padding: 5px 8px;
}

.login .form div button {
  width: 90%;
  height: 30px;
  margin: 0 auto;
  border-radius: 10px;
  background: none;
  border: 1px solid #ccc;
}

.login .form div button:hover {
  background-image: linear-gradient(to bottom right, #e69d9d, #cb78fa);
}

.registered {
  text-align: right;
  color: #225592;
  font-size: 12px;
  text-decoration: underline;
}
</style>