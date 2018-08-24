<style scoped lang='less'>
.detail {
  box-sizing: border-box;
  font-size: 14px;
  color: #9b9b9b;
  padding: 20px 0.4rem;
  padding-bottom: 54px;
  position: relative;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-y: scroll;
}
.detail_message {
  position: fixed;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  background: #fff;
  padding: 0.1rem;
  border-top: 1px solid #eee;
}
.detail_message > div {
  flex: 1;
  line-height: 36px;
}
.detail_message_leave {
  text-align: left;
}
.detail_message_chart {
  height: 36px;
  &.gl_disabled {
    span {
      background: #b3b3b3;
    }
  }
}

.detail_message_chart span {
  padding: 0 0.8rem;
  background: #f1f1f1;
  border-radius: 4px;
  background: #26a2ff;
  color: #fff;
  font-weight: bold;
}

.detail_top {
  display: flex;
  position: relative;
  .image_user {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #eee;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .name_user {
    display: flex;
    flex: 2;
    flex-direction: column;
    text-align: left;
    margin-left: 0.24rem;
    span {
      flex: 1;
      display: inline-block;
      line-height: 36px;
      &.name {
        font-size: 16px;
        color: #333;
      }
      &.type {
        font-size: 14px;
        color: #888;
      }
    }
  }
  .status_user {
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 35px;
    span {
      color: blue;
      font-size: 14px;
    }
  }
  .status_close {
    span {
      color: red !important;
    }
  }
}
.detail_middle {
  text-align: left;
  margin-top: 10px;
  p {
    padding: 10px 0;
    border-top: 1px solid #eee;
    color: #333;
  }
}
.detail_image_new {
  display: flex;
  padding: 10px 0;
  .detail_content_img {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.2rem;
    img {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
}

.list_repeat_pushed::before {
  border-top: 1px solid #eee;
  content: "";
  clear: both;
  position: absolute;
  left: 0;
  right: 0;
}
.list_repeat_pushed {
  text-align: left;
  position: relative;
  p {
    padding: 10px 0;
  }
  .list_repeat_pushed_item {
    overflow: hidden;
    div {
      float: left;
      width: 20%;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        display: block;
        margin: auto;
      }
      span {
        margin: 6px auto 10px;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 12px;
      }
    }
  }
}
</style>

<template>

  <div class="detail">
    <div class="detail_content">
      <div class="detail_top">
        <div class="image_user">
          <img :src="listData.othersImage+'?x-oss-process=image/resize,m_fixed,h_65,w_65'" alt="">
        </div>
        <div class="name_user">
          <span class="name">{{listData.userName}}</span>
          <span class="type">{{listData.tag}}</span>
        </div>
        <div class="status_user">
          <span>{{listData.status}}</span>
        </div>
      </div>
      <div class="detail_middle">
        <p>{{$t('formTitle.head')}} : {{listData.title}}</p>
        <p>{{$t('formTitle.address')}} : {{listData.country}}
          <i v-if="listData.city">_</i> {{listData.city}}</p>
        <p>{{$t('formTitle.time')}} : {{listData.startTime}}
          <i v-if="listData.endTime">{{$t('formTitle.to')}}</i> {{listData.endTime}}</p>
        <p>{{$t('formTitle.reward')}}(￥) :
          <i style="color:red">{{listData.rewardAmount}}</i>
        </p>
        <p>{{$t('formTitle.decription')}}{{listData.description}}</p>
      </div>
      <div class="detail_image_new" v-if="listData.pic&&listData.pic.length!=0">
        <div class="detail_content_img" v-for="(items,indexs) in listData.pic" :key='indexs'>
          <img :src="items+'?x-oss-process=image/resize,m_fixed,h_65,w_65'" alt="" v-if="indexs<3">
        </div>
      </div>

      <div class="list_repeat_pushed">
        <p>{{$t('formTitle.pushTitle')}} : </p>
        <div class="list_repeat_pushed_item" v-if="pushList.length!=0">
          <div class="" v-for="(item, index) in pushList" :key='index'>
            <img :src="item.userInfo.pic" alt="">
            <span>{{item.userInfo.nikename}}</span>
          </div>
        </div>
      </div>
      <div class="list_repeat_pushed">
        <p>{{$t('formTitle.helpMan')}} : </p>
        <div class="list_repeat_pushed_item">
          <div class="">
            <img src="../assets/images/1.jpeg" alt="">
            <span>辛巴</span>
          </div>

        </div>
      </div>
    </div>
    <div class="detail_message" v-show="userId!=otherUserId">
      <div class="detail_message_chart" :class="listData.enable!=1?'gl_disabled':''">
        <span @click='goChart'>{{$t('button.gohelp')}}</span>
      </div>
    </div>
  </div>

</template>

<script>
import { MessageBox, Toast } from "mint-ui";
import userMix from "../mixins/userInfo";
export default {
  name: "detail",
  components: {},
  mixins: [userMix],
  data() {
    return {
      id: "",
      userId: "",
      country: "",
      detail: {
        title: "",
        description: "",
        createTime: ""
      },
      token: "",
      currentUserId: "",
      otherUserId: "",
      listData: {},
      pushList: [],
      showTipsText: ""
    };
  },
  activated() {
    let url = window.location.href;
    this.listData = {};
    this.pushList = [];
    this.detail = {};

    this.country = "";
    this.id = this.$route.query.id;
    this.userId = this.$route.query.userId;
    if (url.indexOf("openId=") > -1) {
      this.id = this.$utils.getQueryStringByName("id");
      this.userId = this.$utils.getQueryStringByName("userId");
      // .setItem("USERID", this.userId);
      this.updateUserInfo({
        userId: this.userId
      });
    }
    this.otherUserId = this.$route.query.otherUserId;
    let _this = this;
    this.getToken(token => {
      if (!token) {
        token = _this.$route.query.token;
      }
      this.axios.get(this.ip +"/globalmate/rest/user/getUserByToken", {
        params: {
          token
        }
      }).then(res => {
          if (res.success) {
            let data = res.data;
            if (!_this.userId) {
              _this.userId = data.id;
            }
            _this.country = data.country;
            _this.loadData(token);
          }
        })
        .catch(e => {
          console.log(e);
        });
    });
  },
  methods: {
    getToken(callback) {
      // let userId = .getItem("USERID");
      let userId = this.userInfo["userId"];
      let openid = this.userInfo["openId"];
      // let openid = .getItem("OPENID");

      if (userId) {
        this.axios.get(this.ip + "/globalmate/rest/user/getToken?userId=" + userId)
          .then(res => {
            if (res.success) {
              this.token = res.data;
              // .setItem("TOKEN", res.data.data);
              this.updateUserInfo({
                token: res.data
              });
              callback && callback(res.data);
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else if (openid) {
        this.axios.get(this.ip + "/globalmate/rest/user/getToken?openid=" + openid)
          .then(res => {
            if (res.success) {
              this.token = res.data;
              // .setItem("TOKEN", res.data.data);
              this.updateUserInfo({
                token: res.data
              });
              callback && callback(res.data);
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        callback && callback(this.token);
      }
    },
    loadData(token) {
      let list = {},
        _this = this;
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/need/list/" +
            this.id +
            "?token=" +
            token +
            "&onlyCurrentUser=true",
          {
            onlyCurrentUser: true
          }
        )
        .then(res => {
          if (res.success) {
            let data = res.data;

            this.detail = data;
            this.otherUserId = data.need.userId;

            for (var key in data.conceretNeed) {
              if (
                key == "tag" ||
                key == "city" ||
                key == "country" ||
                key == "startTime" ||
                key == "endTime" ||
                key == "title" ||
                key == "description" ||
                key == "pic" ||
                key == "rewardAmount"
              ) {
                if (key == "startTime" || key == "endTime") {
                  list[key] = this.moment(data.conceretNeed[key]).format(
                    "YYYY-MM-DD"
                  );
                } else {
                  if (key == "pic") {
                    if (data.conceretNeed[key]) {
                      list[key] = data.conceretNeed[key].split(";");
                    } else {
                      list[key] = [];
                    }
                  } else {
                    list[key] = data.conceretNeed[key];
                  }
                }
              }
            }
            for (var key in data.need) {
              if (
                key == "enable" ||
                key == "userName" ||
                key == "enable" ||
                key == "id"
              ) {
                if (key == "enable") {
                  var status = data.need[key] + "";
                  list[key] = status;
                  switch (status) {
                    case "1":
                      list["status"] = "开放中";
                      break;
                    case "2":
                      list["status"] = "帮助中";
                      break;
                    case "0":
                      list["status"] = "关闭";
                      break;
                    case "3":
                      list["status"] = "编辑中";
                      break;
                    case "4":
                      list["status"] = "洽谈中";
                      break;
                    case "5":
                      list["status"] = "执行中";
                      break;
                    case "6":
                      list["status"] = "已完成";
                      break;
                    default:
                  }
                } else {
                  list[key] = data.need[key];
                }
              }
            }

            this.getOthersInfo(data.need.userId, function(result) {
              list["othersImage"] = result || "../assets/images/icon.png";
              _this.listData = list;
            });
            this.getPushItem(data.need.id);
          } else {
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getPushItemInfo(data, callback) {
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/user/list/" +
            data.providerId +
            "?token=" +
            this.$route.query.token,
          {}
        )
        .then(res => {
          if (res.success) {
            data.userInfo = res.data;
            callback && callback(data);
          } else {
            callback && callback(data);
          }
        })
        .catch(() => {
          callback && callback(data);
        });
    },
    getPushItem(id) {
      let _this = this;
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/match/" +
            id +
            "?token=" +
            this.$route.query.token,
          {}
        )
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length != 0) {
              var nowData = res.data;
              for (var i = 0; i < nowData.length; i++) {
                this.getPushItemInfo(nowData[i], function(result) {
                  _this.pushList.push(result);
                });
              }
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    goChart() {
      if (this.listData.enable != 1) {
        Toast({
          message: "当前任务已完成或者正在执行中",
          duration: 2000
        });
        return;
      }

      this.$router.push({
        path: "im",
        query: {
          token: this.$route.query.token,
          title: this.othersInfo.nikename,
          id: this.$route.query.id,
          toChartUser: this.othersInfo.nikename,
          toChartId: this.othersInfo.id
        }
      });
    },
    getOthersInfo(userId, callback) {
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/user/list/" +
            userId +
            "?token=" +
            this.$route.query.token,
          {}
        )
        .then(res => {
          callback && callback(res.data.pic);
          this.detail.country = res.data.country;
          this.othersInfo = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {}
};
</script>
