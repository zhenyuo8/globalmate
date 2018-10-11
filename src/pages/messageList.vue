<style scoped lang='less'>
.messageList {
  font-size: 12px;
  color: #999;
}

.image_chat {
  width: 1rem;
  height: 1rem;
  position: relative;
  .gl_notreadmessage_count{
      position: absolute;
      top: -6px;
      right: -.08rem;
      background: red;
      color: #fff;
      border-radius: .2rem;
      min-width: .2rem;
      padding: 0 .06rem;
      font-size: 12px;
  }
}
.image_chat_after::after {
  content: "";
  clear: both;
  position: absolute;
  width: 0.16rem;
  height: 0.16rem;
  border-radius: 50%;
  background: red;
  right: -0.08rem;
  top: -0.08rem;
}
.image_chat img {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.message_warp ul {
  padding-left: 0.2rem;
}
.message_warp ul li {
  display: flex;
  flex-direction: row;
  padding: 10px 0.2rem 10px 0;
  border-bottom: 1px solid #eee;
  position: relative;
}
.content_chat {
  margin-left: 0.2rem;
  position: relative;
  flex: 1;
  overflow: hidden;
}
.content_chat span {
  display: block;
  text-align: left;
  padding: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 50%;
}
.content_chat .time_chat {
  position: absolute;
  right: 0;
  top: 0;
}
.content_chat .name_chat {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}
ul > li:last-child {
  border: none;
}
.message_warp > p {
  padding: 6px 0.2rem;
  color: #333;
  text-align: left;
  font-size: 14px;
  background: #eee;
}
.request_action {
  position: absolute;
  right: 0.3rem;
  top: 50%;
}
.request_action span {
  font-size: 14px;
  color: #fff;
  padding: 0.16rem 0.25rem;
  border-radius: 4px;
  display: inline-table;
  margin-left: 0.2rem;
  &.accept {
    background: linear-gradient( 103.8deg, #3cb65f, green);
  }
}

</style>
<style media="screen" lang="less">
    .message_warp{
        background: #eee;
        .mint-navbar .mint-tab-item{
            padding: 10px 0;
        }
        .mint-tab-item .mint-tab-item-label{
            font-size: 14px!important;
            position: relative;
            .gl_notreadmessage_count{
                position: absolute;
                top: -6px;
                right: 0.8rem;
                background: red;
                color: #fff;
                border-radius: .2rem;
                min-width: .2rem;
                padding: 0 .06rem;
                font-size: 12px;
            }
        }
        .mint-tab-container{
            margin-top: 10px;
            background: #fff;
        }
        .gl_receive_new:before{
            content: '';
            clear: both;
            width: .16rem;
            height: .16rem;
            border-radius: 50%;
            z-index: 1111;
            position: absolute;background: red;
            right: 0.2rem;
            top: 50%;
        }
    }
</style>

<template>

  <div class="messageList">
    <div class="message_warp">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">{{$t('messagePage.friends')}} <i class="gl_notreadmessage_count" v-show="friendsUnRead>0">{{friendsUnRead}}</i></mt-tab-item>
          <mt-tab-item id="2">{{$t('messagePage.concat')}} <i class="gl_notreadmessage_count" v-show="concatsUnRead>0">{{concatsUnRead}}</i></mt-tab-item>
        </mt-navbar>
         <mt-tab-container v-model="selected">
           <mt-tab-container-item id="1">
             <ul v-if="friends.length!=0" class="friends_im_ul">
               <li v-for="(item,index) in friends" @click="goIm(item,'f')" :key='index' :class="item.receive_new?'gl_receive_new':''">
                 <div class="image_chat" :class="item.newMessage?'image_chat_after':''">
                   <img :src="item.users.pic+'?x-oss-process=image/resize,m_fixed,h_65,w_65'" v-if='item.users.pic' alt="">
                   <img src='../assets/images/icon.png' v-if='!item.users.pic' alt="">
                   <i class="gl_notreadmessage_count" v-if="item.sessionVersion>item.readedVersion">{{item.sessionVersion-item.readedVersion}}</i>
                 </div>
                 <div class="content_chat">
                   <span class="name_chat">{{item.users.nikename}}</span>
                   <span class="detail_chat">{{item.lastMessageContent}}</span>
                   <span class="time_chat">{{item.lastContactTime}}</span>
                 </div>
               </li>
             </ul>
             <span v-if="friends.length==0" style="padding:10px;">{{$t('formTitle.noFriends')}}</span>
           </mt-tab-container-item>
           <mt-tab-container-item id="2">
             <ul class="gl_contact contact_im_ul" v-if="list.lengt!=0">
               <li v-for="(item,index) in list" @click="goIm(item,'c')" :key='index' :class="item.receive_new?'gl_receive_new':''">
                 <div class="image_chat" :class="item.newMessage?'image_chat_after':''">
                   <img :src="item.users.pic" alt="" v-if='item.users.pic'>
                   <img src='../assets/images/icon.png' v-if='!item.users.pic' alt="">
                   <i class="gl_notreadmessage_count" v-if="item.sessionVersion>item.readedVersion">{{item.sessionVersion-item.readedVersion}}</i>
                 </div>
                 <div class="content_chat">
                   <span class="name_chat">{{item.users.nikename}}</span>
                   <span class="detail_chat">{{item.lastMessageContent}}</span>
                   <span class="time_chat">{{item.lastContactTime}}</span>
                 </div>
                 <div class="request_action" v-show="item.isAddFriends&&item.lastMessage.from!=currentUserId">
                   <span class="accept" @click='agreeAddFriend($event,item)'>{{$t('button.agree')}}</span>
                 </div>
               </li>
             </ul>
             <span v-if="list.length==0&&!loadingShow" style="padding:10px;">{{$t('formTitle.noContact')}}</span>
           </mt-tab-container-item>
         </mt-tab-container>


    </div>
    <div class="defindloadig" v-if="loadingShow">
      <loading></loading>
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import loading from "../components/loading.vue";
import { MessageBox, Toast,Navbar, TabItem ,TabContainer, TabContainerItem,Loadmore} from "mint-ui";
Vue.component(Loadmore.name, Loadmore);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
import userMix from "../mixins/userInfo";
export default {
  name: "messageList",
  mixins: [userMix],
  components: {
    loading
  },
  data() {
    return {
      friends: [],
      list: [],
      friendsIdList: [],
      addFriedsRequestList: [],
      loadingShow: false,
      currentUserId: "",
      selected:'1',
      nofriends:false,
      concatsUnRead:0,
      friendsUnRead:0,

    };
  },
  methods: {

    /**
     * 同意对方加好友请求glohelp添加好友
     * @param  {[event]} e    [阻止冒泡事件]
     * @param  {[Object]} item [gl加好友]
     * @return {[type]}      [description]
     */
    agreeAddFriend(e, item) {
      e = e ? e : window.event;
      e.preventDefault();
      event.stopPropagation();
      e.cancelBubble = true;
      let _this = this;
      MessageBox.confirm("", {
        title: "",
        message: this.$t('formTitle.agreeAddFriendRequest'),
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        showCancelButton: true
      }).then(action => {
          //同时添加 IM好友关系
          YYIMChat.addRosterItem(item.id);
          // 消息已读回执
           YYIMChat.sendReadedReceiptsPacket({
          	to: item.lastMessage.from,
          	id: item.lastMessage.id,
          	type: 'chat',
          	sessionVersion: item.lastMessage.sessionVersion
           });
           item.readedVersion=item.sessionVersion
          setTimeout(() => {
            _this.getFriendsInIM();
          }, 1000);
          _this.axios.get(_this.ip +"/globalmate/rest/userRelation/addFriend?token=" +_this.$route.query.token +"&targetUserId=" +item.id, {
                targetUserId: item.id
              }).then(res => {
              if (res.success) {
                _this.getFriendsInGlohelp();
              }
            }).catch(e => {});
        })
        .catch(cancel => {});
    },

    /**
     * 获取glohelp好友关系
     * @return {[type]} [description]
     */
    getFriendsInGlohelp() {
        let _this=this;
          this.axios.get(this.ip +"/globalmate/rest/userRelation/getFriends",{
              params:{
                  userId: this.CURRENTUSER.id,
                  token:this.userInfo.token
              }
           }).then(res => {
           if (res.success) {
             // _this.updateFriendsList(res.data)
             this.loadingShow = false;
           }
        }).catch(e => {
            this.loadingShow = false;
        });
    },

    goIm(item,params) {
        // 消息已读回执
        let _this=this;
         YYIMChat.sendReadedReceiptsPacket({
        	to: item.lastMessage.from,
        	id: item.lastMessage.id,
        	type: 'chat',
        	sessionVersion: item.lastMessage.sessionVersion
         });
         item.readedVersion=item.sessionVersion;
         if(params=='f'){
             if(_this.friendsUnRead&&_this.friendsUnRead>1){
                  _this.friendsUnRead-=1;
             }else if(_this.friendsUnRead==1){
                 _this.friendsUnRead=0;
             }
         }
         if(params=='c'){
             if(_this.concatsUnRead&&_this.concatsUnRead>1){
                  _this.concatsUnRead--;
             }else if(_this.concatsUnRead==1){
                 _this.concatsUnRead=0;
             }
         }



         let chatItemId = "";
         item.receive_new=false;
         if (item.lastMessage &&item.lastMessage.data &&item.lastMessage.data.content) {
             try {
               chatItemId = JSON.parse(item.lastMessage.data.content).item;
             } catch (e) {
               chatItemId = "";
             }
         }

         this.$router.push({
             path: "im",
             query: {
               token: this.$route.query.token,
               title: item.users.nikename,
               senderDId: item.to,
               toChartId: item.users.id,
               chatItemId: chatItemId
             }
         });
    },
    /**
     * 获取IM好友
     * @return {[type]} [description]
     */
    getFriendsInIM() {
      let _this = this;
      YYIMChat.getRosterItems({
        success: function(data) {
          if (data) {
              try{
                  let mess=JSON.parse(data);
                  if(mess.length>0){
                      for (var i = 0; i < mess.length; i++) {
                          _this.friendsIdList.push(mess[i].id);
                      }
                  }
              }catch(e){
                  console.log(e);
              }
            }
            _this.getContact();
        },
        error: function(err) {
            this.loadingShow=false;
            console.log(err);
        },
        complete: function() {}
      });
    },
    /**
     * 获取单个用户的历史聊天记录
     * @param  {[type]}   id       [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    getHistory(id, callback) {
      var _this = this;
      YYIMChat.getHistoryMessage({
        id: id,
        type: "chat",
        contentType: 2,
        start: 0,
        size: 150,
        startVersion: 0,
        endVersion: 100,
        success: function(data) {
            this.loadingShow = false;
          if (data.result && data.result.length != 0) {
            var result = data.result;
            var len = result.length - 1;
            for (var i = len; i >= 0; i--) {
              if (result[i].data.content.indexOf("add_friends_request") > -1) {
                callback && callback(false);
                return;
              }
            }
            callback && callback(true);
            return;
          }
          callback && callback(true);
          return;
        },
        error: function(err) {
            this.loadingShow=false;
        }
      });
    },
    processList(friends) {
      let mess = friends,
        _this = this;
      this.list = [];
      mess.sort(function (a,b) {
           return b.lastContactTime- a.lastContactTime
       });

      for (var i = 0; i < mess.length; i++) {
        let temp = mess[i];
        this.axios.get(this.ip +"/globalmate/rest/user/list/" + mess[i].id,{
            params:{
                token:this.userInfo.token
            }
        }).then(res => {
            if (res.success) {
              if (res.data) {
                temp["users"] = res.data;
                if (
                  temp.lastMessage &&
                  temp.lastMessage.data &&
                  temp.lastMessage.data.content
                ) {
                  try {
                    temp["lastMessageContent"] = JSON.parse(
                      temp.lastMessage.data.content
                    ).chatContent;
                    if (temp["lastMessageContent"].indexOf("style=") > -1) {
                      temp["lastMessageContent"] = this.$t('formTitle.befriends');
                    }
                  } catch (e) {
                    temp["lastMessageContent"] = temp.lastMessage.data.content;
                  }
                }
                temp['receive_new']=false;

                let secondsCalculate=this.moment().valueOf()-this.moment(temp.lastContactTime).valueOf();
                if(secondsCalculate<24*60*60*1000){
                    let hour=this.moment(temp.lastContactTime).startOf("HOUR").fromNow().split(' ')[0];
                    hour=hour=='an'?'1'+this.$t('timeago.hourago'):hour+this.$t('timeago.hoursago');
                     temp.lastContactTime = hour;
                }else if(secondsCalculate<7*24*60*60*1000){
                    let day=this.moment(temp.lastContactTime).startOf("DAY").fromNow().split(' ')[0];
                     temp.lastContactTime = day+this.$t('timeago.daysago');
                }else{
                    temp.lastContactTime = this.moment(temp.lastContactTime).format("YYYY-MM-DD");
                }


                if (!this.friendsIdList.includes(temp.id)) {
                  this.getHistory(temp.id, function(params) {
                    if (!params) {
                      temp.isAddFriends = true;
                    }
                    if(temp.sessionVersion>0){
                        if(temp.sessionVersion>temp.readedVersion){
                            _this.concatsUnRead+=1;
                            _this.list.unshift(temp);
                        }else{
                            _this.list.push(temp);
                        }
                    }
                  });
                } else {
                    if(temp.sessionVersion>0){
                        if(temp.sessionVersion>temp.readedVersion){
                            _this.friendsUnRead+=1;
                            this.friends.unshift(temp);
                        }else{
                            this.friends.push(temp);
                        }
                    }
                }
                this.loadingShow = false;
              }
            } else {
              this.loadingShow = false;
            }
          }).catch(e => {
            this.loadingShow = false;
          });
      }
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
    appVue(message) {
      let _this = this;
      var temp;
      let inFriends=this.friends.some((item,index)=>{
          return item.id==message.from;
      });
      if(inFriends){
          let temFriends;
          for(let i=0;i<this.friends.length;i++){
              if(this.friends[i].id==message.from){
                  temFriends=this.friends[i];
                  this.friends.splice(i,1);
                  temFriends.lastMessageContent=JSON.parse(message.data.content).chatContent;
                  temFriends.lastContactTime=this.$t('timeago.now')
                  temList.sessionVersion++;
                  temList.lastMessage.sessionVersion++;
                  if((temList.sessionVersion-temList.readedVersion)==1){
                       _this.friendsUnRead+=1;
                  }
              }
          }
          this.friends.unshift(temList)
      }else{
          let inContact=this.list.some((item,index)=>{
              return item.id==message.from;
          })
          if(inContact){
              let temList;
              for(let i=0;i<this.list.length;i++){
                  if(this.list[i].id==message.from){
                      temList=this.list[i];
                      this.list.splice(i,1);
                      if(JSON.parse(message.data.content).chatType==='add_friends_request'){
                          temList.lastMessageContent=this.$t('formTitle.befriends');
                      }else{
                          temList.lastMessageContent=JSON.parse(message.data.content).chatContent;
                      }
                      temList.lastContactTime=this.$t('timeago.now');
                      temList.sessionVersion++;
                      temList.lastMessage.sessionVersion++;
                      if((temList.sessionVersion-temList.readedVersion)==1){
                           this.concatsUnRead+=1;
                      }
                  }
              }
              this.list.unshift(temList)
          }else{
              let newContact={
                  id:message.from,
                  receive_new:true,
                  lastMessage:message,
              }
              newContact['users']=this.userList.find((item,index)=>{
                  return item.id==message.from;
              });
              newContact['lastMessageContent']=JSON.parse(message.data.content).chatContent;
              newContact['lastContactTime']=this.$t('timeago.now');
              this.getHistory(message.id, function(params) {
                if (!params) {
                  newContact.isAddFriends = true;
                }
                _this.concatsUnRead+=1;
                _this.list.unshift(newContact)
              });

          }
      }


    },
    /**
     * 获取IM联系人
     * @return {[type]} [description]
     */
    getContact() {
      let _this = this;
      YYIMChat.getRecentDigset({
        startDate: 0,
        size: 100,
        success: function(data) {
            if(data&&data.list&&data.list instanceof Array){
                _this.processList(data.list);
                if(data.list.length==0){
                    _this.nofriends=true;
                }
            }
        },
        error: function(err) {
            this.loadingShow=false;
        }
      });
    },
    getUserByToken() {
      this.axios.get(this.ip + "/globalmate/rest/user/getUserByToken",{
            params:{
                token:this.userInfo.token
            }
        }).then(res => {
          if (res.success) {
            this.currentUserId = res.data.id;
            this.getFriendsInIM();
          }
        }).catch(e => {
            this.loadingShow = false;
          console.log(e);
        });
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
      this.loginIM();
      YYIMChat.onMessage();
    },
    loginIM() {
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
      }).catch(e=>{
          this.loadingShow=false;
          console.log(e);
      });
    },
  },
  activated() {
      this.friends=[];
      this.list=[];
      this.concatsUnRead=0;
      this.friendsUnRead=0;
      if(this.friends&&this.friends.length!=0) return;

      if (this.userInfo&&this.userInfo.token) {
          this.loadingShow = true;
         this.getUserByToken();
         this.initIM()
      } else {
          let i=1;
        this.timer = setInterval(() => {
          if (this.userInfo&&this.userInfo.token) {
              this.loadingShow = true;
              i=1;
            this.getUserByToken();
            this.initIM()
            clearInterval(this.timer);
          }
          i++;
          if(i==20){
              clearInterval(this.timer);
              Toast({
                message: this.$t('totastTips.networkerror'),
                duration: 2000
              });
              i=1;
              setTimeout(()=>{
                  window.history.back(-1);
              },2500);
              this.loadingShow=false;
          }
        }, 200);
      }
  },
  deactivated() {
    clearInterval(this.timer);
  },
  created() {}
};
</script>
