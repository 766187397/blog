<template>
  <div class="box">
    <div class="show">{{ show }}</div>
  </div>
</template>

<script>
export default {
  name: "TextShow",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      index: 0,
      show: "",
    };
  },
  mounted() {
     // 生命周期 组件结构已经在浏览器渲染
    const time = setInterval(this.demo, 100);
  },
  methods: {
    demo() {
      this.show = this.text.substring(0, this.index++);
      if (this.index == this.text.length) {
        clearInterval(this.time);
      }
    },
  },
};
</script>
<style scoped>
</style>