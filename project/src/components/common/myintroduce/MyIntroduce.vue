<template>
  <div class="myintroduce">
    <div>
      <intr-left></intr-left>
      <intr-right></intr-right>
    </div>
    <div v-if="show">
      <my-notes></my-notes>
    </div>
  </div>
</template>

<script>
import IntrLeft from "./introduceitem/IntrLeft.vue";
import IntrRight from "./introduceitem/IntrRight.vue";
import MyNotes from "@/components/common/mynotes/MyNotes.vue";

export default {
  name: "MyIntroduce",
  components: { IntrLeft, IntrRight, MyNotes },
  computed: {
    show() {
      if (this.$route.query.id || localStorage.getItem("userInfo")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.myintroduce div {
  width: 100%;
  min-height: 70.9vh;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-content: flex-start;
}

@media (max-width: 720px) {
  .myintroduce div {
    display: block;
  }
}
</style>