<template>
  <div class="centernav">
    <div class="bar" :class="{ bar_w: !show }" @click="showState()">
      <tab-bar v-if="show">&Xi;</tab-bar>
      <tab-bar v-else>&Chi;</tab-bar>
    </div>
    <div class="centernav_item" :class="{ sh: show }">
      <tab-bar path="/center/usercenter">用户管理</tab-bar>
      <tab-bar path="/center/posts">文章管理</tab-bar>
      <tab-bar path="/center/release">发布文章</tab-bar>
      <!-- <tab-bar @click.native="logout">退出登录</tab-bar> -->
      <div class="logout" @click="logout">退出登录</div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/mynav/navbar/NavBar.vue";
import TabBar from "@/components/common/mynav/navbar/TabBar.vue";

export default {
  name: "CenterNav",
  components: {
    NavBar,
    TabBar,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    // 退出登录
    logout() {
      // 改变导航栏
      this.$bus.$emit("logout", false);
      // 切换路由
      this.$router.push({ name: "home", query: "" });
      // 清空用户信息
      localStorage.setItem("user", "");
      localStorage.setItem("userInfo", "");
    },
    showState() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.centernav {
  flex: 1;
}

.centernav_item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px;
  position: sticky;
  top: 12vh;
  height: 0;
}

.centernav_item > * {
  margin: 10px 0;
}

.bar {
  display: none;
}
.bar_w {
  width: 114px;
}
@media (max-width: 768px) {
  .centernav {
    flex: none;
  }
  .centernav .bar {
    position: fixed;
    height: 20px;
    background-color: #000;
    top: 8.8vh;
    left: 0;
    margin: 0;
    padding: 10px 0;
    opacity: 0.7;
    z-index: 99;
  }

  .centernav_item {
    position: fixed;
    height: 100vh;
    background-color: #000;
    top: 0;
    left: 0;
    margin: 0;
    padding: 16vh 25px;
    opacity: 0.7;
    z-index: 90;
  }
  .bar {
    display: block;
  }
}

.logout {
  text-align: center;
}

.logout:hover {
  cursor: pointer;
  color: #4fc08d;
}

.sh {
  display: none;
}

@media (min-width: 768px) {
  .sh {
    display: block !important;
  }
}
</style>