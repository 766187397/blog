<template>
  <div class="usermanagement">
    <div class="information">
      <user-info></user-info>
      <div class="date">
        <date></date>
      </div>
    </div>
    <br />
    <hr />
    <div class="updata">
      <user-info-item></user-info-item>
      <introduce></introduce>
    </div>
    <div class="photoCollections">
      <work></work>
      <photo-wall></photo-wall>
    </div>
  </div>
</template>

<script>
import UserInfo from "./user/UserInfo.vue";
import Date from "@/components/independence/Date";
import UserInfoItem from "./updata/UserInfo.vue";
import Introduce from "./updata/Introduce.vue";
import Work from "./updata/Work.vue";
import PhotoWall from "./updata/PhotoWall.vue";

export default {
  name: "UserManagement",
  components: {
    UserInfo,
    Date,
    UserInfoItem,
    Introduce,
    Work,
    PhotoWall,
  },
};
</script>

<style scoped>
.information {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
}
.date {
  min-width: 300px;
  max-width: 480px;
  flex: 3;
}
.updata,
.photoCollections {
  display: flex;
  flex-wrap: wrap;
}
</style>