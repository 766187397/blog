<template>
  <div id="app">
    <!-- 导航 -->
    <my-nav></my-nav>
    <!-- 内容 -->
    <div class="content">
      <transition name="slide-left" mode="out-in">
        <router-view />
      </transition>
    </div>
    <!-- 页脚 -->
    <my-footer></my-footer>
    <!-- 回到顶部 -->
    <go-top></go-top>
  </div>
</template>

<script>
import MyNav from "./components/common/mynav/MyNav.vue";
import MyFooter from "./components/common/myfooter/MyFooter.vue";
import GoTop from "@/components/independence/GoTop.vue";

export default {
  name: "App",
  components: { MyNav, MyFooter, GoTop },
  mounted() {
    const userInfo = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "";
    const rout = this.$router.history._startLocation;
    if (!userInfo && rout.indexOf("center") > -1) {
      this.$router.push({ name: "home", query: "" });
    }
  },
};
</script>

<style lang="less">
// 选择性使用scoped：作用域 是指当前文件生效
@import "./assets/css/index.css";

* {
  color: #fff;
}

body {
  background-image: linear-gradient(125deg, #fda6d0, #7ad5f7, #0d9efc, #b88df2);
  background-size: 400%;
  animation: bganimation 10s infinite;
}

// 背景图片动画
@keyframes bganimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

// 内容部分占比
.content {
  width: 80%;
  // min-height: 75vh;
  margin: 0 auto;
  // padding-top: 20px;
  min-width: 320px;
}

@media (max-width: 720px) {
  .content {
    width: 100%;
  }
}
.slide-left-enter {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-enter-active {
  transition: all 0.5s ease;
}
.slide-left-leave-to {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
.slide-left-leave-active {
  transition: all 0.5s ease;
}
</style>
