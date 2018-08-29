<template>
  <div id="app">
    <transition :name='transitionName'>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import userMix from "./mixins/userInfo";
import { Toast } from "mint-ui";
import Vue from 'vue'
import './assets/css/global.css'
Vue.component(Toast.name, Toast)
export default {
  name: "App",
  mixins: [userMix],
  data() {
    return {
      transitionName: "",
      messageList: [],
      code: "",
      userId: '',
      openId: ''
    };
  },
  methods: {
    handleParam(str) {
      const codeReg = /code\=([0-9a-zA-Z\-\_]+)/;
      let match = str.match(codeReg);
      if (match && match.length === 2 && match[1]) {
        this.code = match[1];
      }
      const userIdReg = /userId\=([0-9a-zA-Z\-\_]+)/;
      match = str.match(userIdReg);
      if (match && match.length === 2 && match[1]) {
        this.userId = match[1];
        this.updateUserInfo({
          userId: match[1]
        })
      }
      const openIdReg = /openId\=([0-9a-zA-Z\-\_]+)/;
      match = str.match(openIdReg);
      if (match && match.length === 2 && match[1]) {
        this.openId = match[1];
        this.updateUserInfo({
          openId: match[1]
        })
      }
    },
    getRouter(str) {
      const reg = /router\=([a-zA-Z]+)/;
      const match = str.match(reg);
      if (match && match.length === 2 && match[1]) {
        return match[1];
      }
      return "";
    },
    setrem() {
      var docEl = window.document.documentElement;
      var width = docEl.getBoundingClientRect().width;
      var rem = width / 7.5;
      docEl.style.fontSize = rem + "px";
    },
    dealMessage(arg) {
      if (!arg) return;
      if (this.$route.name == "index") {
        $(".message_tips").show();
      } else if (this.$route.name == "im") {
        this.createOnMessage(arg);
      } else if (this.$route.name == "messageList") {
        // this.appVue(arg)
      } else {
        Toast({
          message: "收到新消息，前往消息列表查看",
          duration: 2000
        });
      }
    },
    createOnMessage(arg) {
      let headerPath = require("./assets/images/icon.png");
      if (!arg) return;
      if (!arg.pic) {
        arg.pic = headerPath;
      }
      let $li,
        _this = this;
      let obj = {};
      try {
        let content = JSON.parse(arg.data.content);
        if (content && content.chatType && !content.chatContent) {
        } else {
          $li = $(
            '<li class="left-item"> <img src="' +
              arg.pic +
              '" alt=""/> <div class="chat-item-text ">' +
              content.chatContent +
              "</div> </li>"
          );
          obj["chatContent"] = content.chatContent;
        }
      } catch (e) {
        $li = $(
          '<li class="left-item"> <img src="' +
            arg.pic +
            '" alt=""/> <div class="chat-item-text ">' +
            arg.data.content +
            "</div> </li>"
        );
        obj["chatContent"] = arg.data.content;
      }
      obj["pic"] = arg.pic;
      obj["type"] = true;
      $("#chat-thread").append($li);
      let top = $("#convo").height();
      $("#content").animate(
        {
          scrollTop: top
        },
        100
      );
    },
    initIM() {
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
              startDate:0,
              size: 100,
              success:function(data){
                  _this.updateMsgList(data.list);
              },
              error:function(err){
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
      this.loginIM();
      YYIMChat.onMessage();
    },
    loginIM() {
      // let username = .getItem("USERID");
      let username = this.userInfo.userId;
      if (!username) {
        username = this.userInfo.userPhone;
        // username = .getItem("USERPHONE");
      }
      if (this.userInfo["curUser"]) {
        username = this.userInfo["curUser"].id;
      }
      // if (.getItem("gl_CURRENTUSER")) {
      //   username = JSON.parse(.getItem("gl_CURRENTUSER")).id;
      // }
      if (!username) return;
      let obj = JSON.stringify({
        username: username,
        clientId: "44a18837b5acf71f0017772df15e1542",
        clientSecret: "959E5086D0544F36C915F91B624EA8DE"
      });
      this.axios
        .post(
          "https://im.yyuap.com/sysadmin/rest/zxy_test/globalmate_test/token",
          obj,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(result => {
          let clientIdentify = "pc" + String(new Date().getTime());
          //登陆YYIMSDK
          YYIMChat.login({
            username: username,
            token: result.token,
            expiration: result.expiration,
            appType: 4,
            identify: clientIdentify
          });
        });
    },
    loadIsCertified() {
      this.axios
        .get(this.ip + "/globalmate/rest/certify/list", {
          params: {
            onlyCurrentUser: true,
            token: this.userInfo.token
          }
        })
        .then(res => {
          if (res.data && res.data.length) {
            let flag = res.data.some(item => item.isEffective !== 0);
            this.updateUserInfo({
              certifyMsg: res.data,
              identified: flag  // 判断是否通过认证了
            });
          }
        });
    },
    getToken (paramName, val) {
      this.axios.get(this.ip + "/globalmate/rest/user/getToken", {
        params: {
          [paramName]: val
        }
      }).then(res => {
        if (res.success) {
          // .setItem("TOKEN", res.data.data);
          this.updateUserInfo({
            token: res.data
          });
        }
      }).catch();
    },
    loadUserMsg(code) {
      let url =
        this.ip + "/globalmate/rest/wechat/oauth/oauthCb?code=" + this.code;
      this.axios.get(url).then(result => {
        var data = result.data;
        if (data && data.token) {
          const token = data.token;
          const userId = data.user.id;
          const openId = data.user.openid;
          this.updateUserInfo({
            token,
            userId,
            openId
          });
          this.loadIsCertified();
        }
      }).catch();
   },
  },
  created() {
    this.handleParam(window.location.href);
    if (this.code) {
      this.loadUserMsg(this.code);
    } else if (this.userId) {
      this.getToken('userId', this.userId)
    } else if (this.openId) {
      this.getToken('openId', this.openId)
    } else {
      // window.location.replace("/dist/static/login.html");
    }
    let router = this.getRouter(window.location.href);
    if (router) {
      this.$router.push({
        name: router
      });
    }
    this.setrem();
    if (window.YYIMChat) {
      this.initIM();
    } else {
      this.timer = setInterval(() => {
        if (window.YYIMChat) {
          this.initIM();
          clearInterval(this.timer);
        }
      }, 300);
    }
  },
  watch: {
    $route(to, from) {
      //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > 0) {
        if (to.meta.index < from.meta.index) {
          this.transitionName = "slide-right";
        } else {
          this.transitionName = "slide-left";
        }
      } else if (to.meta.index == 0 && from.meta.index > 0) {
        this.transitionName = "slide-right";
      }
      if (from.name === null && to.meta.index === 1) {
        this.transitionName = "";
      }
      //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
      /*if( to.meta.index < from.meta.index){
                      this.transitionName = 'slide-right';
                }else{
                      this.transitionName = 'slide-left';
                }*/
    }
  }
};
</script>

<style>
@import "../static/css/style.css";
#app {
  font-family: "PingFangSC-Regular", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: absolute;
  width: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}
</style>
