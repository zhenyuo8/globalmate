<template>
  <div class="um-win um-page" id="main">
    <div class="um-content p5" id="content">
      <div class="im_top_fix" v-show="id||idListAviavlable">
        <div class="chart_main_content">
          <div class="chart_main_content_image" @click="showDetail('detail')">
            <div class="">
              <img :src="othersInfo.pic" v-if="othersInfo.pic" alt="" class="gl_user_img">
              <img src="../assets/images/icon.png" v-if="!othersInfo.pic" alt="" class="gl_user_img">
              <img :src="othersInfo.userTag=='vGold'?vGold:othersInfo.userTag=='vSilver'?vSilver:''" v-if="othersInfo.userTag&&othersInfo.userTag!='vCopper'" alt="" class="gl_cetifiy_medal">
            </div>
          </div>
          <div class="chart_main_content_decription" @click='showDetail()'>
            <span class="detail_nikename">{{othersInfo.nikename}}</span>
            <span class="detail_name">{{detail.tag}} : {{detail.title}}</span>
            <span class="detail_brand">{{detail.where}}</span>
          </div>
          <div class="chart_main_content_action" v-show="detail.enable==1">
            <span class='' :class="hasSelectAready?'do_help_grey':'do_help'" @click="selectWhoHelp()" v-show="!others">{{$t('button.selectHelp')}}</span>
          </div>
          <div class="detail_status" :class="'status_'+detail.enable">
            {{detail.status}}
          </div>
        </div>

      </div>
      <div id="convo" class="convo" :class="(id||idListAviavlable)?'':'gl_no_item'">
        <ul class="chat-thread" id="chat-thread">
          <li :class="item.type?'left-item':'right-item'" v-for="(item,index) in historyList" @click='showInfo(item)' :key='index'>
            <img :src="item.pic" alt="">
            <div class="chat-item-text">
                <i>{{item.time}}</i>
              {{item.chatContent}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="um-remind-read" @click="remindRead">{{$t('button.remind')}}</div>
    <div class="um-footer">
      <div class="chat-input-box">
        <!-- <img src="../assets/images/speech.png" alt="" class="change-input-type" data-flag='speech' /> -->
        <span class="icon-add change-input-type" @click="sendFileIm"></span>

        <div class="show-input">
          <input type="text" class="form-control chat-input" placeholder="" v-model='chartValue' @keyup.enter="createUserTalk()" @focus="scrollTop()" @blur="inputBlur()"/>
          <button class="btn chat-send" @click='createUserTalk()'>
            {{$t('button.send')}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { MessageBox, Toast } from "mint-ui";
import userMix from "../mixins/userInfo";

export default {
  mixins: [userMix],
  data() {
    return {
      chartValue: "",
      id: "",
      taskId: "",
      toChartId: "",
      detail: {
        title: "",
        type: "",
        where: ""
      },
      imageArr: [],
      others: false,
      hasSelectAready: false,
      historyList: [],
      othersInfo: {},
      vGold: require("../assets/images/vGold.png"),
      vSilver: require("../assets/images/vSilver.png"),
      vCopper: require("../assets/images/vCopper.png"),
      idList:[],
      idListAviavlable:false
    };
  },
  methods: {
    showInfo(item) {
      if (item.type) {
        this.showPersonal();
      } else {
        this.showMySelf();
      }
    },
    showDetail(detail) {
      if (this.$route.query && this.$route.query.fromDetail === "true") {
        this.$router.go(-1);
        return;
      }
      if (detail) {
        this.showPersonal();
      } else {
        this.$router.push({
          path: "detail",
          query: {
            token: this.userInfo.token,
            id: this.id,
            otherUserId: ""
          }
        });
      }
    },
    showPersonal() {
      this.$router.push({
        path: "mineInformation",
        query: {
          token: this.userInfo.token,
          title: this.othersInfo.name,
          otherUserId: this.othersInfo.id,
          id: this.othersInfo.id
        }
      });
    },
    showMySelf() {
      this.$router.push({
        path: "mineInformation",
        query: {
          token: this.userInfo.token,
          otherUserId: this.userInfo.userId,
          id: this.userInfo.userId
        }
      });
    },
    /**
     * 选择当前用户帮忙
     * @return {[type]} [description]
     */
    selectWhoHelp() {
      let _this = this;
      if (this.detail.enable != 1) {
        Toast({
          message: this.$t("totastTips.completedOrExecution"),
          duration: 2000
        });
        return;
      }
      MessageBox.confirm("", {
        title: "",
        message:
          this.$t("totastTips.comfirmAddFriendE") +
          _this.othersInfo.nikename +
          this.$t("totastTips.comfirmAddFriendA"),
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        showCancelButton: true
      })
        .then(action => {
          _this.confirmWhoHelp();
        })
        .catch(cancel => {});
    },
    confirmWhoHelp() {
      this.axios
        .get(this.ip + "/globalmate/rest/assist/" + this.detail.id + "/agree", {
          params: {
            token: this.userInfo.token,
            providerId: this.othersInfo.id
          }
        })
        .then(res => {
          if (res.success) {
            this.hasSelectAready = true;
            this.detail.status = this.$t("status.execute");
            this.detail.enable = 2;
          } else {
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    createUserTalk(arg) {
      let headerPath = require("../assets/images/icon.png");
      if (!this.currentUserImgae) {
        this.currentUserImgae = headerPath;
      }
      let $li,
        _this = this;
      let obj = {};
      if (!arg) {
        if (!this.chartValue) return;
        let content = {
          item: this.$route.query.id,
          chatContent: this.chartValue,
          chatType: ""
        };
        
        YYIMChat.sendTextMessage({
          to: this.$route.query.toChartId + "",
          type: "chat",
          content: JSON.stringify(content),
          body: {},
          success: function(data) {
            if(!_this.hasSeachInList&&!_this.hasSeachInList){
              _this.searchInChatList(_this.addInChatList)
            }
          },
          error: function(err) {
            console.log(err);
          }
        });
        obj["time"] = new Date().valueOf();
        var timedetail = _this
          .moment(obj["time"])
          .calendar()
          .split("at")[1];
        var moonOrAfter =
          $.trim(timedetail).split(" ")[1] == "PM" ? "下午 " : "上午 ";
        var showTime = moonOrAfter + $.trim(timedetail).split(" ")[0];
        if (this.isNeedShowTimeSend) {
          if (obj["time"] - this.isNeedShowTimeSend > 60 * 1000) {
            var $li1 = $('<li class="gl_im_time"><i>' + showTime + "</i></li>");
            $("#chat-thread").append($li1);
            this.isNeedShowTimeSend = obj["time"];
          }
        } else {
          this.isNeedShowTimeSend = obj["time"];
          var $li1 = $('<li class="gl_im_time"><i>' + showTime + "</i></li>");
          $("#chat-thread").append($li1);
        }

        $li = $(
          '<li class="right-item"> <img src="' +
            this.currentUserImgae +
            '" alt=""/> <div class="chat-item-text">' +
            this.chartValue +
            "</div> </li>"
        );
        $("#chat-thread").append($li);
      } else {
        try {
          let content = JSON.parse(arg.data.content);
          if (content && content.chatType && !content.chatContent) {
          } else {
            if (content.chatContent.indexOf("style=") > -1) {
              return;
            }
            obj["chatContent"] = content.chatContent;
          }
        } catch (e) {
          obj["chatContent"] = arg.data.content;
        }
        obj["pic"] = this.currentUserImgae;
        obj["type"] = false;
        if (arg.time) {
          obj["time"] = arg.time;
          var $li1 = $('<li class="gl_im_time"><i>' + arg.time + "</i></li>");
          $("#chat-thread").append($li1);
        }
        $li = $(
          '<li class="right-item"> <img src="' +
            this.currentUserImgae +
            '" alt=""/> <div class="chat-item-text">' +
            obj["chatContent"] +
            "</div> </li>"
        );
        $("#chat-thread").append($li);
        // this.historyList.push(obj);
      }

      if ($li) {
        $li.on("click", function(e) {
          if (e.target.tagName == "IMG") {
            _this.showMySelf();
          }
        });
      }
      this.chartValue = "";
      setTimeout(() => {
        let top = $("#convo").height();
        $("#content").animate(
          {
            scrollTop: top
          },
          100
        );
      });
    },
    createOnMessage(arg) {
      let headerPath = require("../assets/images/icon.png");
      if (arg && !arg.pic) {
        arg.pic = headerPath;
      }
      if (!arg) return;
      let $li,
        _this = this;
      let obj = {};
      try {
        let content = JSON.parse(arg.data.content);
        if (content && content.chatType && !content.chatContent) {
          // this.processChatType(content.chatType);
        } else {
          if (content.chatContent.indexOf("style=") > -1) {
            return;
          }
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
      if (arg.time) {
        obj["time"] = arg.time;
        var $li1 = $('<li class="gl_im_time"><i>' + arg.time + "</i></li>");
        $("#chat-thread").append($li1);
      }
      $("#chat-thread").append($li);
      //   this.historyList.push(obj);
      if ($li) {
        $li.on("click", function(e) {
          if (e.target.tagName == "IMG") {
            _this.showPersonal();
          }
        });
      }
      setTimeout(() => {
        let top = $("#convo").height();
        $("#content").animate(
          {
            scrollTop: top
          },
          100
        );
      });
    },
    loadData() {
      if(this.id){
        this.axios
        .get(
          this.ip +
            "/globalmate/rest/need/list/" +
            this.id +
            "?token=" +
            this.userInfo.token +
            "&onlyCurrentUser=true",
          {
            onlyCurrentUser: true
          }
        )
        .then(res => {
          if (res.success) {
            let data = res.data;
            if (!data) return;
            for (var key in data.conceretNeed) {
              if (key === "pic") {
                if (
                  data.conceretNeed[key] &&
                  data.conceretNeed[key].indexOf("aliyuncs") > -1
                ) {
                  this.imageArr = data.conceretNeed[key].split(";");
                }
              }
              if (key === "title") {
                this.detail[key] = data.conceretNeed[key];
              }
              if (key === "tag") {
                this.detail[key] = data.conceretNeed[key];
              }
            }
            var status = data.need.enable + "";
            switch (status) {
              case "1":
                this.detail["status"] = this.$t("status.open");
                break;
              case "2":
                this.detail["status"] = this.$t("status.execute");
                break;
              case "0":
                this.detail["status"] = this.$t("status.closed");
                break;
              case "6":
                this.detail["status"] = this.$t("status.complete");
                break;
              default:
            }
            for (var key in data.need) {
              this.detail[key] = data.need[key];
            }
            if (this.userInfo.userId !== res.data.need.userId) {
              this.others = true;
            }
            if (res.data.need.enable != 1) {
              this.hasSelectAready = true;
            }
          } else {
          }
        })
        .catch(e => {
          console.log(e);
        });
      }else if(this.idList.length>0){
        for(var i=0;i<this.idList.length;i++){
          var id=this.idList[i];
          this.axios
        .get(
          this.ip +
            "/globalmate/rest/need/list/" +
            id +
            "?token=" +
            this.userInfo.token +
            "&onlyCurrentUser=true",
          {
            onlyCurrentUser: true
          }
        )
        .then(res => {
          if (res.success) {
            let data = res.data;
            if (!data) return;
            if(data.need.enable!='1') return;
            this.idListAviavlable=true;
            this.id=id;
            for (var key in data.conceretNeed) {
              if (key === "pic") {
                if (
                  data.conceretNeed[key] &&
                  data.conceretNeed[key].indexOf("aliyuncs") > -1
                ) {
                  this.imageArr = data.conceretNeed[key].split(";");
                }
              }
              if (key === "title") {
                this.detail[key] = data.conceretNeed[key];
              }
              if (key === "tag") {
                this.detail[key] = data.conceretNeed[key];
              }
            }
            var status = data.need.enable + "";
            switch (status) {
              case "1":
                this.detail["status"] = this.$t("status.open");
                break;
              case "2":
                this.detail["status"] = this.$t("status.execute");
                break;
              case "0":
                this.detail["status"] = this.$t("status.closed");
                break;
              case "6":
                this.detail["status"] = this.$t("status.complete");
                break;
              default:
            }
            for (var key in data.need) {
              this.detail[key] = data.need[key];
            }
            if (this.userInfo.userId !== res.data.need.userId) {
              this.others = true;
            }
            if (res.data.need.enable != 1) {
              this.hasSelectAready = true;
            }
          } else {
          }
        })
        .catch(e => {
          console.log(e);
        });
        }
      }
    },

    getOthersInfo(toChartId) {
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/user/list/" +
            this.$route.query.toChartId +
            "?token=" +
            this.userInfo.token,
          {}
        )
        .then(res => {
          if (res.success) {
            this.othersInfo = res.data;
            setTimeout(() => {
              this.getHistory();
            }, 1000);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getHistory() {
      var _this = this;
      YYIMChat.getHistoryMessage({
        id: _this.$route.query.toChartId,
        type: "chat",
        contentType: 2,
        start: 0,
        size: 150,
        startVersion: 0,
        endVersion: 100,
        success: function(data) {
          if (data.result && data.result.length != 0) {
            var result = data.result;
            var len = result.length - 1;
            for (var i = len; i >= 0; i--) {
              let secondsCalculate =
                _this.moment().valueOf() -
                _this.moment(result[i].dateline).valueOf();
              let a = new Date(
                _this
                  .moment()
                  .format("YYYY-MM-DD")
                  .valueOf()
              ).getTime();
              let b = _this.moment(result[i].dateline).valueOf();

              if (!_this.isNeedShowTime) {
                _this.isNeedShowTime = _this
                  .moment(result[i].dateline)
                  .valueOf();
                if (
                  secondsCalculate > 2 * 60 * 1000 &&
                  secondsCalculate < 24 * 60 * 60 * 1000 &&
                  b > a
                ) {
                  var timedetail = _this
                    .moment(result[i].dateline)
                    .calendar()
                    .split("at")[1];
                  var moonOrAfter =
                    $.trim(timedetail).split(" ")[1] == "PM"
                      ? "下午 "
                      : "上午 ";
                  result[i].time =
                    moonOrAfter + $.trim(timedetail).split(" ")[0];
                }
                if (b < a) {
                  result[i].time = _this
                    .moment(result[i].dateline)
                    .format("YYYY-MM-DD");
                }
              } else {
                if (
                  _this.moment(result[i].dateline).valueOf() -
                    _this.isNeedShowTime >
                  60 * 1000
                ) {
                  if (
                    secondsCalculate > 2 * 60 * 1000 &&
                    secondsCalculate < 24 * 60 * 60 * 1000
                  ) {
                    var timedetail = _this
                      .moment(result[i].dateline)
                      .calendar()
                      .split("at")[1];
                    var moonOrAfter =
                      $.trim(timedetail).split(" ")[1] == "PM"
                        ? "下午 "
                        : "上午 ";
                    result[i].time =
                      moonOrAfter + $.trim(timedetail).split(" ")[0];
                  }
                  if (b < a) {
                    result[i].time = _this
                      .moment(result[i].dateline)
                      .format("YYYY-MM-DD");
                  }
                  _this.isNeedShowTime = _this
                    .moment(result[i].dateline)
                    .valueOf();
                }
              }

              try {
                  _this.chatItemId = JSON.parse(result[i].data.content).item;
                  if (!_this.id && _this.chatItemId&&_this.chatItemId!='null') {
                    _this.idList.push(_this.chatItemId);
                  }
                } catch (e) {}
              if (
                result[i].from &&
                result[i].from == _this.$route.query.toChartId
              ) {
                result[i].pic = _this.othersInfo.pic;
                _this.createOnMessage(result[i]);
              } else {
                result[i].pic = _this.currentUserImgae;
                _this.createUserTalk(result[i]);
              }
            }
            $(document).ready(function() {
              let top = $("#convo").height();
              $("#content").animate(
                {
                  scrollTop: top
                },
                100
              );
            });
            _this.loadData();
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
    getUserByToken(callback) {
      this.axios
        .get(this.ip + "/globalmate/rest/user/getUserByToken", {
          params: {
            token: this.userInfo.token
          }
        })
        .then(res => {
          if (res.success) {
            this.currentUserImgae = res.data.pic;
            callback && callback();
            this.updateUserInfo({
              curUser: res.data
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    scrollTop() {
      var agent = navigator.userAgent.toLowerCase();
      // this.hideAll()
      setTimeout(function() {
        if (
          agent.indexOf("safari") != -1 &&
          agent.indexOf("mqqbrowser") == -1 &&
          agent.indexOf("coast") == -1 &&
          agent.indexOf("android") == -1 &&
          agent.indexOf("linux") == -1 &&
          agent.indexOf("firefox") == -1
        ) {
          //safra浏览器
          window.scrollTo(0, 1000000);
          //先滚动到最底部，再用scrollY得到当前的值，必须延迟 否则拿到的就是1000000
          setTimeout(function() {
            window.scrollTo(0, window.scrollY - 45); //45像素 所有浏览器都是这么高
          }, 200);
        } else {
          //其他浏览器
          window.scrollTo(0, 1000000);
        }
      }, 200);

      // setTimeout(()=>{
      //     // document.body.scrollBottom = document.body.scrollHeight;
      // },2000)
    },
    inputBlur() {
      var agent = navigator.userAgent.toLowerCase();
      setTimeout(function() {
        if (
          !(
            agent.indexOf("safari") != -1 &&
            agent.indexOf("mqqbrowser") == -1 &&
            agent.indexOf("coast") == -1 &&
            agent.indexOf("android") == -1 &&
            agent.indexOf("linux") == -1 &&
            agent.indexOf("firefox") == -1
          )
        ) {
          //非safari浏览器
          window.scrollTo(0, 0);
        }
      }, 0);
    },
    sendFileIm() {
      Toast({
        message: "IM发送图片功能研发中...",
        duration: 2000
      });
    },
    remindRead(){
      let _this=this;
      let url=`https://im.yyuap.com/sysadmin/rest/user/zxy_test/globalmate_test/${this.userInfo.userId}/presence?token=${window.token}`
      this.axios.get(url,{
        params:{
          username:JSON.stringify([this.$route.query.toChartId])
        }
      }).then(result => {
          if(result[this.$route.query.toChartId]==0){
            _this.doRemind();
          }else{
            Toast({
                message: _this.$t('totastTips.onlineWait'),
                duration: 2000
              });
          }
      });
    },
    doRemind(){
      let _this=this;
      if(this.id=='null'){
        this.id='';
      }
      let postData={
        needId:this.id,      
        toUserId:this.$route.query.toChartId,
      }
      this.axios
          .post(
            this.ip + '/globalmate/rest/msg/unreadTempMsg?token='+ this.userInfo["token"],
            postData
          )
          .then(res => {
            if (res.success) {
              this.loadingShow = false;
              Toast({
                message: _this.$t('totastTips.remindSendWait'),
                duration: 2000
              });           
            } else {
              Toast({
                message: res.msg,
                duration: 2000
              });
            }
          })
          .catch(e => {          
            console.log(e);
      });
    },
    // 查询我是否在事件的沟通列表
    searchInChatList(callback){
      this.axios
        .get(this.ip + "/globalmate/rest//im/listChatRecordsByNeedId/"+this.id, {
          params: {
            token: this.userInfo.token
          }
        })
        .then(res => {
          if (res.success) {
            if(res.data&&res.data.length>0){
              const list=res.data;
              const isInlist=list.some(item=>{
                return item.uChatTargetId==this.userInfo.userId
              });
              if(!isInlist&&!this.hasSeachInList){
                callback&&callback();
              }
            }else{
              callback&&callback();
            } 
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 将我加入当前事件的沟通列表
    addInChatList(){
      this.axios
        .post(this.ip + "/globalmate/rest/im/addChatRecord?token="+this.userInfo.token, {
          needId: this.id
        })
        .then(res => {
          if (res.success) {
            this.hasSeachInList=true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  activated() {
    $("#chat-thread").empty();
    this.historyList = [];
    this.id = "";
    this.idList=[];
    this.id = this.$route.query.id;
    this.isNeedShowTime=false;
    this.idListAviavlable=false;
    this.hasSeachInList=false;
    this.toChartId = this.$route.query.toChartId;
    if (this.userInfo.token) {
      this.getUserByToken(this.loadData);
      this.getOthersInfo(this.toChartId);
      // this.searchInChatList()
    } else {
      this.timer = setInterval(() => {
        if (this.userInfo.token) {
          this.getUserByToken(this.loadData);
          this.getOthersInfo(this.toChartId);
          clearInterval(this.timer);
        }
      }, 200);
    }
    $(".chat-input").on("focus", function() {
      setTimeout(() => {
        let top = $("#convo").height();
        $("#content").animate(
          {
            scrollTop: top
          },
          100
        );
      });
    });
  },
  deactivated() {
    clearInterval(this.timer);
  },
  mounted() {},
  created() {}
};
</script>

<style lang='less'>
@import "../assets/css/im.css";

#main {
  background-color: #f4f4f4;
}
.icon-image_default::before {
  font-size: 58px;
  color: #999;
}
.im_top_fix {
  position: fixed;
  z-index: 1;
  width: 100%;
  right: 0;
  left: 0;
}

.convo {
  margin-top: 120px !important;
  padding-bottom: 50px;
}
.gl_no_item {
  margin-top: 0 !important;
}
.chart_main_content {
  font-size: 14px;
  margin: 10px auto;
  width: 84%;
  padding: 12px 0.24rem;
  border-radius: 8px;
  background: #fff;
  display: flex;
  position: relative;
}
.chart_main_content .detail_status {
  font-size: 14px;
  position: absolute;
  top: 12px;
  right: 0.2rem;
}
.chart_main_content_image > div {
  width: 1.6rem;
  height: 1.6rem;
  position: relative;
  .gl_identify_im {
    position: absolute;
    right: -0.1rem;
    top: -6px;
    font-size: 18px;
    font-weight: bolder;
    font-family: monospace;
    width: 0.4rem;
    height: 0.4rem;
    display: inline-block;
    border-radius: 50%;
    text-align: center;
  }
  .gl_cetifiy_medal {
    position: absolute;
    bottom: -8px;
    right: -0.16rem;
    width: 0.5rem;
    height: 0.5rem;
    box-shadow: -1px 1px 2px #fff;
    border-radius: 50%;
  }
}
.chart_main_content_image > div > .gl_user_img {
  width: 100%;
  height: 100%;
}
.chart_main_content_decription {
  flex: 2;
  margin-left: 0.2rem;
  overflow: hidden;
}
.chart_main_content_decription span {
  padding: 4px 0;
  margin-right: 0.2rem;
  text-align: left;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 3rem;
  overflow: hidden;
  color: #888;
  font-size: 14px;
}
.chart_main_content_decription .detail_nikename {
  color: blue;
  font-size: 16px;
}
.chart_main_content_decription .detail_name {
  color: #333;
}
.detail_list_price {
  text-align: right;
  font-size: 18px;
  line-height: 72px;
}
.form-control {
  color: #333;
}

/*
*评价css
 */
.chart_main_content_action {
  position: absolute;
  right: 0.2rem;
  bottom: 12px;
}

.chart_main_content_action span {
  padding: 6px 0.24rem;
  margin-left: 0.08rem;
  background-color: rgba(241, 241, 241, 1);
  border-radius: 2px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  color: #fff;
  &.do_help {
    background: #1676ec;
  }
  &.do_help_grey {
    background: #b3b3b3;
  }
}
.mint-toast {
  padding: 10px 0.2rem !important;
}
.gl_im_time {
  float: right;
  font-size: 12px !important;
  margin: 0 !important;
  width: 100% !important;
  text-align: center !important;
  background-color: transparent !important;
}
.gl_im_time i {
  display: inline-block;
  padding: 3px 0.1rem;
  color: #fff;
  background: #d3d3d3;
  border-radius: 4px;
}
.gl_im_time:after {
  position: absolute;
  top: 10px !important;
  border: none !important;
}
.um-remind-read{
  position: fixed;
  bottom: 60px;
  right: 0.25rem;
  font-size: 12px;
  padding: 0.2rem;
  color: #fff;
  background: #1676ec;
  border-radius: 4px;
}
</style>
