<style scoped>
html,body {
  height: 100%;
  width: 100%;
}
.app {
  height: 100%;
  width: 100%;
}
.mine {
  overflow: hidden;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
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
  position: relative;
}

.mine_image .gl_user_img {
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
          <img :src="userInfo1.pic" alt="" class="gl_user_img">
          <img :src="userInfo1.userTag=='vGold'?vGold:userInfo1.userTag=='vSilver'?vSilver:userInfo1.userTag=='vCopper'?vCopper:''" v-if="userInfo1.userTag" alt="" class="gl_cetifiy_medal">
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
import userMix from "../mixins/userInfo";
import { MessageBox, Toast, Swipe, SwipeItem } from "mint-ui";
import Vue from "vue";

Vue.component(Toast.name, Toast);
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
          title: this.$t('personaPage.offers'),
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
       },
       {
         title: this.$t("personaPage.aboutUs"),
         text: "",
         arrow: true,
         mineType: "aboutUs"
       }

      ],
      title: "",
      userInfo1: {
        username: "",
        country: "",
        call: "",
        pic: "",
        userTag:""
    },
    vGold:require('../assets/images/vGold.png'),
    vSilver:require('../assets/images/vSilver.png'),
    vCopper:require('../assets/images/vCopper.png')
    };
  },
  components: {
    List,
  },
  computed: {
    token: function () {
      return this.userInfo && this.userInfo.token ? this.userInfo.token: ''
    }
  },
  methods: {
    toMineInformation() {
      this.$router.push({
        path: "mineInformation",
        query: {
          token: this.token,
          id: "mineInformation",
          seeOther:false,
        }
      });
    },
    clickCallBack(item) {
      let type = item.mineType;
      console.log(item);
      switch (type) {
        case "publish":
          this.$router.push({
            path: "myAssist",
            query: {
              token: this.token,
              id: "myAssist"
            }
          });
          break;
        case "solove":
          this.$router.push({
            path: "myAssist",
            query: {
              token: this.token,
              id: "solove"
            }
          });
          break;
        case "feedback":
          this.$router.push({
            path: "feedback",
            query: {
              token: this.token,
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
            // let hasCompletePersonal=this.completePersonal();
            // if(!hasCompletePersonal) {
            //     Toast({
            //       message: this.$t('totastTips.personalFileTips'),
            //       duration: 2000
            //     });
            //     return;
            // }
          this.$router.push({
            path: "identify",
            query: {
              token: this.token,
              id: "identify"
            }
          });
          break;
        case "friends":
          this.$router.push({
            path: "messageList",
            query: {
              token: this.token,
              id: "message"
            }
          });
          break;
         case "aboutUs":
           this.$router.push({
             path: "aboutUs",
             query: {
               token: this.token,
               id: "aboutUs"
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
          id: "personalFile"
        }
      });
    },
    loadData(token) {
      this.axios.get(this.ip + "/globalmate/rest/user/getUserByToken", {
        params: {
          token
        }
      }).then(res => {
        if (res.success) {
          let data = res.data;
          this.userInfo1.username = data.nikename || data.name;
          this.userInfo1.country = data.country;
          this.userInfo1.call = data.enable;
          this.userInfo1.pic = data.pic || "../assets/images/icon.png";
          this.userInfo1.userTag = data.userTag || "";
          this.updateUserInfo({
            curUser: data,
          });
        }
      }).catch();
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
   }

  },
  activated() {
    if (this.userInfo && this.userInfo.token) {
      this.loadData(this.userInfo.token)
    } else {
      this.timer = setInterval(() => {
        if (this.userInfo && this.userInfo.token) {
          clearInterval(this.timer)
          this.loadData(this.userInfo.token)
        }
      }, 200)
    }
  },
  deactivated () {
    this.timer && clearInterval(this.timer)
  },
  watch: {
  },
  created() {
  }
};
</script>
