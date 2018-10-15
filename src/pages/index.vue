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
                <mt-swipe-item v-for="(item,index) in slides" :key='index' @click.native='goSwiperItem(item.href)'><img :src="item.url" :key='index' alt=""  >
                </mt-swipe-item>
            </mt-swipe>
        </div>
    <div class="">
      <p class="index_notice icon-exclamation">{{$t('formTitle.indexnotice')}}</p>
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
        <li v-for="(item,index) in rankUserList" :key="index" @click='goDetail(item)'>
          <a href="javascript:;">
              <img :src="item.pic" alt="">
              <img :src="item.userTag=='vGold'?vGold:item.userTag=='vSilver'?vSilver:item.userTag=='vCopper'?vCopper:''" v-if="item.userTag" alt="" class="gl_cetifiy_medal">
          </a>
          <span>{{index+1}}.{{item.name}}</span>
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
    <protocol :userIdAgreement='userIdAgreement' v-if="!notReadAgreement&&token" :agreementCallback='agreementCallback' :isENAgreement='isENAgreement'></protocol>
  </div>
</template>

<script>
import loading from "../components/loading.vue";
import protocol from "../components/protocol.vue";
import { MessageBox, Toast, Swipe, SwipeItem } from "mint-ui";
import Vue from "vue";
Vue.component(Toast.name, Toast);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import userMix from "../mixins/userInfo";
let url1=require('../assets/images/index_1.jpeg')
let url2=require('../assets/images/index_2.jpeg')
let url3=require('../assets/images/index_2.jpeg')

export default {
  name: "index",
  mixins: [userMix],
  components: {
    loading,protocol
  },
  data() {
    return {
      slides: [],
      mainmenu: [],
      code: "",
      hasReceiveMessage: false,
      messageList: [],
      loadingShow: false,
      rankUserList:[],
      notReadAgreement:true,
      isENAgreement:this.language=='en'?true:false,
      vGold:require('../assets/images/vGold.png'),
      vSilver:require('../assets/images/vSilver.png'),
      vCopper:require('../assets/images/vCopper.png')
    };
  },
  computed: {
    token: function () {
      return this.userInfo && this.userInfo.token? this.userInfo.token: ''
    },
    userIdAgreement: function () {
      return this.userInfo && this.userInfo.userId? this.userInfo.userId: ''
    }
  },
  methods: {
    getCurrentUser(token) {
      if (!token) {
        token = this.userInfo["token"];
      }
      this.axios.get(this.ip + "/globalmate/rest/user/getUserByToken",{
          params:{
              token:token
          }
      }).then(res => {
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
        let _this=this;
      this.axios
        .get(this.ip + "/globalmate/rest/certify/list", {
          params: {
            onlyCurrentUser: true,
            token: this.userInfo.token
          }
        })
        .then(res => {
          if (res.data && res.data.length) {
            let flag = res.data.some(item => item.isEffective == 1);
            this.updateUserInfo({
              certifyMsg: res.data,
              identified: flag // 判断是否通过认证了
            });
            if (!flag) {
                MessageBox.confirm('',{
                    title: '',
                    message: _this.$t('totastTips.confirmIdentify'),
                    confirmButtonText:_this.$t('button.confirm'),
                    cancelButtonText:_this.$t('button.cancel'),
                    showCancelButton: true
                }).then(action => {
                    _this.toIdentify();
                }).catch(cancel=>{

                });
              Toast({
                message: this.$t('totastTips.confirmIdentify'),
                duration: 1000
              });
              return;
            }
            flag && callback && callback();
          } else {
            Toast({
              message: this.$t('totastTips.confirmIdentify'),
              duration: 1000
            });
          }
        });
    },
    goDetail(item) {
      this.$router.push({
        path: "mineInformation",
        query: {
          token: this.userInfo.token,
          title: item.nikename,
          otherUserId: item.id,
          id: '',
          currentuser: this.userInfo.userId,
          seeOther: true
        }
      });
    },
    publishHandler(item) {
      if (item.key == "carry") {
        Toast({
          message: this.$t('totastTips.comingSoon'),
          duration: 2000
        });
      } else {
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
       }
    },
    publish(item) {
      if (!this.token) {
        Toast({
          message: this.$t('totastTips.loginTips'),
          duration: 2000
        });
        return;
      }

      if(this.userInfo&&this.userInfo.curUser&&!this.userInfo.curUser.uExt3){
          this.hasReadAgreementYet()
          return
      }
      let hasCompletePersonal=this.completePersonal();
      if(!hasCompletePersonal) {
          this.toCompletePersonal();
          return;
      }
      var isIdentify = this.userInfo["identified"];
      if (!isIdentify) {
        this.loadIsCertified(this.publishHandler.bind(this, item)); // 再次确认一下有没有认证，有可能存在刚好通过的情况
        return;
      }
      this.publishHandler(item);
    },
    goPersonalCenter() {
      if (!this.token) {
        Toast({
          message: this.$t('totastTips.loginTips'),
          duration: 2000
        });
      } else {
        this.$router.push({
          path: "mine",
          query: {
            token: this.token,
          }
        });
      }
    },
    offer() {
      this.userId = this.userInfo["userId"];
      if (this.userInfo["curUser"]) {
        this.userId = this.userInfo["curUser"].id;
      }
      if (!this.token) {
        Toast({
          message: this.$t('totastTips.loginTips'),
          duration: 2000
        });
      } else {
          if(this.userInfo&&this.userInfo.curUser&&!this.userInfo.curUser.uExt3){
              this.hasReadAgreementYet()
              return
          }
          let hasCompletePersonal=this.completePersonal();
          if(!hasCompletePersonal) {
              this.toCompletePersonal();
              return;
          }
        this.$router.push({
          path: "seekHelpList",
          query: {
            token: this.token,
            id: "offer",
            userId: this.userId
          }
        });
      }
    },
    seekHelp() {
      if (!this.token) {
        Toast({
          message: this.$t('totastTips.loginTips'),
          duration: 2000
        });
      } else {
          if(this.userInfo&&this.userInfo.curUser&&!this.userInfo.curUser.uExt3){
              this.hasReadAgreementYet()
              return
          }

          let hasCompletePersonal=this.completePersonal();
          if(!hasCompletePersonal) {
              this.toCompletePersonal();
              return;
          }
        this.$router.push({
          path: "myAssist",
          query: {
            token: this.token,
            id: "seek",
            userId: this.userId
          }
        });
      }
    },
    toMessage() {
      $(".message_tips").hide();
      this.$router.push({
        path: "messageList",
        query: {
          token: this.token,
          id: "message"
        }
      });
    },
    goRankAll(key) {
      if (!this.token) {
        Toast({
          message: this.$t('totastTips.loginTips'),
          duration: 2000
        });
      } else {
        this.$router.push({
          path: "rankAll",
          query: {
            token: this.token,
            type: key
          }
        });
      }
    },
    getRank(){
        let list=this.userList;
        list=list.sort(function (a,b) {
            return b.nice-a.nice;
        });
        if(list.length>3){
            this.rankUserList=list.slice(0,3)
        }else{
            this.rankUserList=list
        }
    },
    agreementCallback(params){
        this.notReadAgreement=params
        if(params=='accept'){
            this.readAgreement()
        }
    },
    goSwiperItem(url){
        window.open(url);
    },
    getContact() {
      let _this = this;
      YYIMChat.getRecentDigset({
        startDate: 0,
        size: 100,
        success: function(data) {
            if(data&&data.list){
                let hasUnReadMessage=data.list.some((item,index)=>{
                    return item.lastMessage&&item.sessionVersion>item.readedVersion;
                })
                if(hasUnReadMessage){
                    $(".message_tips").show();
                }
            }
        },
        error: function(err) {
            this.loadingShow=false;
        }
      });
    },
    readAgreement(){
        let postData={
            id:this.userInfo.userId,
            uExt3:'hasReadAgreement'
        }
        this.axios.put(this.ip +"/globalmate/rest/user/update/" +"?token=" +this.userInfo.token,postData).then(res=> {
            if (res.success) {
                this.notReadAgreement=true;
                if(!this.completePersonal()){
                    this.$router.push({
                        path: 'personalFile',
                        query: {
                            'token': this.userInfo.token,
                        }
                    });
                }
            }
          }).catch(e => {});
    },
    hasReadAgreementYet(){
        let _this=this;
        MessageBox.confirm('',{
            title: '',
            message: this.$t('totastTips.notReadAgreement'),
            confirmButtonText:_this.$t('button.confirm'),
            cancelButtonText:_this.$t('button.cancel'),
            showCancelButton: true
        }).then(action => {
            _this.notReadAgreement=false;
        }).catch(cancel=>{

        });
    },
    completePersonal(){
        let curUser=this.userInfo.curUser
        let flag=true;
        for(var key in curUser){
            if(key=='country'||key=='city'||key=='phone'||key=='helpAvailable'||key=='school'||key=='name'||key=='nikename'){
                if(!curUser[key]){
                    flag=false;
                }
            }
        }
        return flag;
    },
    toCompletePersonal(){
        let _this=this;
        MessageBox.confirm('',{
            title: '',
            message: this.$t('totastTips.notCompletePerosnal'),
            confirmButtonText:_this.$t('button.confirm'),
            cancelButtonText:_this.$t('button.cancel'),
            showCancelButton: true
        }).then(action => {
            _this.$router.push({
                path: 'personalFile',
                query: {
                    'token': _this.userInfo.token,
                }
            });
        }).catch(cancel=>{

        });
    },
    toIdentify(){
        this.$router.push({
          path: "identify",
          query: {
            token: this.userInfo.token,
            id: "identify"
          }
        });
    },
    initIM(callback) {
      let _this = this;
      YYIMChat.initSDK({
        app: "globalmate_test", //appId应用id
        etp: "zxy_test", //etpId企业id
        wsurl: "stellar.yyuap.com", //websocket Url
        wsport: 5227, //websocket port 5227/5222/5225
        servlet: "https://im.yyuap.com/", //rest Url
        hbport: 7075, //httpbind  port 7075/7070
        flash_swf_url: "xxx/x/Moxie.swf", //flash 上传 swf文件位置
        logEnable: true, //client log
        clientMark: "web", //client mark 'web' or 'pc'
        apiKey: ""
      });
      YYIMChat.init({
        onOpened: function() {
          // 登录成功
          YYIMChat.getVCard({
            success: function(res) {}
          });
          YYIMChat.getRecentDigset({
            startDate: 0,
            size: 100,
            success: function(data) {
              _this.updateMsgList(data.list);
            },
            error: function(err) {
                this.loadingShow=false;
              console.log(err);
            }
          });
        },
        onExpiration: function(callback) {
          //自动更新token
          //callback(token, expiration);
        },
        onClosed: function(arg) {
          //连接关闭
        },
        onConflicted: function(arg) {
          //登陆冲突
        },
        onClientKickout: function(arg) {
          //被他端踢掉
        },
        onUpdatePassword: function(arg) {
          //更改密码，被踢掉
        },
        onAuthError: function(arg) {
          //登陆认证失败
        },
        onConnectError: function(arg) {
          //连接失败
        },
        onReceipts: function(arg) {
          //消息回执
        },
        onSubscribe: function(arg) {
          //发生订阅
        },
        onRosterFavorited: function(arg) {
          //被收藏
        },
        onRosterUpdateded: function(arg) {
          //好友信息更改
        },
        onMessage: function(arg) {
          _this.dealMessage(arg);
          //收到消息,包括收到他人给自己发的消息和所有的群消息
        },
        onGroupUpdate: function(arg) {
          //群组更新
        },
        onKickedOutGroup: function(arg) {
          //群成员被群主提出
        },
        onTransferGroupOwner: function(arg) {
          //群主转让
        },
        onPresence: function(arg) {
          //好友presence改变
        },
        onRosterDeleted: function(arg) {
          //好友被删除
        },
        onPubaccountUpdate: function(pubaccounts) {
          //公共号信息更新
        },
        onTransparentMessage: function(arg) {
          //透传业务消息
        }
      });
      this.loginIM(callback);
      YYIMChat.onMessage();
    },
    loginIM(callback) {
      let username = this.userInfo.userId;
      if (!username) return;
      let obj = JSON.stringify({
        username: username,
        clientId: "44a18837b5acf71f0017772df15e1542",
        clientSecret: "959E5086D0544F36C915F91B624EA8DE"
      });
      this.axios.post("https://im.yyuap.com/sysadmin/rest/zxy_test/globalmate_test/token",obj,{
            headers: {
              "Content-Type": "application/json"
            }
          }).then(result => {
              let clientIdentify = "pc" + String(new Date().getTime());
              //登陆YYIMSDK
              YYIMChat.login({
                username: username,
                token: result.token,
                expiration: result.expiration,
                appType: 4,
                identify: clientIdentify
              });
              setTimeout(()=>{
                  callback&&callback();
              },50)

      }).catch(e=>{
          this.loadingShow=false;
          console.log(e);
      });
    },
    dealMessage(arg) {
      if (!arg) return;
      if (this.$route.name == "index") {
        $(".message_tips").show();
      } else if (this.$route.name == "im") {
        this.createOnMessage(arg);
      } else if (this.$route.name == "messageList") {
        this.appVue(arg)
      } else {
        Toast({
          message: this.$t('totastTips.receiveNewMessages'),
          duration: 2000
        });
      }
    },
  },
  activated() {
    this.mainmenu = [
      {
        title: this.$t("formName.study"),
        key: "learn_cooperation",
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
    if(this.language&&this.language.indexOf('en')>-1){
        this.isENAgreement=true;
        this.slides=[
            {
                url:url1,
                href:'https://filec4e884dad905.iamh5.cn/v3/idea/Z6UpbDQ5?suid=873B60AF-FFBA-48AD-B9D0-4611756E7F51&sl=0'
            },
            {
                url:url2,
                href:'https://c.xiumi.us/stage/v5/3sKti/105677692#/'
            },
            // {
            //     url:url3,
            //     href:'https://c.xiumi.us/stage/v5/3sKti/105677692#/'
            // },
        ]
    }else{
         this.slides=[
             {
                 url:url1,
                 href:'https://filec4e884dad905.iamh5.cn/v3/idea/oJCwKPB3?suid=873B60AF-FFBA-48AD-B9D0-4611756E7F51&sl=0'
             },
             {
                 url:url2,
                 href:'https://a.xiumi.us/stage/v5/3sKti/105817735#/'
             },
            //  {
            //      url:url3,
            //      href:'https://a.xiumi.us/stage/v5/3sKti/105817735#/'
            //  },
         ]
        this.isENAgreement=false;
    }
    if (this.userInfo.token&& this.userList && this.userList.length) {
       this.getRank();
       this.getCurrentUser()
       this.initIM(this.getContact)
    } else {
      this.timer = setInterval(() => {
        if (this.userInfo.token&& this.userList && this.userList.length) {
          this.getRank();
          this.getCurrentUser()
          this.initIM(this.getContact)
          clearInterval(this.timer);
        }
      }, 200);
    }
    if(this.userInfo&&this.userInfo.curUser){
        if(!this.userInfo.curUser.uExt3){
            this.notReadAgreement=false;
        }
    }else{
        this.timer1 = setInterval(() => {
            if(this.userInfo&&this.userInfo.curUser){
                 clearInterval(this.timer1);
                 if(!this.userInfo.curUser.uExt3){
                     this.notReadAgreement=false;
                 }
            }
        }, 200);
    }
  },
  deactivated() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
  },
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
  font-size: 14px;
  color: #999;
}
.rank ul {
    min-height: 80px;
    padding: 6px 0.6rem;
}
.rank ul li {
  display: inline-block;
  width: 1.4rem;
  margin-right: 0.94rem;
  overflow: hidden;
  position: relative;
}
.rank ul li>img{
    width: .48rem!important;
    height: .48rem!important;
    position: absolute;
    left: 0;
    top: 0;
}
.rank ul li span{
    color: #333;
    font-size: 13px;
}
.rank ul li a img:first-child {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: inline-block;
}
.rank ul li a .gl_cetifiy_medal{
    position: absolute;
    bottom: 14px!important;
    right: 0;
    width: 0.5rem;
    height: 0.5rem;
    box-shadow: -1px 1px 2px #fff;
    border-radius: 50%;
}
.rank_title {
  padding: 7px 0.22rem;
  display: flex;
}
.service_star_title > div {
  /*flex: 1;*/
  width: 50%;
}
.service_star_title .left {
  text-align: left;
}
.service_star_title .right {
  text-align: right;
}
.rank ul li:last-child {
  margin: 0;
}

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
  box-shadow: 0px 2px 2px 1px rgba(178, 178, 178, 1);
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
  border-right: 2px solid #eee;
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
  padding-left: .4rem;
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
