<template>
  <div id="app">
      <transition :name='transitionName'>
          <keep-alive><router-view/></keep-alive>
      </transition>
  </div>
</template>

<script>
export default {
    name: 'App',
    data(){
        return{
            transitionName:''
        }
    },
    methods: {
        setrem () {
            var docEl = window.document.documentElement;
            var width = docEl.getBoundingClientRect().width;
            var rem = width / 7.5;
            docEl.style.fontSize = rem + 'px';
        },
        Authorization(){
            let url='http://47.94.115.87/globalmate/rest/wechat/oauth/oauthUrl?redirect=http://www.czw567.com/dist/index.html#/';
            $.ajax({
                url:url,
                type:'GET',
                success:function (result) {
                    window.location.href=result.data;
                }
            })
        },
        codeToToken(code){
            let url='http://47.94.115.87/globalmate/rest/wechat/oauth/oauthCb?code='+code;
            $.ajax({
              url:url,
              type:'GET',
              success:function (result) {
                  if(result.data&&result.data.token){
                       window.localStorage.removeItem('TOKEN');
                       window.localStorage.setItem('GLOBALMATE_WX_ACCESS_TOKEN',JSON.stringify({
                           'value':result.data.token,
                           'expires':new Date().setTime(new Date().getTime()+2*60*60*1000)
                       }));
                       window.localStorage.setItem('TOKEN',result.data.token);
                       window.localStorage.setItem('USERID',result.data.user.id);
                       window.localStorage.setItem('OPENID',result.data.user.openid);
                  }
              }
            })
        },
        wxAuthorization(){
            window.localStorage.removeItem('GLOBALMATE_WX_ACCESS_TOKEN')
            let ACCESS_TOKEN=window.localStorage.getItem('GLOBALMATE_WX_ACCESS_TOKEN');
            if(ACCESS_TOKEN){
                ACCESS_TOKEN=JSON.parse(ACCESS_TOKEN);
                if(ACCESS_TOKEN.expires<new Date().getTime()){
                    window.localStorage.setItem('TOKEN',ACCESS_TOKEN.value);
                }else{
                    this.Authorization()
                }
            }else{
                if(this.$utils.getQuery('code')){
                    let code=this.$utils.getQuery('code')
                     this.codeToToken(code);
                }else{
                    this.Authorization();
                }
            }
        }
    },
    mounted () {
        this.setrem();
    },
    watch:{
         $route(to, from) {
                //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
                if(to.meta.index > 0){
                    if( to.meta.index < from.meta.index){
                        this.transitionName = 'slide-right';
                    }else{
                        this.transitionName = 'slide-left';
                    }
                }else if(to.meta.index == 0 && from.meta.index > 0){
                    this.transitionName = 'slide-right';
                }
                //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
                /*if( to.meta.index < from.meta.index){
                      this.transitionName = 'slide-right';
                }else{
                      this.transitionName = 'slide-left';
                }*/
            }
    },
    created(){
        // this.wxAuthorization()
    }
}
</script>

<style>
@import '../static/css/style.css';
#app {
  font-family: 'PingFangSC-Regular', Helvetica, Arial, sans-serif;
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
        transition: all .3s;
        position: absolute;
        width:100%;
        left:0;
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
