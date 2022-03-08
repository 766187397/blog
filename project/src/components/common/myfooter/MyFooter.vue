<template>
  <div class="footer">
    <div class="footer_top">
      <h1>背景音乐</h1>
      <p>复制网易云音乐的链接点击回车更改背景音乐</p>
      <div class="single">
        <input
          type="text"
          v-model="music_url"
          placeholder="可使用网易云的单曲链接"
          @keyup.enter="search"
        />
        <embed
          frameborder="no"
          border="0"
          marginwidth="0"
          marginheight="0"
          width="100%"
          height="86"
          :src="url"
        />
      </div>
    </div>
    <div class="footer_bottom">
      <div class="footer_left">
        <h1>&#8595;关于我 &#8595;</h1>
        <div class="contact">
          <div>
            <p>姓名：</p>
            <p>胡尚坤</p>
          </div>
          <div>
            <p>学校：</p>
            <a
              href="https://www.wspc.edu.cn/"
              title="点击查看！"
              target="_blank"
              >武汉船舶职业技术学院</a
            >
          </div>
          <div>
            <p>专业：</p>
            <p>计算机应用</p>
          </div>
          <div>
            <p>星座：</p>
            <a
              href="https://www.baidu.com/s?wd=%E5%8D%81%E4%BA%8C%E6%98%9F%E5%BA%A7"
              title="点击查询"
              target="_blank"
              >双鱼座</a
            >
          </div>
          <div>
            <p>自我评价：</p>
            <p>
              性格开朗，工作认真负责，细心，有很强的职责心和进取心，头脑灵活，不怕吃苦，理解潜力强，能够很好的处理同事的关系，具有强烈的团队合作精神，并能承担必须的工作压力。
            </p>
          </div>
        </div>
      </div>
      <div class="footer_right">
        <h1>&#8595;您可以随时联系我 &#8595;</h1>
        <div class="contact">
          <div>
            <p>电话：</p>
            <p>18086610689</p>
          </div>
          <div>
            <p>QQ：</p>
            <a
              href="tencent://message/?uin=766187397&Site=&Menu=yes"
              title="点击与我对话！"
              target="_blank"
              >766187389</a
            >
          </div>
          <div>
            <p>QQ邮箱：</p>
            <p>766187389@qq.com</p>
          </div>
          <div>
            <p>微信：</p>
            <p>hsk20020117</p>
          </div>
          <div>
            <p>CSDN：</p>
            <a
              href="https://blog.csdn.net/m0_55783584?spm=1000.2115.3001.5343"
              title="点击访问我的主页"
              target="_blank"
              >苍狼寒刃</a
            >
          </div>
          <div>
            <p>GetHub：</p>
            <a
              href="https://github.com/766187397"
              title="点击访问我的主页！"
              target="_blank"
              >766187397</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  data() {
    return {
      music_url: "",
      url: "https://music.163.com/outchain/player?type=2&id=1836118321&auto=0&height=66",
    };
  },
  methods: {
    search() {
      if (this.music_url == "") {
        this.url =
          "https://music.163.com/outchain/player?type=2&id=1836118321&auto=0&height=66";
      } else {
        var id = this.music_url.match(/id\=(\S*)\&userid/)[1];
        this.url = `https://music.163.com/outchain/player?type=2&id=${id}&auto=0&height=66`;
      }
    },
  },
};
</script>

<style scoped>
.footer_top {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer_top > p {
  margin: 20px 0;
  font-size: 12px;
}

.single {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.single input {
  margin-left: 10px;
  width: 160px;
  font-size: 14px;
  padding: 5px;
  color: #000;
}

.footer_bottom {
  display: flex;
  flex-wrap: wrap;
  margin-top: 18px;
  width: 100%;
  min-height: 100px;
  min-width: 320px;
  padding-bottom: 20px;
}

.footer_left h1,
.footer_right h1 {
  text-align: center;
  font-size: 25px;
  white-space: nowrap;
}

.footer_left,
.footer_right {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

.contact,
.record {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.contact div > a {
  color: #fff;
}

.footer_left .contact div:nth-child(2) {
  white-space: nowrap;
}

.footer_left .contact div:last-child {
  flex-direction: column;
}

.footer_left .contact div:last-child p:last-child {
  width: 200px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>