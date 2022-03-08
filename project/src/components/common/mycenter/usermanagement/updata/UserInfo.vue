<template>
  <div class="account">
    <h2>账号设置</h2>
    <div class="form">
      <div class="user_img">
        <base-64 @base64="user_img"></base-64>
      </div>
      <div class="userinfo">
        <div class="nickname">
          <p>昵称：</p>
          <input type="text" v-model="userInfo.nickname" />
        </div>
        <div class="email">
          <p>邮箱：</p>
          <input type="text" v-model="userInfo.email" />
        </div>
      </div>
      <button @click="register">提交</button>
    </div>
    <div class="form">
      <h2>重置密码</h2>
      <div class="userinfo">
        <div class="password">
          <p>旧密码：</p>
          <input type="password" v-model="password.oldPwd" />
        </div>
        <div class="password">
          <p>新密码：</p>
          <input type="password" v-model="password.newPwd" />
        </div>
      </div>
      <button @click="newPwd">提交</button>
    </div>
  </div>
</template>

<script>
import Base64 from "@/components/http/Base64";
import axios from "@/components/network/request";

export default {
  name: "UserInfo",
  components: { Base64 },
  data() {
    return {
      userInfo: {},
      password: {},
    };
  },
  methods: {
    user_img(v) {
      this.userInfo.user_pic = v;
    },
    // 修改用户基本信息
    register() {
      // 昵称 字母数字下划线 1~16位
      const nickname_verify = /\w{4,16}/;
      // 邮箱
      const email_verify = /$|(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
      if (!nickname_verify.test(this.userInfo.nickname)) {
        alert(`昵称错误！请检查昵称！字母数字下划线 1~16位`);
      } else if (!email_verify.test(this.userInfo.email)) {
        alert(`邮箱错误！请检查邮箱！`);
      } else {
        const { userInfo } = this;
        axios({
          method: "POST",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
          url: "http://127.0.0.1:3007/my/userinfo",
          data: userInfo,
        }).then((res) => {
          alert(res.message);
        });
      }
    },
    // 修改密码
    newPwd() {
      // 密码 不能有空格 字母数字下划线 4~16位
      const password_verify = /\S\w{4,16}/;
      if (
        !password_verify.test(this.password.oldPwd) ||
        this.password.oldPwd == ""
      ) {
        alert("旧密码不能为空！不能有空格 字母数字下划线 4~16位!");
      } else if (
        !password_verify.test(this.password.newPwd) ||
        this.password.newPwd == ""
      ) {
        alert("新密码不能为空！不能有空格 字母数字下划线 4~16位!");
      } else if (this.password.oldPwd == this.password.newPwd) {
        alert("两个密码不能相同！");
      } else {
        const { password } = this;
        axios({
          method: "POST",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
          url: "http://127.0.0.1:3007/my/updatepwd",
          data: password,
        }).then((res) => {
          // console.log(res);
          alert(res.message);
          // 切换路由
          if (res.status === 0) {
            this.$router.push({ name: "login", query: "" });
          }
        });
      }
    },
  },
  mounted() {
    if (localStorage.getItem("userInfo")) {
      this.userInfo.id = JSON.parse(localStorage.getItem("userInfo")).data.id;
      this.userInfo.user_pic = JSON.parse(
        localStorage.getItem("userInfo")
      ).data.user_pic;
    }
  },
};
</script>

<style scoped>
input[type="password"],
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

.userinfo div {
  display: flex;
  margin: 20px 0;
}

.userinfo div input {
  margin-right: 5px;
}
.userinfo div span:active {
  transform: scale(0.9);
}

.account {
  flex: 1;
  min-width: 230px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.account h2 {
  margin: 20px 0;
}

.account p {
  border-bottom: 1px #fff solid;
  padding-bottom: 10px;
}

.user_img {
  margin: 0 auto;
  width: 100px;
  height: 100px;
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

.user_img >>> .base64 {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
</style>