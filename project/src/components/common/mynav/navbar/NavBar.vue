<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
};
</script>

<style scoped>
.tab-bar {
  display: flex;
  justify-content: flex-end;
  padding: 3vh 5%;
  position: sticky;
  top: 0;
  z-index: 9999999;
  min-width: 320px;
  background-image: linear-gradient(125deg, #fda6d0, #7ad5f7, #0d9efc, #b88df2);
  background-size: 400%;
  animation: bganimation 10s infinite;
}

.tabbar:last-child {
  margin-right: 0;
}

@media (max-width: 415px) {
  .tab-bar {
    left: 0px;
    padding: 3vh 0;
    justify-content: space-evenly;
  }
  .tabbar:last-child {
    margin-right: 10px;
  }
}

/* 背景色动画 */
@keyframes bganimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>