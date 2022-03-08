<template>
  <nav-bar>
    <tab-bar path="/home">首页</tab-bar>
    <tab-bar v-if="loginstatus" path="/introduce">用户介绍</tab-bar>
    <tab-bar path="/notes">最新文章</tab-bar>
    <template v-if="!loginstatus">
      <tab-bar path="/login">登录</tab-bar>
      <tab-bar path="/registered">注册</tab-bar>
    </template>
    <template v-else>
      <tab-bar path="/center">个人中心</tab-bar>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from "./navbar/NavBar.vue";
import TabBar from "./navbar/TabBar.vue";

export default {
  name: "MyNav",
  data() {
    return {
      loginstatus: false,
    };
  },
  components: {
    NavBar,
    TabBar,
  },
  mounted() {
    this.loginstatus = Boolean(localStorage.getItem("user"));
    this.$bus.$on("login", (value) => {
      this.loginstatus = value;
    });
    this.$bus.$on("logout", (value) => {
      this.loginstatus = value;
    });
  },
};
</script>

<style lang="less" scoped>
</style>