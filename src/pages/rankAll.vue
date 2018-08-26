<template>
  <div class="rank_all">
    <div class="main_img">
      <img src="../assets/images/stanfu.jpeg" alt="">
    </div>
    <div class="rank_content">
      <mt-navbar v-model="selected">
        <mt-tab-item v-for="(item,index) in tabContent" :id="index" :key='index'>{{item.key}}</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-for="(item,index) in tabContent" :id="index" :key='index'>
          <ul class="rank_user_img">
            <li v-for="(items,index) in item.list" :key='index'>
              <img src="../assets/images/12.jpeg" alt="">
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import userMix from "../mixins/userInfo";
export default {
  mixins: [userMix],
  components: {},
  data() {
    return {
      selected: 0,
      tabItem: [
        "全部榜单",
        "北京大学",
        "哈佛大学",
        "剑桥大学",
        "清华大学",
        "牛津大学"
      ],
      tabContent: [
        {
          key: "全部榜单",
          list: ["zhenyuo8", "hongbing", "111", "2222", "333"]
        },
        {
          key: "北京大学",
          list: [
            "zhenyu09",
            "hongbing",
            "111",
            "2222",
            "333",
            "111",
            "2222",
            "333",
            ,
            "111",
            "2222",
            "333"
          ]
        },
        {
          key: "哈佛",
          list: [
            "zhenyu99",
            "hongbing",
            "111",
            "2222",
            "333",
            ,
            "111",
            "2222",
            "333"
          ]
        },
        {
          key: "剑桥",
          list: [
            "zhenyu88",
            "hongbing",
            "111",
            "2222",
            "333",
            ,
            "111",
            "2222",
            "333",
            ,
            "111",
            "2222",
            "333",
            ,
            "111",
            "2222",
            "333"
          ]
        },
        {
          key: "清华",
          list: ["zhenyu77", "hongbing", "111", "2222", "333", , "111", "2222"]
        },
        {
          key: "牛津",
          list: ["zhenyu77", "hongbing", "111", "2222", "333", "44"]
        }
      ]
    };
  },
  methods: {},
  activated(){
      document.title = "Glohelp";
  },
  created() {}
};
</script>
<style media="screen">
.mint-navbar {
  display: block !important;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 36px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
.mint-navbar .mint-tab-item {
  width: 2rem;
  padding: 12px 0;
  display: inline-block;
  margin-bottom: 0;
  vertical-align: top;
}
.mint-navbar .mint-tab-item.is-selected {
  border: none;
  background: #26a2ff;
  color: #fff;
  font-weight: 600;
}
.mint-tab-container-item {
  display: flex;
}
.mint-tab-container-item {
  width: 6.3rem;
  margin: auto;
}
.rank_user_img {
  width: 100%;
  overflow: hidden;
}
.rank_user_img > li {
  float: left;
  width: 1.7rem;
  height: 1.7rem;
  overflow: hidden;
  margin-top: 0.6rem;
  box-sizing: border-box;
  border: 1px solid #eee;
  font-size: 0;
}
.rank_user_img > li:nth-child(3n + 1) {
  margin-right: 0.6rem;
}
.rank_user_img > li:nth-child(3n + 2) {
  margin-right: 0.6rem;
}
.rank_user_img > li > img {
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>

<style scoped>
.main_img {
  width: 7.5rem;
  height: 100px;
}
.main_img img {
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>
