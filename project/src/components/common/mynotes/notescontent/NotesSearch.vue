<template>
  <div class="searchcontent">
    <div class="card">
      <p>分类</p>
      <div class="search bar">
        <form>
          <!-- 阻止回车 onkeypress="return event.keyCode != 13;" -->
          <input
            type="text"
            v-model="searchdata"
            placeholder="请输入您要搜索的内容..."
            onkeypress="return event.keyCode != 13;"
          />
          <div class="sea_btn" @click="search">搜索</div>
        </form>
      </div>
      <div class="label">
        <ul>
          <li
            class="labelname"
            :class="{ active: active == item.label }"
            v-for="(item, index) in labelname"
            :key="index"
            @click="request(item.label)"
          >
            <img src="@/assets/img/r.jpg" alt="" />{{ item.label
            }}<img src="@/assets/img/l.jpg" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotesSearch",
  props: {
    get: Function,
  },
  data() {
    return {
      active: "最新",
      searchdata: [],
      labelname: [
        { label: "最新" },
        { label: "html" },
        { label: "css" },
        { label: "js" },
        { label: "mysql" },
        { label: "php" },
        { label: "node" },
        { label: "vue" },
        { label: "小程序" },
      ],
    };
  },
  methods: {
    search() {
      // 搜索
      let con = this.searchdata;
      this.$emit("art_con", con);
      this.get();
    },

    request(v) {
      this.active = v;
      this.$emit("active", this.active);
      // 标签
      this.get();
    },
  },
};
</script>

<style scoped>
.searchcontent {
  flex: 1;
}

.card {
  position: sticky;
  top: 11.5vh;
  padding: 10px;
  border: 2px #ffffff solid;
  border-radius: 20px;
  margin: 20px 0 20px 40px;
}

.card p {
  padding-left: 5px;
}

.label ul {
  width: 100%;
  padding-bottom: 5px;
  margin: 18px 0;
  overflow-y: hidden;
  overflow-x: auto;
  background-color: #fff;
  border-radius: 8px;
}

.label ul::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

.label ul::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

.label ul {
  max-height: 50vh;
  overflow: auto;
}

.labelname {
  color: #70d0f7;
  text-align: center;
  margin: 5px 30px;
  padding: 5px 8px;
  /* 文字不换行 */
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.labelname:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.labelname img {
  width: 30px;
  height: 30px;
}

.active {
  color: #4fc08d;
}

.bar form {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}

.bar input {
  font-size: 14px;
  color: #000;
  padding: 2px 10px;
  width: 40%;
  width: 140px;
  border-top-left-radius: 42px;
  border-bottom-left-radius: 42px;
  border: 2px solid #f15b42;
  transition: 0.3s linear;
  border-right-style: none;
  outline: none;
}
.bar input:focus {
  width: 40%;
  width: 160px;
  border-style: 1px #f15b42 solid;
  color: #000;
}
.bar .sea_btn {
  width: 35px;
  padding: 2px 10px;
  border-top-right-radius: 42px;
  border-bottom-right-radius: 42px;
  border-style: none;
  background-color: #f15b42;
  line-height: 25px;
}

.bar .sea_btn:hover {
  cursor: pointer;
}

@media (max-width: 720px) {
  .label ul {
    display: flex;
  }
  .card {
    margin: 20px;
  }
  .labelname {
    margin: 0;
  }
}
</style>