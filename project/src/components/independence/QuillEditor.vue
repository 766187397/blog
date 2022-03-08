<template>
  <div class="edit_container">
    <!--  新增时输入 -->
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
    <!-- 从数据库读取展示 -->
    <div v-html="str" class="ql-editor">
      {{ str }}
    </div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "QuillEditor",
  components: {
    quillEditor,
  },
  props: {
    con: String,
  },
  data() {
    return {
      content: ``,
      str: "",
      editorOption: {
        //配置工具栏
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 几级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序列表，无序列表
            [{ script: "sub" }, { script: "super" }], // 下角标，上角标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文字输入方向
            [{ size: ["45px", "60px", "90px"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 颜色选择
            ["link", "image", "video"], // 超链接 图片 视频
            [
              {
                font: [
                  "SimSun",
                  "SimHei",
                  "Microsoft-YaHei",
                  "KaiTi",
                  "FangSong",
                  "Arial",
                ],
              },
            ], // 字体
            [{ align: [] }], // 居中
            ["clean"], // 清除样式
          ],
        },
        // 背景颜色 - background
        // 加粗- bold
        // 颜色 - color
        // 字体 - font
        // 内联代码 - code
        // 斜体 - italic
        // 链接 - link
        // 大小 - size
        // 删除线 - strike
        // 上标/下标 - script
        // 下划线 - underline
        // 引用- blockquote
        // 标题 - header
        // 缩进 - indent
        // 列表 - list
        // 文本对齐 - align
        // 文本方向 - direction
        // 代码块 - code-block
        // 公式 - formula
        // 图片 - image
        // 视频 - video
        // 清除字体样式- clean
      },
    };
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {
      this.$emit("quillEditor", this.content);
      // console.log(this.content);
    }, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted() {
    let content = ""; // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content);
  },
  // 监听props中值的变化，随时获取父组件传递的值
  watch: {
    con: function (v) {
      this.content = v;
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quill-editor >>> .ql-container {
  min-height: 300px;
}
/*
这里一定要写上，是用来把相关改变的配置在工具栏正常显示
如果不写，字体样式的下拉会重复显示Sans Serif，字体大小的下拉会重复显示Normal
*/
.quill-editor
  >>> .ql-picker.ql-font
  .ql-picker-label[data-value="SimSun"]::before,
.quill-editor
  >>> .ql-picker.ql-font
  .ql-picker-item[data-value="SimSun"]::before {
  content: "宋体";
  font-family: "SimSun" !important;
}
.quill-editor
  >>> .ql-picker.ql-font
  .ql-picker-label[data-value="SimHei"]::before,
.quill-editor
  >>> .ql-picker.ql-font
  .ql-picker-item[data-value="SimHei"]::before {
  content: "黑体";
  font-family: "SimHei";
}
.quill-editor
  >>> .ql-picker.ql-font
  .ql-picker-label[data-value="Microsoft-YaHei"]::before,
.quill-editor
  >>> .ql-picker.ql-font
  .ql-picker-item[data-value="Microsoft-YaHei"]::before {
  content: "微软雅黑";
  font-family: "Microsoft YaHei";
}
.quill-editor
  >>> .ql-picker.ql-font
  .ql-picker-label[data-value="KaiTi"]::before,
.quill-editor
  >>> .ql-picker.ql-font
  .ql-picker-item[data-value="KaiTi"]::before {
  content: "楷体";
  font-family: "KaiTi" !important;
}
.quill-editor
  >>> .ql-picker.ql-font
  .ql-picker-label[data-value="FangSong"]::before,
.quill-editor
  >>> .ql-picker.ql-font
  .ql-picker-item[data-value="FangSong"]::before {
  content: "仿宋";
  font-family: "FangSong";
}
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="45px"]::before,
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="45px"]::before {
  content: "45px";
}
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="60px"]::before,
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="60px"]::before {
  content: "60px";
}
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="90px"]::before,
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="90px"]::before {
  content: "90px";
}
.quill-editor >>> .ql-snow .ql-picker.ql-header .ql-picker-label::before,
.quill-editor >>> .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "默认标题";
}

.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="1"]::before,
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="1"]::before {
  content: "标题 1";
}
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="2"]::before,
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="2"]::before {
  content: "标题 2";
}
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="3"]::before,
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="3"]::before {
  content: "标题 3";
}
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="4"]::before,
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="4"]::before {
  content: "标题 4";
}
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="5"]::before,
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="5"]::before {
  content: "标题 5";
}
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="6"]::before,
.quill-editor
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="6"]::before {
  content: "标题 6";
}
</style>