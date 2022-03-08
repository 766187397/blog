<template>
  <div id="swiper" @mouseenter="clearInv" @mouseleave="runInv">
    <ul>
      <li class="prev" @click="prepPage">&lt;</li>
      <li
        v-for="(item, index) in dataimage"
        :key="index"
        class="swiperimg"
        :class="{ active: index == currentIndex }"
      >
        <img v-show="index == currentIndex" :src="item" />
      </li>
      <li class="subscript">
        <div
          v-for="(item, index) in dataimage"
          :key="index"
          :style="activeStyle(index)"
          @click="activePart(index)"
        ></div>
      </li>
      <li class="next" @click="nextPage()">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
    dataimage: {
      style: Array,
    },
    activeColor: {
      type: String,
      default: "#fff",
    },
  },
  data() {
    return {
      currentIndex: 0, //默认显示图片
      timer: null, //定时器
    };
  },
  //   计算属性
  computed: {},
  //   方法
  methods: {
    activeStyle(index) {
      return index == this.currentIndex
        ? { backgroundColor: this.activeColor }
        : {};
    },
    activePart(index) {
      return (this.currentIndex = index);
    },
    prepPage() {
      if (this.currentIndex == 0) {
        return (this.currentIndex = this.dataimage.length - 1);
      } else {
        return this.currentIndex--;
      }
    },
    nextPage() {
      if (this.currentIndex == this.dataimage.length - 1) {
        return (this.currentIndex = 0);
      } else {
        return this.currentIndex++;
      }
    },
    runInv() {
      this.timer = setInterval(this.nextPage, 5000);
    },
    clearInv() {
      clearInterval(this.timer);
    },
  },
  mounted() {
    this.runInv();
  },
};
</script>

<style scoped>
#swiper {
  position: relative;
  overflow: hidden;
  /* 高度设置vw会有更好的比例 */
  max-height: 35vw;
}

.prev,
.next {
  position: absolute;
  top: 50%;
  color: #fff;
  width: 1em;
  line-height: 1em;
  text-align: center;
  font-size: 40px;
  z-index: 99;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  display: none;
  transition: all 1s ease;
  /* 设置文字不可选择 ↓ 使用按钮更丝滑 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.prev {
  left: 10%;
  padding-right: 5px;
}

.prev:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.next {
  right: 10%;
  padding-left: 5px;
}

.next:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

#swiper ul:hover .prev {
  display: block;
}

#swiper ul:hover .next {
  display: block;
}

.swiperimg {
  width: 100%;
  z-index: -99;
  overflow: hidden;
}

.swiperimg img {
  width: 100%;
}

.subscript {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.subscript div {
  float: left;
  width: 20px;
  height: 5px;
  margin: 0 10px;
  background-color: #ccc;
  cursor: pointer;
}

.swiperimg.active {
  float: left;
  padding: 5px;
  animation: skin 6s forwards;
}

@keyframes skin {
  0% {
    opacity: 0.85;
    transform: scale(1);
  }

  100% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@media (max-width: 720px) {
  #swiper {
    position: relative;
    overflow: hidden;
    /* 高度设置vw会有更好的比例 */
    max-height: 40vw;
  }
}
</style>