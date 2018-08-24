<style scoped>
</style>
<style media="screen">
.mint-radiolist {
  font-size: 14px !important;
}
input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  display: none;
}
input[type="radio"] {
  content: "\a0"; /*不换行空格*/
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  width: 1em;
  height: 1em;
  margin-right: 0.4em;
  border-radius: 50%;
  border: 1px solid #999;
  text-indent: 0.15em;
  line-height: 1;
}
.mint-cell {
  display: block;
  height: 44px;
}
.mint-radio {
  line-height: 44px;
}
.mint-radiolist-label {
  display: flex;
  padding: 0 0.2rem;
  border: none;
  /*border-bottom: 1px solid #eee;*/
}
.mint-radio-label {
  line-height: 44px;
}
input[type="radio"]:checked {
  background-color: #26a2ff;
  border: 1px solid #26a2ff;
  background-clip: content-box;
  padding: 0.2em;
}
</style>
<template>
  <Radio v-model="value" @change="check" :options="options">
  </Radio>
</template>

<script>
import { Radio } from "mint-ui";
export default {
  components: {
    Radio
  },
  data() {
    return {
      value: "",
      options: ["选项A", "选项B", "选项C"]
    };
  },
  props: {
    selectCallBack: {
      type: Function,
      default: function() {}
    },
    selectItem: {
      type: Object,
      default: function() {}
    }
  },
  methods: {
    check() {
      this.selectCallBack(arguments[0], this.selectItem);
      console.log(arguments);
    },
    initSelectItem() {
      var key = this.selectItem.key;
      console.log(this.selectItem);
      switch (key) {
        case "country":
          this.options = [
            "中国",
            "俄罗斯",
            "美国",
            "加拿大",
            "英国",
            "德国",
            "法国",
            "瑞士",
            "韩国",
            "日本"
          ];
          break;
        case "brand":
          this.options = ["nike", "mac", "凯迪拉克", "阿迪达斯", "cucuci"];
          break;
        case "emergency":
          this.options = ["加急", "紧急", "有点急", "普通", "无所谓"];
          break;
        case "goodsName":
          this.options = [
            "天梭手表",
            "nike X21",
            "夏普显示器",
            "劳斯莱斯加长",
            "cucuci 包包"
          ];
          break;
        case "type":
          this.options = ["服装", "电器", "生活用品", "药品", "其他"];
          break;
        case "style":
          this.options = [
            "学习互助",
            "代购",
            "陪伴",
            "帮代",
            "教材",
            "就医",
            "换汇",
            "租赁",
            "办手续",
            "其他"
          ];
          break;
        case "delivery":
          this.options = ["快递", "当面", "朋友转交", "其他"];
          break;
        default:
          this.options = [];
      }
    }
  },
  watch: {
    selectItem: function(val, oldVal) {
      if (oldVal && val) {
        this.initSelectItem();
      }
    }
  },
  created() {}
};
</script>
