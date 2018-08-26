<template>
    <div class="index" id='index'>
        <div class="header">
            <div class="min right">
                <div class="icon-global-im" @click='toMessage()'>
                    <i class="message_tips"></i>
                </div>
                <div class="icon-user" @click='goPersonalCenter()' :class="token?'login_yes':'login_no'">
                </div>
            </div>
        </div>
        <div class="swpier_container" >
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(item,index) in slides" :key='index'><img :src="item" :key='index' alt=""></mt-swipe-item>
            </mt-swipe>
        </div>
    <div class="">
      <p class="index_notice icon-exclamation">点击下列应用类型可发布对应的需求</p>
      <ul class="mainmenu">
        <li v-for="(item,index) in mainmenu" :key='index'>
          <a href="javascript:;">
            <b :class="item.icon" @click='publish(item)'></b>
            <span>{{item.title}}</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="rank service_star">
      <div class="rank_title service_star_title">
        <div class="left">
          {{$t('button.stars')}}
        </div>
        <div class="right icon-arrow_right_samll" @click='goRankAll("service")'>
          {{$t('button.more')}}
        </div>
      </div>
      <ul>
        <li>
          <a href="javascript:;"><img src="../assets/images/icon.png" alt=""></a>
        </li>
        <li>
          <a href="javascript:;"><img src="../assets/images/icon.png" alt=""></a>
        </li>
        <li>
          <a href="javascript:;"><img src="../assets/images/icon.png" alt=""></a>
        </li>
      </ul>
    </div>
    <div class="buttom_action">
      <ul>
        <li class="need_help" @click="seekHelp">{{$t('button.myPublished')}}</li>
        <li @click='offer'>{{$t('button.OthersPublished')}}</li>
      </ul>
    </div>
    <div class="defindloadig" v-if="loadingShow">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import loading from "../components/loading.vue";
import { MessageBox, Toast, Swipe, SwipeItem } from "mint-ui";
import Vue from "vue";
Vue.component(Toast.name, Toast);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import userMix from "../mixins/userInfo";
export default {
  name: "index",
  mixins: [userMix],
  components: {
    loading
  },
  data() {
    return {
      slides: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg"
      ],
      mainmenu: [],
      // token: "",
      code: "",
      hasReceiveMessage: false,
      messageList: [],
      loadingShow: false
    };
  },
  computed: {
    token: function () {
      return this.userInfo && this.userInfo.token? this.userInfo.token: ''
    }
  },
  methods: {
    getCurrentUser(token) {
      if (!token) {
        token = this.userInfo["token"];
      }
      this.axios.get(this.ip + "/globalmate/rest/user/getUserByToken" + "?token=" + token,
          {}
        ).then(res => {
          if (res.success) {
            this.updateUserInfo({
              curUser: res.data
            });
          }
        }).catch(e => {
          console.log(e);
        });
    },
    loadIsCertified(callback) {
      this.axios
        .get(this.ip + "/globalmate/rest/certify/list", {
          params: {
            onlyCurrentUser: true,
            token: this.userInfo.token
          }
        })
        .then(res => {
          if (res.data && res.data.length) {
            // let flag = res.data.some(item => item.isEffective !== 0);
            let flag = res.data.some(item => item.certifyPhoto!=='');
            this.updateUserInfo({
              certifyMsg: res.data,
              identified: flag // 判断是否通过认证了
            });
            if (!flag) {
              Toast({
                message: "请您先完成身份认证",
                duration: 1000
              });
              return;
            }
            flag && callback && callback();
          } else {
            Toast({
              message: "请您先完成身份认证",
              duration: 1000
            });
          }
        });
    },
    publishHandler(item) {
      if (item.key == "carry") {
        Toast({
          message: "对不起，该功能暂未上线，敬请关注...",
          duration: 2000
        });
      } else {
        // this.loadingShow = true;
        // if (!this.token) {
        //   Toast({
        //     message: "请先登入...",
        //     duration: 2000
        //   });
        // } else {
          // setTimeout(() => {
          // this.loadingShow = false;
          this.$router.push({
            path: item.type,
            query: {
              token: this.token,
              title: item.title,
              type: item.type,
              form: item.form,
              key: item.key
            }
          });
          // }, 500);
        // }
      }
    },
    publish(item) {
      // var isIdentify = .getItem("IDENTIFY_YET_glohelp");
      if (!this.token) {
        Toast({
          message: "请先登入...",
          duration: 2000
        });
        return;
      }
      var isIdentify = this.userInfo["identified"];
      if (!isIdentify) {
        // Toast({
        //   message: "请您先完成身份认证",
        //   duration: 2000
        // });
        this.loadIsCertified(this.publishHandler.bind(this, item)); // 再次确认一下有没有认证，有可能存在刚好通过的情况
        return;
      }
      this.publishHandler(item);
    },
    goPersonalCenter() {
      if (!this.token) {
        Toast({
          message: "请先登入...",
          duration: 2000
        });
      } else {
        this.$router.push({
          path: "mine",
          query: {
            token: this.token,
            title: "个人中心"
          }
        });
      }
    },
    offer() {
      // this.userId = .getItem("USERID");
      this.userId = this.userInfo["userId"];
      if (this.userInfo["curUser"]) {
        this.userId = this.userInfo["curUser"].id;
      }
      if (!this.token) {
        Toast({
          message: "请先登入...",
          duration: 2000
        });
      } else {
        this.$router.push({
          path: "seekHelpList",
          query: {
            token: this.token,
            title: "求助列表",
            id: "offer",
            userId: this.userId
          }
        });
      }
    },
    seekHelp() {
      if (!this.token) {
        Toast({
          message: "请先登入...",
          duration: 2000
        });
      } else {
        this.$router.push({
          path: "myAssist",
          query: {
            token: this.token,
            title: "求助列表",
            id: "seek",
            userId: this.userId
          }
        });
      }
    },
    toMessage() {
      this.updateMsgList(this.messageList);
      this.$router.push({
        path: "messageList",
        query: {
          token: this.token,
          title: "消息列表",
          id: "message"
        }
      });
    },
    goRankAll(key) {
      if (!this.token) {
        Toast({
          message: "请先登入...",
          duration: 2000
        });
      } else {
        this.$router.push({
          path: "rankAll",
          query: {
            token: this.token,
            title: "榜单",
            type: key
          }
        });
      }
    }
  },
  activated() {
    // this.getToken(this.getCurrentUser);
    // setTimeout(() => {
    //   this.loadingShow = false;
    // }, 1500);
    this.mainmenu = [
      {
        title: this.$t("formName.study"),
        key: "learnco",
        type: "assist",
        form: "assist",
        icon: "icon-pen"
      },
      {
        title: this.$t("formName.textbook"),
        key: "teaching_material",
        type: "assist",
        form: "other",
        icon: "icon-book"
      },
      {
        title: this.$t("formName.formality"),
        key: "formality",
        type: "assist",
        form: "other",
        icon: "icon-Document_2_yinzhang"
      },
      {
        title: this.$t("formName.exchange"),
        key: "exchange",
        type: "assist",
        form: "other",
        icon: "icon-coin-yen"
      },
      {
        title: this.$t("formName.medical"),
        key: "medical",
        type: "assist",
        form: "other",
        icon: "icon-local_hospital"
      },
      {
        title: this.$t("formName.carry"),
        key: "carry",
        type: "assist",
        form: "carryAssist",
        icon: "icon-flight_takeoff"
      },
      {
        title: this.$t("formName.rent"),
        key: "rent",
        type: "assist",
        form: "other",
        icon: "icon-office"
      },
      {
        title: this.$t("formName.accompany"),
        key: "accompany",
        type: "assist",
        form: "accompany",
        icon: "icon-pacman"
      },
      {
        title: this.$t("formName.daigou"),
        key: "buy",
        type: "assist",
        form: "aassist",
        icon: "icon-icon-announce"
      },
      {
        title: this.$t("formName.other"),
        key: "other",
        type: "assist",
        form: "other",
        icon: "icon-more-horizontal"
      }
    ];
  },

  created() {

  }
};
</script>


<style>
.swpier_container .mint-swipe .mint-swipe-items-wrap {
  height: 177px;
}
.swpier_container .mint-swipe .mint-swipe-items-wrap .mint-swipe-item {
  width: 100%;
  height: 100%;
}
.swpier_container .mint-swipe .mint-swipe-items-wrap .mint-swipe-item img {
   width: 100%;
  height: 100%;
}
#index {
  background: #efefef;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-y: scroll;
  padding-bottom: 44px;
}
.header {
  font-size: 14px;
  overflow: hidden;
  position: fixed;
  z-index: 111;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(250, 250, 250, 0.8);
}
.swpier_container {
  margin-top: 36px;
}
.header > div {
  color: #bfbfbf;
}
.location > div {
  float: left;
}

.header .left {
  float: left;
}
.header .right {
  float: right;
  display: flex;
}
.icon-global-im {
  width: 0.76rem;
  position: relative;
}
.message_tips {
  width: 0.15rem;
  height: 0.15rem;
  background: red;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  display: none;
  right: 0.04rem;
  border: 1px solid #fff;
}
.icon-global-im::before {
  color: #bfbfbf;

  font-size: 32px;
  line-height: 36px;
}
.icon-user::before {
  font-size: 26px;
  line-height: 36px;
}
.icon-map-location {
  width: 0.88rem;
}
.icon-user {
  position: relative;
  font-size: 20px;
  color: #9f9f9f;
  margin-right: 0.1rem;
  width: 0.88rem;
}
.login_yes {
  color: #007aff !important;
}
.login_no {
  color: #bfbfbf !important;
}
.user_wrap {
  position: absolute;
  z-index: 11;
  right: 0.12rem;
  top: 50px;
  font-size: 14px;
  color: #333 !important;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
}
.user_wrap::after {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  right: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-color: #89a8e0 #89a8e0 transparent transparent;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  position: absolute;
  top: -5px;
  content: "";
  height: 10px;
  width: 10px;
}
.user_wrap > span {
  display: inline-block;
  height: 36px;
  padding: 0 0.3rem;
  line-height: 36px;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6;
}
.user_wrap > span:last-child {
  border: none;
}

.swiper-item {
  height: 177px !important;
}
.swiper-item img {
  height: 100%;
  width: 100%;
  display: inline-block;
}
img {
  border: 0;
}
ul {
  list-style: none outside none;
  margin: 0;
  padding: 0;
}
.mainmenu:after {
  clear: both;
  content: " ";
  display: block;
}
.mainmenu {
  background: #fff;
  padding: 10px 0.06rem;
  font-size: 12px;
}
.mainmenu li {
  float: left;
  width: 20%;
  margin-top: 2.5%;
  border-radius: 3px;
  overflow: hidden;
}

.mainmenu li a {
  display: block;
  color: #fff;
  text-align: center;
  text-decoration: none;
}
.mainmenu li a b {
  width: 1rem;
  height: 1rem;
  margin: auto;
  display: block;
  border-radius: 50%;
  font-size: 28px;
  line-height: 1rem;
}
.mainmenu li a img {
  margin: 15px auto 15px;
}

.mainmenu li a span {
  display: block;
  line-height: 30px;
  background-color: #fff;
  color: #999;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.mainmenu li:nth-child(8n + 1) b {
  background: -webkit-linear-gradient(
    94.5deg,
    rgba(251, 110, 109, 1),
    rgba(212, 79, 64, 1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    94.5deg,
    rgba(251, 110, 109, 1),
    rgba(212, 79, 64, 1)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    94.5deg,
    rgba(251, 110, 109, 1),
    rgba(212, 79, 64, 1)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    94.5deg,
    rgba(251, 110, 109, 1),
    rgba(212, 79, 64, 1)
  ); /* 标准的语法 */
}
.mainmenu li:nth-child(8n + 2) b {
  background: -webkit-linear-gradient(
    105.1deg,
    rgba(255, 92, 102, 1),
    rgba(194, 44, 45, 1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    107.7deg,
    rgba(88, 205, 246, 1),
    rgba(66, 157, 222, 1)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    107.7deg,
    rgba(88, 205, 246, 1),
    rgba(66, 157, 222, 1)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    107.7deg,
    rgba(88, 205, 246, 1),
    rgba(66, 157, 222, 1)
  ); /* 标准的语法 */
}
.mainmenu li:nth-child(8n + 3) b {
  background: -webkit-linear-gradient(
    99.3deg,
    rgba(185, 101, 255, 1),
    rgba(113, 44, 189, 1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    99.3deg,
    rgba(185, 101, 255, 1),
    rgba(113, 44, 189, 1)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    99.3deg,
    rgba(185, 101, 255, 1),
    rgba(113, 44, 189, 1)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    99.3deg,
    rgba(185, 101, 255, 1),
    rgba(113, 44, 189, 1)
  ); /* 标准的语法 */
}
.mainmenu li:nth-child(8n + 4) b {
  background: -webkit-linear-gradient(
    107.5deg,
    rgba(255, 134, 63, 1),
    rgba(244, 88, 21, 1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    107.5deg,
    rgba(255, 134, 63, 1),
    rgba(244, 88, 21, 1)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    107.5deg,
    rgba(255, 134, 63, 1),
    rgba(244, 88, 21, 1)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    107.5deg,
    rgba(255, 134, 63, 1),
    rgba(244, 88, 21, 1)
  ); /* 标准的语法 */
}
.mainmenu li:nth-child(8n + 5) b {
  background: -webkit-linear-gradient(
    103.8deg,
    rgba(97, 216, 60, 1),
    rgba(60, 182, 95, 1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    103.8deg,
    rgba(97, 216, 60, 1),
    rgba(60, 182, 95, 1)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    103.8deg,
    rgba(97, 216, 60, 1),
    rgba(60, 182, 95, 1)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    103.8deg,
    rgba(97, 216, 60, 1),
    rgba(60, 182, 95, 1)
  ); /* 标准的语法 */
}
.mainmenu li:nth-child(8n + 6) b {
  background: -webkit-linear-gradient(
    103.1deg,
    rgba(251, 141, 22, 1),
    rgba(235, 122, 52, 1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    103.1deg,
    rgba(251, 141, 22, 1),
    rgba(235, 122, 52, 1)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    103.1deg,
    rgba(251, 141, 22, 1),
    rgba(235, 122, 52, 1)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    103.1deg,
    rgba(251, 141, 22, 1),
    rgba(235, 122, 52, 1)
  ); /* 标准的语法 */
}
.mainmenu li:nth-child(8n + 7) b {
  background: -webkit-linear-gradient(
    103deg,
    rgba(254, 201, 73, 1),
    rgba(235, 152, 38, 1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    103deg,
    rgba(254, 201, 73, 1),
    rgba(235, 152, 38, 1)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    103deg,
    rgba(254, 201, 73, 1),
    rgba(235, 152, 38, 1)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    103deg,
    rgba(254, 201, 73, 1),
    rgba(235, 152, 38, 1)
  ); /* 标准的语法 */
}
.mainmenu li:nth-child(8n + 8) b {
  background: -webkit-linear-gradient(
    99.5deg,
    rgba(255, 85, 125, 1),
    rgba(215, 43, 85, 1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    99.5deg,
    rgba(255, 85, 125, 1),
    rgba(215, 43, 85, 1)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    99.5deg,
    rgba(255, 85, 125, 1),
    rgba(215, 43, 85, 1)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    99.5deg,
    rgba(255, 85, 125, 1),
    rgba(215, 43, 85, 1)
  ); /* 标准的语法 */
}

.rank {
  margin-top: 7px;
  background: rgba(255, 255, 255, 0.6);
  /*height: 116px;*/
  font-size: 14px;
  color: #999;
}
.rank ul {
  padding: 6px 0.6rem 16px;
}
.rank ul li {
  display: inline-block;
  width: 1.4rem;
  height: 1.4rem;
  background: #fff;
  border-radius: 50%;
  margin-right: 0.94rem;
  overflow: hidden;
}
.rank ul li img {
  width: 100%;
  height: 100%;
  display: inline-block;
}
.rank_title {
  padding: 7px 0.22rem;
  /*text-align: left;*/
  display: flex;
}
.school_star_title > div,
.service_star_title > div {
  flex: 1;
}
.school_star_title .left,
.service_star_title .left {
  text-align: left;
}
.school_star_title .right,
.service_star_title .right {
  text-align: right;
}
.rank ul li:last-child {
  margin: 0;
  /*margin: 0 1.02rem;*/
}
.school_star {
  margin-bottom: 46px;
}
.school_star ul li a,
.service_star ul li a {
  width: 1.4rem;
  height: 1.4rem;
}

#index .buttom_action {
  position: fixed;
  bottom: -1px;
  left: 0;
  right: 0;
  background: rgba(250, 250, 250, 0.9);
  box-shadow: 0px 1px 0px 0px rgba(178, 178, 178, 1);
}
#index .buttom_action ul {
  height: 24px;
  padding: 10px 0;
}
#index .buttom_action ul li {
  display: inline-block;
  width: 50%;
  font-size: 16px;
  font-weight: 500;
  float: left;
  height: 24px;
  line-height: 24px;
  color: #007aff;
}
.need_help {
  box-sizing: border-box;
  border-right: 2px solid #979797;
}
#index .icon-arrow_right_samll {
  font-size: 12px;
  color: #54698d;
}
#index .icon-arrow_right_samll::before {
  float: right;
  font-size: 14px;
}
#index .index_notice {
  color: #f59d0b;
  height: 20px;
  line-height: 20px;
  text-align: left;
  background: #f9f8f4;
  padding-left: 20px;
  font-size: 12px;
}
#index .icon-exclamation::before {
  margin-right: 0.04rem;
}
.defindloadig {
  position: fixed;
  z-index: 11;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
