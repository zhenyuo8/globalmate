<template>
  <div class="login" id='login'>
    <form action="" onsubmit='return false'>
      <p>
        <!-- <label for="phonesignup" class="youphone" data-icon="p">手机 </label> -->
        <input id="phonesignup" name="phonesignup" required="required" type="number" placeholder="账号" />
      </p>
      <p>
        <!-- <label for="passwordsignup" class="youpasswd" data-icon="p">密码 </label> -->
        <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="密码" />
      </p>
      <p class="signin button">
        <input type="button" value="登入" @click='login' />
      </p>
      <p class="change_link">
        还未注册账号?
        <a href="javascript:;" class="to_register" @click='goRegister'> 注册 </a>
      </p>
    </form>
  </div>
</template>

<script>
import userMix from "../mixins/userInfo";
export default {
  mixins: [userMix],
  components: {},
  data() {
    return {
      showTips: false,
      showTipsText: ""
    };
  },
  methods: {
    login() {
      let postData = this.getRegisterData();
      let url =
        this.ip +
        "/globalmate/rest/user/login/" +
        postData.phone +
        "/" +
        postData.password;
      this.axios
        .get(url, {})
        .then(res => {
          if (res.success) {
            // .setItem("TOKEN", res.data.data);
            // .setItem("USERPHONE", postData.phone);
            this.updateUserInfo({
              token: res.data,
              userPhone: postData.phone
            });
            this.getUserByToken(res.data);
            setTimeout(() => {
              window.history.go(-1);
            }, 1000);
          } else {
            this.showTipsText = "网络异常,请稍后再试!";
          }
        })
        .catch(e => {
          this.showTipsText = "网络异常,请稍后再试!";
        });
    },
    getUserByToken(token) {
      this.axios
        .get(
          this.ip + "/globalmate/rest/user/getUserByToken" + "?token=" + token,
          {}
        )
        .then(res => {
          if (res.success) {
            this.CURRENTUSER = res.data;
            this.updateUserInfo({
              curUser: res.data,
              userId: res.data.id
            });
            this.initIM();
            // .setItem(
            //   "gl_CURRENTUSER",
            //   JSON.stringify(res.data.data)
            // );
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getRegisterData() {
      let postData = {
        password: "",
        phone: ""
      };
      postData.password = this.$el.querySelector("#passwordsignup").value;
      postData.phone = this.$el.querySelector("#phonesignup").value;
      return postData;
    },
    goRegister() {
      this.$router.push({
        path: "register",
        query: {
          title: "注册"
        }
      });
    },
    dealMessage(arg) {
      if (!arg) return;
      if (this.$route.name == "index") {
        $(".message_tips").show();
      } else if (this.$route.name == "im") {
        this.createOnMessage(arg);
      } else if (this.$route.name == "messageList") {
        console.log(arg, 11111);
        // this.appVue(arg)
      } else {
        Toast({
          message: "收到新消息，前往消息列表查看",
          duration: 2000
        });
      }
    },
    createOnMessage(arg) {
      let headerPath = require("../assets/images/icon.png");
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
            startDate: 0,
            size: 100,
            success: function(data) {
              _this.updateMsgList(data.list);
            },
            error: function(err) {
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
    }
  },
  activated() {},
  created() {}
};
</script>

<style scoped>
h1 {
  font-size: 18px;
  height: 54px;
  line-height: 54px;
}
form p {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  color: #9b9b9b;
  margin-top: 12px;
  width: 70%;
  margin: 12px auto 0;
}
form {
  padding: 10px;
}
form label {
  margin-right: 0.2rem;
  color: #333 !important;
}
form p input {
  font-size: 14px;
  height: 76%;
  padding: 2px 4px;
  color: #ff4a5a;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #fff;
}
.signin input {
  width: 104%;
  height: 100% !important;
  color: #fff !important;
  background: #ff4a5a;
  outline: none;
  border: none;
  font-size: 16px !important;
}
input {
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
  border: none;
}
input:focus {
  outline: none;
}

#login {
  position: absolute;
  top: 0px;
  right: 0;
  left: 0;
  bottom: 0;
  width: 88%;
  height: 230px;
  margin: auto;
  background: rgb(247, 247, 247);
  border: 1px solid rgba(153, 153, 153, 0.1);
  box-shadow: 0pt 2px 5px rgba(105, 108, 109, 0.7),
    0px 0px 8px 5px rgba(208, 223, 226, 0.1) inset;
  border-radius: 5px;
}
</style>
