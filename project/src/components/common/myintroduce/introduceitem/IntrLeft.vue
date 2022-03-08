<template>
  <div class="intrLeft">
    <h1>用户介绍</h1>
    <div class="intr-t">
      <div class="intr-img">
        <img :src="introduce.user_pic" alt="" />
      </div>
      <div class="intr-text">
        <h1>姓名：{{ introduce.nickname }}</h1>
        <p>学校：{{ introduce.school }}</p>
        <p>专业：{{ introduce.professional }}</p>
        <p>星座：{{ introduce.constellation }}</p>
        <p>自我评价：</p>
        <span><text-show :text="introduce.evaluation"></text-show></span>
      </div>
    </div>
    <h1>掌握技能</h1>
    <div class="intr-b">
      <div class="work" v-for="(item, index) in work" :key="index">
        <img :src="item.Photo" alt="" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import TextShow from "@/components/independence/TextShow";
import axios from "@/components/network/request";

export default {
  name: "IntrLeft",
  components: { TextShow },
  data() {
    return {
      introduce: {
        user_pic: "http://127.0.0.1:3007/images/User/user.jpeg",
        u_id: "",
        nickname: "姓名",
        school: "学校",
        professional: "专业",
        constellation: "星座",
        evaluation: "自我介绍",
      },
      work: [
        {
          title: "HTML",
          Photo: "http://127.0.0.1:3007/images/PersonalNotes/html.jpeg",
        },
        {
          title: "CSS",
          Photo: "http://127.0.0.1:3007/images/PersonalNotes/css.jpeg",
        },
        {
          title: "JS",
          Photo: "http://127.0.0.1:3007/images/PersonalNotes/js.jpeg",
        },
        {
          title: "MySQL",
          Photo: "http://127.0.0.1:3007/images/PersonalNotes/mysql.jpeg",
        },
        {
          title: "PHP",
          Photo: "http://127.0.0.1:3007/images/PersonalNotes/php.jpeg",
        },
        {
          title: "Node",
          Photo: "http://127.0.0.1:3007/images/PersonalNotes/node.jpeg",
        },
        {
          title: "VUE",
          Photo: "http://127.0.0.1:3007/images/PersonalNotes/vue.jpeg",
        },
        {
          title: "小程序",
          Photo: "http://127.0.0.1:3007/images/PersonalNotes/vxxcx.jpeg",
        },
      ],
    };
  },
  mounted() {
    // 获取用户信息
    // 个人介绍
    if (this.$route.query.id) {
      var id = this.$route.query.id;
    } else if (localStorage.getItem("userInfo")) {
      var id = JSON.parse(localStorage.getItem("userInfo")).data.id;
    }
    axios({
      method: "get",
      url: "http://127.0.0.1:3007/api/introduce/getdata?id=" + id,
    }).then((res) => {
      if (res.status === 0) {
        this.introduce = res.data;
      }
    });
    // 掌握技能
    axios({
      method: "get",
      url: "http://127.0.0.1:3007/api/PhotoWork/getPhotoWork?u_id=" + id,
    }).then((res) => {
      if (res.status === 0) {
        this.work = res.data[0];
        // console.log(this.work);
      }
    });
    this.$bus.$on("userinfo", (value) => {
      this.introduce.u_id = value.id;
    });
  },
};
</script>

<style scoped>
.intrLeft {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 10px;
  min-width: 280px;
}

.intrLeft > h1 {
  width: 100%;
  min-width: 300px;
  text-align: center;
}

.intr-t {
  display: flex;
  flex-wrap: wrap;
}

.intr-img,
.intr-text {
  flex: 1;
  min-width: 200px;
}

.intr-img {
  display: flex;
  align-items: center;
  justify-content: center;
}

.intr-img img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
}

.intr-text h1 {
  font-size: 1.4em;
}

.intr-text > * {
  margin: 10px 0;
}

.intr-b {
  display: flex;
  width: 100%;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
  padding-bottom: 12px;
}

.intr-b::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

.intr-b::-webkit-scrollbar-thumb {
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

.intr-b::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}

.work img {
  width: 100px;
  height: 60px;
  margin: 5px 20px;
}

.work p {
  text-align: center;
}

.intr-text span {
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
</style>