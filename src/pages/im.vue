<template>
	<div class="um-win um-page" id="main">
		<div class="um-content p5" id="content">
			<div class="chart_main_content">
                <div class="chart_main_content_image">
                    <div class="">
                        <img src="../assets/images/1.jpeg" alt="">
                    </div>
                </div>
                <div class="chart_main_content_decription">
                    <span class="detail_name">火影忍</span>
                    <span class="detail_type">cool</span>
                    <span class="detail_brand">japan</span>
                </div>
                <div class="chart_main_content_action">
                    <div class="">
                        <span></span>
                    </div>
                </div>
            </div>
			<div id="convo">
				<ul class="chat-thread" id="chat-thread">

				</ul>
			</div>
		</div>
		 <div class="um-footer">
			<div class="chat-input-box">
				<img src="../assets/images/speech.png" alt="" class="change-input-type" data-flag='speech'/>

				<div class="show-input">
					<input type="text" class="form-control chat-input" placeholder="" v-model='chartValue' @keyup.enter ="createUserTalk()"/>
					<button class="btn chat-send" @click='createUserTalk()'>
						发送
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data(){
        return{
			chartValue:'',

        }
    },
    methods:{
		createUserTalk(arg) {
			let headerPath = "../assets/images/icon.png";
			if(!arg){
				if(!this.chartValue) return;
				YYIMChat.sendTextMessage({
					to: '13578799001',
					type: 'chat',
					content: this.chartValue,
					body: {},
					success:function(data){
						console.log(data);
					},
					error:function(err){
						console.log(err);
					}
				})
			    let $li = $('<li class="right-item"> <img src="../assets/images/icon.png" alt=""/> <div class="chat-item-text">' + this.chartValue + '</div> </li>');
				 $('#chat-thread').append($li);
			}else {
				if(!arg) return;
				let $li = $('<li class="left-item"> <img src="'+headerPath+'" alt=""/> <div class="chat-item-text ">'+arg.data.content+'</div> </li>');
				 $('#chat-thread').append($li);
			}
			this.chartValue=''
		    let top = $('#convo').height();
		    $('#content').animate({
		        scrollTop: top
		    }, 100);
		},
		createOnMessage(){

		},
		getToken(){
			let username=window.localStorage.getItem('USERPHONE');
			 $.ajax({
		        url: 'https://im.yyuap.com/sysadmin/rest/zxy_test/globalmate_test/token',
		        type: 'POST',
		        dataType: 'json',
		        headers: {"Content-Type": "application/json"},
		        data: JSON.stringify({
		            "username":'13578799001',
		            "clientId":"44a18837b5acf71f0017772df15e1542",
		            "clientSecret":"959E5086D0544F36C915F91B624EA8DE"
		        }),
		        success: function (result) {
		            let clientIdentify = "pc" + String(new Date().getTime());
		            //登陆YYIMSDK
		            YYIMChat.login({
		                "username": '13578799001',
		                "token": result.token,
		                "expiration": result.expiration,
		                "appType": 4,
		                "identify": clientIdentify
		            });
		        },
		        error: function (arg) {
		            console.log(arg);
		        }
		    });
		},
		init(){
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
					console.log(_this);
					_this.createUserTalk(arg)
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
			YYIMChat.onMessage();
			this.getToken();
		}
    },
    created(){
		this.init();
    }
}
</script>

<style>
@import "../assets/css/im.css";
#main{
	background-color:#f4f4f4
}

.chart_main_content{
	height: 72px;
	font-size: 14px;
	margin: 10px auto;
	width: 80%;
	padding: 12px .32rem;
	border-radius: 14px;
	background: #fff;
	margin-bottom: 9px;
	display: flex;
}
.chart_main_content > div{
	flex: 1
}
.chart_main_content_image > div{
	width: 1.44rem;
	height: 1.44rem;
}
.chart_main_content_image > div > img{
	width: 100%;
	height: 100%;
}
.chart_main_content_decription{
	padding: 15px 0;
}
.chart_main_content_decription span{
	line-height: 20px;
	float: left;
	margin-right: .2rem;
}
.detail_list_price{
	text-align: right;
	font-size: 18px;
	line-height: 72px;
}
</style>
