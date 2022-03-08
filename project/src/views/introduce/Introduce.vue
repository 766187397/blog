<template>
  <div class="introduce">
    <my-introduce></my-introduce>
  </div>
</template>
<script>
import MyIntroduce from "@/components/common/myintroduce/MyIntroduce";

export default {
  name: "Introduce",
  components: {
    MyIntroduce,
  },
};
</script>

<style>
.introduce{
  width: 100%;
  min-height: 74.8vh;
}
</style>