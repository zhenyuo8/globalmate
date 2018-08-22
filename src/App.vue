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
import userMix from './mixins/userInfo'
export default {
  mixins: [userMix],
  name: "App",
  data() {
    return {
      transitionName: "",
      code: ""
    };
  },
  methods: {
    setrem() {
      var docEl = window.document.documentElement;
      var width = docEl.getBoundingClientRect().width;
      var rem = width / 7.5;
      docEl.style.fontSize = rem + "px";
    },
    handleParam(str) {
      const reg = /code\=([0-9a-zA-Z]+)/;
      const match = str.match(reg);
      if (match && match.length === 2 && match[1]) {
        this.code = match[1];
      }
    },
    loadUserMsg(code) {
      let url =
        "http://47.94.115.87/globalmate/rest/wechat/oauth/oauthCb?code=" +
        this.code;
      this.axios.get(url).then(function(result) {
        var data = result.data.data;
        if (data && data.token) {
          if (data && data.token) {
            const token = data.token;
            const userId = data.user.id;
            const openId = data.user.openid;
            this.$store.commit({
              type: 'globalmate/UPDATE_USERINFO',
              userInfo: {
                token,
                userId,
                openId
              }
            });
          }
        }
      });
    }
  },
  created() {
    this.handleParam(window.location.href);
    if (!this.code) {
      window.location.replace('/static/login.html')
    } else {
      this.loadUserMsg()
    }
  },
  mounted() {
    this.setrem();
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
      //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
      /*if( to.meta.index < from.meta.index){
                      this.transitionName = 'slide-right';
                }else{
                      this.transitionName = 'slide-left';
                }*/
    }
  },
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
