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
    <tips v-if="showTipsText" :showTipsText='showTipsText'></tips>
  </div>
</template>

<script>
import tips from "../components/tips";
import userMix from "../mixins/userInfo";
export default {
  mixins: [userMix],
  components: {
    tips
  },
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
            this.token = res.data;
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
          this.ip +
            "/globalmate/rest/user/getUserByToken" +
            "?token=" +
            token,
          {}
        )
        .then(res => {
          if (res.success) {
            this.CURRENTUSER = res.data;
            this.updateUserInfo({
                curUser: res.data
              })
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
    }
  },
  activated() {
    document.title = this.$route.query.title;
  },
  created() {
    console.log(YYIMChat);
  }
};
</script>

<style scoped>
/* @import "../assets/css/login.css"; */
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
