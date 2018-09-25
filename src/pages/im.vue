<template>
  <div class="um-win um-page" id="main">
    <div class="um-content p5" id="content">
      <div class="im_top_fix" v-show="id">
        <div class="chart_main_content">
          <div class="chart_main_content_image" @click='showDetail(detail)'>
            <div class="">
              <img :src="othersInfo.pic" v-if="othersInfo.pic" alt="">
              <img src="../assets/images/icon.png" v-if="!othersInfo.pic" alt="">
            </div>
          </div>
          <div class="chart_main_content_decription" @click='showDetail(detail)'>
            <span class="detail_nikename">{{othersInfo.nikename}}</span>
            <span class="detail_name">{{detail.tag}} : {{detail.title}}</span>
            <span class="detail_brand">{{detail.where}}</span>
          </div>
          <div class="chart_main_content_action" v-show="detail.enable==1">
            <span class='' :class="hasSelectAready?'do_help_grey':'do_help'" @click="selectWhoHelp()" v-show="!others">选择Ta</span>
          </div>
          <div class="detail_status" :class="'status_'+detail.enable">
            {{detail.status}}
          </div>
        </div>

      </div>
      <div id="convo" class="convo" :class="id?'':'gl_no_item'">
        <ul class="chat-thread" id="chat-thread">
          <li :class="item.type?'left-item':'right-item'" v-for="(item,index) in historyList" @click='showInfo(item)' :key='index'>
            <img :src="item.pic" alt="">
            <div class="chat-item-text">
              {{item.chatContent}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="um-footer">
      <div class="chat-input-box">
        <img src="../assets/images/speech.png" alt="" class="change-input-type" data-flag='speech' />

        <div class="show-input">
          <input type="text" class="form-control chat-input" placeholder="" v-model='chartValue' @keyup.enter="createUserTalk()" />
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
      othersInfo: {}
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
      if (this.$route.query && this.$route.query.fromDetail === 'true') {
        this.$router.go(-1)
        return
      }
      this.$router.push({
        path: "detail",
        query: {
          token: this.userInfo.token,
          title: detail.title,
          id: this.id,
          otherUserId: ""
        }
      });
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
          message: this.$t('totastTips.completedOrExecution'),
          duration: 2000
        });
        return;
      }
      MessageBox.confirm("", {
        title: "",
        message: "确定选择 <" + _this.othersInfo.nikename + "> 来帮忙？",
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
          success: function(data) {},
          error: function(err) {
            console.log(err);
          }
        });
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
        $li = $(
          '<li class="right-item"> <img src="' +
            this.currentUserImgae +
            '" alt=""/> <div class="chat-item-text">' +
            obj["chatContent"] +
            "</div> </li>"
        );
        // $('#chat-thread').append($li);
        this.historyList.push(obj);
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
      this.historyList.push(obj);
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
      if (!this.id) return;
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
              case '1':
                  this.detail["status"]=this.$t('status.open');
                  break;
              case '2':
                  this.detail["status"]=this.$t('status.execute');
                  break;
              case '0':
                  this.detail["status"]=this.$t('status.closed');
                  break;
              case '6':
                  this.detail["status"]=this.$t('status.complete');
                  break;
              case "3":
                this.detail["status"] = "编辑中";
                break;
              case "4":
                this.detail["status"] = "洽谈中";
                break;
              case "5":
                this.detail["status"] = "执行中";
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
              if (
                result[i].from &&
                result[i].from == _this.$route.query.toChartId
              ) {
                result[i].pic = _this.othersInfo.pic;
                try {
                  _this.chatItemId = JSON.parse(result[i].data.content).item;
                  if (!_this.id&&i==0) {
                    _this.id = _this.chatItemId;
                  }
                } catch (e) {}
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
    }
  },
  activated() {
    $("#chat-thread").empty();
    this.historyList = [];
    this.id = "";
    this.id = this.$route.query.id;
    this.toChartId = this.$route.query.toChartId;
    if (this.userInfo.token) {
      this.getUserByToken(this.loadData);
      this.getOthersInfo(this.toChartId);
    } else {
      this.timer = setInterval(() => {
        if (this.userInfo.token) {
          this.getUserByToken(this.loadData);
          this.getOthersInfo(this.toChartId);
          clearInterval(this.timer);
        }
      }, 200);
    }
    $('.chat-input').on('focus',function () {
        document.body.scrollTop = document.body.scrollHeight;
    })
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
.chat-thread li img, .chat-thread .img-name {
  width: 0.6rem;
  height: 0.6rem;
}
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
  .chart_main_content {
    // height: 1.4rem;
    // overflow: hidden;
  }
}

.convo {
  margin-top: 90px !important;
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
}
.chart_main_content_image > div > img {
  width: 100%;
  height: 100%;
}
.chart_main_content_decription {
  flex: 2;
  margin-left: 0.2rem;
  overflow: hidden;
}
.chart_main_content_decription span {
  // float: left;
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
</style>
