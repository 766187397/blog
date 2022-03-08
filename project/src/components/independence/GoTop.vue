​
<template>
  <div id="goTop">
    <div class="goTop" v-show="goTopShow" @click="goTop">
      <div class="btn" title="回到顶部">&uarr;</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "goTop",
  data() {
    return {
      scrollTop: "",
      goTopShow: false,
    };
  },
  watch: {
    scrollTop(val) {
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      } else {
        this.goTopShow = false;
      }
    },
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      }
    },
    goTop() {
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 50;
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.goTopShow = false;
        }
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
 
<style scoped>
.goTop {
  position: fixed;
  right: 5vw;
  bottom: 10vh;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #eee;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  opacity: 0.8;
}

.goTop:hover {
  opacity: 1;
}

.btn {
  color: #000;
  line-height: 40px;
  text-align: center;
  font-size: 35px;
  /* 设置文字不可选择 ↓ 使用按钮更丝滑 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.btn:hover {
  color: #25aafb;
}
</style>