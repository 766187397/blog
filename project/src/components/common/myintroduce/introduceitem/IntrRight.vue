<template>
  <div class="intrRight" v-if="photo[0]">
    <div class="max-img" v-show="maximg" @click="maximgstate()">
      <img :src="maxurl" title="点击任意地方缩小" />
    </div>
    <h1>照片墙</h1>
    <div class="instapic">
      <img
        :src="item.Photo"
        v-for="(item, index) in photo"
        :key="index"
        @click="maximgstate(item.Photo)"
      />
    </div>
  </div>
</template>

<script>
import axios from "@/components/network/request";
export default {
  name: "IntrRight",
  data() {
    return {
      maximg: false,
      maxurl: "@/assets/img/wfxs.jpeg",
      photo: [
        { Photo: "http://127.0.0.1:3007/images/HomePage/001.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/002.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/003.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/004.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/005.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/006.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/007.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/008.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/009.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/010.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/011.jpeg" },
        { Photo: "http://127.0.0.1:3007/images/HomePage/012.jpeg" },
      ],
    };
  },
  methods: {
    maximgstate(item) {
      this.maximg = !this.maximg;
      this.maxurl = item;
    },
  },
  mounted() {
    // 照片墙
    if (this.$route.query.id) {
      var id = this.$route.query.id;
    } else if (localStorage.getItem("userInfo")) {
      var id = JSON.parse(localStorage.getItem("userInfo")).data.id;
    }
    axios({
      method: "get",
      url: "http://127.0.0.1:3007/api/PhotoWork/getPhotoWork?u_id=" + id,
    }).then((res) => {
      if (res.status === 0) {
        this.photo = res.data[1];
      }
    });
  },
};
</script>

<style scoped>
.intrRight {
  flex: 1;
  padding: 10px;
  min-width: 280px;
}

.intrRight h1 {
  width: 100%;
  text-align: center;
}

.instapic {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.instapic img {
  width: 30%;
  margin: 10px 0;
}

.instapic img:hover {
  cursor: pointer;
}

.max-img {
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0.98;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}

.max-img img {
  width: 90%;
}
</style>