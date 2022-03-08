<template>
  <div class="page" v-if="PageNum_item >= 1">
    <!-- 小于6页 -->
    <ul v-if="PageNum_item < 6">
      <li v-show="currentPage_item != 1" @click="red">&lt;</li>
      <li
        v-for="(item, index) in PageNum_item"
        :key="index"
        :class="{ active: index + 1 == currentPage_item }"
        @click="activePage(index + 1)"
      >
        {{ index + 1 }}
      </li>
      <li v-show="currentPage_item != PageNum_item" @click="add">&gt;</li>
    </ul>
    <!-- 大于6页 -->
    <ul v-else>
      <li @click="home">首页</li>
      <li v-show="currentPage_item != 1" @click="red">&lt;</li>
      <li v-show="currentPage_item > 3">...</li>
      <li
        v-for="(item, index) in PageNum_item"
        v-show="
          index + 1 <= currentPage_item + 2 && index + 1 >= currentPage_item - 2
        "
        :key="index"
        :class="{ active: index + 1 == currentPage_item }"
        @click="activePage(index + 1)"
      >
        {{ index + 1 }}
      </li>
      <li v-show="currentPage_item < PageNum_item - 3">...</li>
      <li v-show="currentPage_item != PageNum_item" @click="add">&gt;</li>
      <li @click="back">尾页</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Page",
  props: {
    PageNum: {
      type: Number,
      default: 1,
    }, //总页数
    currentPage: {
      type: Number,
      default: 1,
    }, //当前页码
    get: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      PageNum_item: 1, //总页数
      currentPage_item: 1, //当前页码
    };
  },
  methods: {
    // 下一页
    add() {
      this.currentPage_item == this.PageNum_item
        ? this.currentPage_item
        : (this.currentPage_item += 1);
      this.$emit("Pageitem", this.currentPage_item);
      this.get();
      // console.log(this.currentPage_item);
    },
    // 上一页
    red() {
      this.currentPage_item == 1
        ? this.currentPage_item
        : (this.currentPage_item -= 1);
      this.$emit("Pageitem", this.currentPage_item);
      this.get();
      //   console.log(this.currentPage_item);
    },
    // 点击页
    activePage(v) {
      this.currentPage_item = v;
      this.$emit("Pageitem", this.currentPage_item);
      this.get();
      //   console.log(this.currentPage_item);
    },
    // 首页
    home() {
      this.currentPage_item = 1;
      this.$emit("Pageitem", this.currentPage_item);
      this.get();
    },
    // 尾页
    back() {
      this.currentPage_item = this.PageNum_item;
      this.$emit("Pageitem", this.currentPage_item);
      this.get();
    },
  },
  watch: {
    PageNum: function (v) {
      this.PageNum_item = v;
    },
    currentPage: function (v) {
      this.currentPage_item = v;
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

li {
  margin: 5px;
  padding: 3px 15px;
  background-color: #f4f4f5;
  color: #333;
}

.active {
  color: #409eff;
}

li:hover {
  color: #409eff;
  cursor: pointer;
}
</style>