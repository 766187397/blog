<template>
  <div class="base64">
    <div class="picture">
      <div class="user_pic">
        <img v-if="img" :src="img" alt="" />
        <img v-else-if="base64_img" :src="base64_img" alt="" />
        <span v-else class="old_img">{{ old_img }}</span>
      </div>
      <input id="fileField" type="file" @change="onchangemd" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Base64",
  props: {
    img: String,
    old_img: {
      type: String,
      default: "点击选择图片",
    },
  },
  data() {
    return {
      base64_img: "",
      base64_img_name: "",
    };
  },
  methods: {
    onchangemd(e) {
      this.base64_img_name = e.path[0].files[0].name;
      this.$emit("base64_img_name", this.base64_img_name);
      const _this = this;
      //   // 利用fileReader对象获取file
      var file = e.target.files[0];
      this.$api
        .compressImg(file)
        .then((res) => {
          //调用
          _this.base64_img = res;
          _this.$emit("base64", _this.base64_img);
          return;
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>

<style scoped>
.base64,
.user_pic {
  width: 100%;
  height: 100%;
}

.user_pic img {
  width: 100%;
  height: 100%;
}

.picture > input {
  width: 200px;
}

.picture {
  position: relative;
  width: 100%;
  height: 100%;
}

input[type="file"] {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

input[type="file"]:hover {
  cursor: pointer;
}

.old_img {
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #000;
  background-color: #fff;
  justify-content: center;
  align-items: center;
}
</style>