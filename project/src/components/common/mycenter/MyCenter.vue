<template>
  <div class="mycenter">
    <center-nav></center-nav>
    <div class="centercontent">
      <router-view />
    </div>
  </div>
</template>

<script>
import CenterNav from "@/components/common/mycenter/centernav/CenterNav";

export default {
  name: "MyCenter",
  components: { CenterNav },
};
</script>

<style scoped>
.mycenter {
  display: flex;
  /* width: 60%; */
  margin: 0 auto;
  padding: 10px;
}

.centercontent {
  flex: 5;
}

@media (max-width: 768px) {
  .mycenter {
    width: 80%;
  }
}

@media (max-width: 415px) {
  .mycenter {
    width: auto;
  }
}
</style>