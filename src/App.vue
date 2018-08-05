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
        initIM(){
            let _this=this;
			YYIMChat.initSDK({
	        	app: 'globalmate_test', //appId应用id
	        	etp: 'zxy_test', //etpId企业id
		        wsurl: 'stellar.yyuap.com', //websocket Url
		        wsport: 5227, //websocket port 5227/5222/5225
		        servlet: 'https://im.yyuap.com/', //rest Url
		        hbport: 7075, //httpbind  port 7075/7070
		        flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
		        logEnable: true, //client log
		        clientMark: 'web', //client mark 'web' or 'pc'
		        apiKey: '',
	        });
			YYIMChat.init({
				onOpened: function() {
					// 登录成功
					YYIMChat.getVCard({
						success:function(res){

						}
					})
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
					//收到消息,包括收到他人给自己发的消息和所有的群消息
				},
				onGroupUpdate: function(arg) {
					//群组更新
				},
				onKickedOutGroup: function(arg) {
					//群成员被群主提出
				},
				onTransferGroupOwner: function(arg){
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
				},
			});
        }
    },
    mounted () {
        this.setrem();
        this.initIM();
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
