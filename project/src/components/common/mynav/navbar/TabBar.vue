<template>
  <div class="tabbar" @click="itemClick">
    <div class="text" :style="activeStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#4fc08d",
    },
  },
  data() {
    return {};
  },
  // 计算属性
  computed: {
    isActive() {
      //活跃的值等于当前的值
      //indexOf 在字符串中查找，没有默认返回-1
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  // 方法
  methods: {
    itemClick() {
      // 将原有的路由取代
      if (this.path) {
        return this.$router.replace(this.path);
      }
    },
  },
};
</script>

<style scoped>
.tabbar {
  margin: 0 15px;
  text-align: center;
}

.text {
  color: #fff;
  /* 文字不换行 */
  white-space: nowrap;
  animation: my 2s;
}

.text:hover {
  color: #4fc08d;
  cursor: pointer;
}

@keyframes my {
  0% {
    height: 0;
    overflow: hidden;
  }
  100% {
    height: 18.4px;
    overflow: hidden;
  }
}

@media (max-width: 415px) {
  .tabbar {
    margin: 0 9px;
  }
}
</style>