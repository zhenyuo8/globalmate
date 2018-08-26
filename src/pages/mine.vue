<style scoped>
.mine {
  overflow: hidden;
}

.header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background: #fff;
  z-index: 11;
  height: 33px;
}

.mine_body {
  padding: 21px 0.4rem;
  overflow: hidden;
}

.mine_detail {
  overflow: hidden;
  position: relative;
}

.mine_image {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  float: left;
  border: 1px solid rgba(151, 151, 151, 1);
}

.mine_image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: inline-block;
}

.mine_information {
  float: left;
  height: 60px;
  margin-left: 0.4rem;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #9b9b9b;
  text-align: left;
}

.mine_information > div {
  flex: 1;
}

.mine_username {
  font-size: 20px;
  color: #333;
}

.mine_location {
  margin-top: 18px;
}

.mine_top {
  margin-top: 6px;
}

.mine_call {
  margin-left: 0.14rem;
}

.mine_settings {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 14px;
  color: #4a4a4a;
}

.mine_business {
  border-bottom: 1px solid rgba(241, 241, 241, 1);
}
</style>

<template>

  <div class="mine">
    <div class="mine_body">
      <div class="mine_detail">
        <div class="mine_image" @click='toMineInformation'>
          <img :src="userInfo1.pic" alt="">
        </div>
        <div class="mine_information" @click='toMineInformation'>
          <div class="mine_top">
            <span class="mine_username">{{userInfo1.username}}</span>
          </div>
          <div class="mine_location">
            <span class="">{{userInfo1.country}}</span>
          </div>
        </div>
        <div class="mine_settings" @click='goEditMineInfo'>
          {{$t('personaPage.edit')}}
        </div>
      </div>
    </div>
    <div class="mine_business">
      <div class="" v-for="(item,index) in listRepeat" :key='index'>
        <List :itemRepeat='item' :clickCallBack='clickCallBack'></List>
      </div>
    </div>
  </div>

</template>

<script>
import List from "../components/list.vue";
import selectList from "../components/selectList.vue";
import userMix from "../mixins/userInfo";
export default {
  name: "mine",
  mixins: [userMix],
  data() {
    return {
      listRepeat: [
        {
          title: this.$t("personaPage.identify"),
          text: "",
          arrow: true,
          mineType: "identify"
        },
        {
          title: this.$t("personaPage.posted"),
          text: "",
          arrow: true,
          mineType: "publish"
        },
        {
          title: this.$t("personaPage.received"),
          text: "",
          arrow: true,
          mineType: "sos"
        },
        {
          title: "我帮助的",
          text: "",
          arrow: true,
          mineType: "solove"
        },
        {
          title: this.$t("personaPage.friends"),
          text: "",
          arrow: true,
          mineType: "friends"
        },
        {
          title: this.$t("personaPage.feedback"),
          text: "",
          arrow: true,
          mineType: "feedback"
        }
      ],

      title: "",
      userInfo1: {
        username: "",
        country: "",
        call: "",
        pic: ""
      }
    };
  },
  components: {
    List,
    selectList
  },
  computed: {},
  methods: {
    getToken(callback) {
      let userId = this.userInfo1["userId"];
      // let userId = .getItem("USERID");
      let openid = this.userInfo1["openId"];
      // let openid = .getItem("OPENID");
      if (userId) {
        this.axios
          .get(
            this.ip + "/globalmate/rest/user/getToken?userId=" + userId,
            {}
          )
          .then(res => {
            if (res.success) {
              this.token = res.data;
              // .setItem("TOKEN", res.data.data);
              this.updateUserInfo({
                token: res.data
              });
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else if (openid) {
        this.axios
          .get(
            this.ip + "/globalmate/rest/user/getToken?openid=" + openid,
            {}
          )
          .then(res => {
            if (res.success) {
              this.token = res.data;
              // .setItem("TOKEN", res.data.data);
              this.updateUserInfo({
                token: res.data
              });
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
      callback && callback(this.token);
    },
    toMineInformation() {
      this.$router.push({
        path: "mineInformation",
        query: {
          token: this.token,
          title: "个人信息",
          id: "mineInformation"
        }
      });
    },
    clickCallBack(item) {
      let type = item.mineType;
      switch (type) {
        case "publish":
          this.$router.push({
            path: "myAssist",
            query: {
              token: this.token,
              title: "求助列表",
              id: "myAssist"
            }
          });
          break;
        case "solove":
          this.$router.push({
            path: "myAssist",
            query: {
              token: this.token,
              title: "我帮助的",
              id: "solove"
            }
          });
          break;
        case "feedback":
          this.$router.push({
            path: "feedback",
            query: {
              token: this.token,
              title: "意见反馈",
              id: "feedback"
            }
          });
          break;
        case "sos":
          this.$router.push({
            path: "seekHelpList",
            query: {
              token: this.token,
              title: "SOS",
              id: "sos"
            }
          });
          break;
        case "identify":
          this.$router.push({
            path: "identify",
            query: {
              token: this.token,
              title: "身份认证",
              id: "identify"
            }
          });
          break;
        case "friends":
          this.$router.push({
            path: "messageList",
            query: {
              token: this.token,
              title: "我的好友",
              id: "message"
            }
          });
          break;
        default:
      }
    },
    goEditMineInfo() {
      this.$router.push({
        path: "personalFile",
        query: {
          token: this.token,
          title: "个人资料编辑",
          id: "personalFile"
        }
      });
    },
    loadData() {
      if (this.userInfo1["token"]) {
        this.token = this.userInfo1["token"];
      }
      // if (.getItem("TOKEN")) {
      //   this.token = .getItem("TOKEN");
      // }
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/user/getUserByToken" +
            "?token=" +
            this.token || this.$route.query.token,
          {}
        )
        .then(res => {
          if (res.success) {
            let data = res.data;
            this.userInfo1.username = data.nikename || data.name;
            this.userInfo1.country = data.country;
            this.userInfo1.call = data.enable;
            this.userInfo1.pic = data.pic || "../assets/images/icon.png";
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  activated() {
    let url = window.location.href;
    if (url.indexOf("openId=") > -1) {
      this.userId = this.$utils.getQueryStringByName("userId");
      this.openId = this.$utils.getQueryStringByName("openId");
      // .setItem("USERID", this.userId);
      // .setItem("OPENID", this.openId);
      this.updateUserInfo({
        userId: this.userId,
        openId: this.openId
      });
    }
    this.getToken(this.loadData);
  },

  watch: {

  },
  created() {
    this.token = this.$route.query.token;
    this.title = this.$route.query.title;
  }
};
</script>
