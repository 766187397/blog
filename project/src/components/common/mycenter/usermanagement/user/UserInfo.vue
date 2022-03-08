<template>
  <div class="userinfo">
    <div class="user_pic">
      <img :src="user.user_pic" alt="" />
    </div>
    <div class="info">
      <h1>
        用户名：<span>{{ user.username }}</span>
      </h1>
      <p>
        昵称：<span>{{ user.nickname }}</span>
      </p>
      <p>
        邮箱：<span>{{ user.email }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "@/components/network/request";
export default {
  name: "UserInfo",
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    // 获取用户信息
    axios({
      method: "get",
      url: "http://127.0.0.1:3007/my/userinfo",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      },
    }).then((res) => {
      if (res.status == 0) {
        // 将用户信息存储到浏览器
        localStorage.setItem("userInfo", JSON.stringify(res));
        this.user = res.data;
        // 改变导航栏状态
        this.$bus.$emit("login", true);
        // 发送个人信息到数据总线
        this.$bus.$emit("userinfo", this.user);
      } else {
        // token 超时提醒重新登录并清除用户基本信息
        alert("身份验证失败请重新登录");
        localStorage.setItem("user", "");
        localStorage.setItem("userInfo", "");
        // 改变导航栏状态
        this.$bus.$emit("logout", false);
        // 切换路由
        this.$router.push({ name: "login", query: "" });
      }
    });
  },
};
</script>

<style scoped>
.userinfo {
  max-width: 400px;
  flex: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  min-width: 200px;
  margin-right: 10px;
  margin-bottom: 30px;
  border-radius: 20px;
  padding: 15px;
  background-color: #68c8ff;
}

.userinfo:hover {
  transform: scale(1.01);
  cursor: pointer;
}

.user_pic {
  border-radius: 50%;
}

.user_pic img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.info {
  padding-left: 20px;
  padding-top: 10px;
}

.info h1 {
  margin: 0;
  margin-bottom: 10px;
}
.info * {
  margin-bottom: 10px;
}
</style>