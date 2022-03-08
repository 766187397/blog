<template>
  <div class="myhome">
    <swiper :dataimage="dataimage" />
    <recommended :item_w="'width:300px'" />
  </div>
</template>

<script>
import swiper from "@/components/independence/swiper.vue";
import Recommended from "@/components/common/myhome/recommended/Recommended";
export default {
  name: "MyHome",
  components: {
    swiper,
    Recommended,
  },
  data() {
    return {
      dataimage: [
        "http://127.0.0.1:3007/images/HomePage/004.jpeg",
        "http://127.0.0.1:3007/images/HomePage/005.jpeg",
        "http://127.0.0.1:3007/images/HomePage/006.jpeg",
        "http://127.0.0.1:3007/images/HomePage/007.jpeg",
        "http://127.0.0.1:3007/images/HomePage/008.jpeg",
      ],
    };
  },
};
</script>

<style scoped>
</style>