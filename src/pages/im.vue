<template>
	<div class="um-win um-page" id="main">
		<div class="um-content p5" id="content">
			<div class="im_top_fix">
				<div class="chart_main_content">
	                <div class="chart_main_content_image">
	                    <div class="">
							<span class="icon-image_default" v-if="imageArr.length==0"></span>
	                        <!-- <img src="../assets/images/1.jpeg" v-if="imageArr.length==0" alt=""> -->
	                        <img :src="imageArr[0]+'?x-oss-process=image/resize,m_fixed,h_65,w_95'" v-if="imageArr.length!=0" alt="">
	                    </div>
	                </div>
	                <div class="chart_main_content_decription">
	                    <span class="detail_name">{{detail.title}}</span>
	                    <span class="detail_type">{{detail.tag}}</span>
	                    <span class="detail_brand">{{detail.where}}</span>
	                </div>
	                <div class="chart_main_content_action">
	                    <div class="">
	                        <!-- <span class='show_evaluate' @click="doAction('show_evaluate')">查看评价</span> -->
	                        <!-- <span class='do_evaluate' @click="doAction('do_evaluate')">去评价</span> -->
	                        <span class='do_agree' @click="doAction('do_agree')" v-if="i_do_help">同意</span>
	                        <!-- <span class='do_reject' @click="doAction('do_reject')">谢绝</span> -->
	                        <!-- <span class='do_answer' @click="doAction('do_answer')">去回应</span> -->
	                        <!-- <span class='evaluate_each' @click="doAction('evaluate_each')">去互评</span> -->
	                        <!-- <span class='rejected' @click="doAction('rejected')">被谢绝</span> -->
	                        <!-- <span class='wait_evaluate' @click="doAction('wait_evaluate')">等待评价</span> -->
	                        <!-- <span class='wait_answer' @click="doAction('wait_answer')">待回应</span> -->
	                        <!-- <span class='do_cancel' @click="doAction('do_cancel')">取消</span> -->
	                        <span class='do_help' @click="doAction('do_help')">我来帮你</span>
	                    </div>
	                </div>
	            </div>
			</div>
			<div id="convo" class="convo">
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
import CONFIG from '../config/config'
export default {
    data(){
        return{
			chartValue:'',
			id:'',
			taskId:'',
			toChartId:'',
			detail:{
				'title':'',
				'type':'',
				'where':''
			},
			imageArr:[],
			i_do_help:false,
			status_type:['i_do_help','i_do_cancel','i_wait_answer','i_wait_evaluate','i_rejected','i_evaluate_each','i_do_answer','i_do_evaluate','i_do_reject','i_show_evaluate']

        }
    },
    methods:{
		doAction(type){
			let url='';
			switch (type) {
				case 'do_help':
					YYIMChat.sendTextMessage({
						to: this.$route.query.toChartId+'',
						type: 'chat',
						content: 'i_do_help',
						body: {},
						success:function(data){
							console.log(data,111111);
						},
						error:function(err){
							console.log(err);
						}
					})
					break;
				case 'do_cancel':

					break;
				case 'wait_answer':

					break;
				case 'wait_evaluate':

					break;
				case 'rejected':

					break;
				case 'evaluate_each':

					break;
				case 'do_answer':

					break;
				case 'do_evaluate':

					break;
				case 'do_reject':

					break;
				case 'show_evaluate':

					break;
				default:

			}
		},

		createUserTalk(arg) {
			let headerPath = require("../assets/images/icon.png");
			console.log(headerPath);
			if(!arg){
				if(!this.chartValue) return;
				let charUser=this.loadChatPerson(this.$route.query.toChartId);
				YYIMChat.sendTextMessage({
					to: this.$route.query.toChartId+'',
					type: 'chat',
					content: this.chartValue,
					body: {},
					success:function(data){
						console.log(data,111111);
					},
					error:function(err){
						console.log(err);
					}
				})
			    let $li = $('<li class="right-item"> <img src="'+this.currentUserImgae+'" alt=""/> <div class="chat-item-text">' + this.chartValue + '</div> </li>');
				 $('#chat-thread').append($li);
			}else {
				let $li = $('<li class="right-item"> <img src="'+this.currentUserImgae+'" alt=""/> <div class="chat-item-text">' + arg.data.content + '</div> </li>');
				 $('#chat-thread').append($li);
			}
			this.chartValue=''
		    let top = $('#convo').height();
		    $('#content').animate({
		        scrollTop: top
		    }, 100);
		},
		createOnMessage(arg){
			let headerPath = "../assets/images/icon.png";
			if(!arg) return;
			let $li = $('<li class="left-item"> <img src="'+arg.pic+'" alt=""/> <div class="chat-item-text ">'+arg.data.content+'</div> </li>');
			 $('#chat-thread').append($li);
			 let top = $('#convo').height();
 		    $('#content').animate({
 		        scrollTop: top
 		    }, 100);
		},
		loadData(){
            this.apiHost=CONFIG[__ENV__].apiHost;
            this.axios.get(this.apiHost+'/globalmate/rest/need/list/'+this.id+'?token='+this.$route.query.token+'&onlyCurrentUser=true',{
                onlyCurrentUser:true
            }).then((res)=>{
                if(res.data.success){
                     let data=res.data.data;
                     for(var key in data.conceretNeed){
                         if(key==='pic'){
                             if(data.conceretNeed[key]){
                                 this.imageArr=data.conceretNeed[key].split(';')
                             }
                         }
						 if(key==='title'){
							 this.detail[key]=data.conceretNeed[key];
                         }
						 if(key==='tag'){
							 this.detail[key]=data.conceretNeed[key];
                         }
                     }
                     for(var key in data.need){
                         this.detail[key]=data.need[key];
                     }
                     this.detailId=data.need.id;
                }else{

                }
            }).catch((e)=>{
                console.log(e);
            })
        },
		loadChatPerson(userId){
			 this.apiHost=CONFIG[__ENV__].apiHost;
			this.axios.get(this.apiHost+'/globalmate/rest/user/getToken?userId='+userId,{}).then((res)=>{
				if(res.data.success){
					console.log(res.data);
				}
			}).catch((e)=>{
				console.log(e);
			})
		},
		getOthersInfo(toChartId){
			 this.apiHost=CONFIG[__ENV__].apiHost;
			this.axios.get(this.apiHost+'/globalmate/rest/user/list/'+this.$route.query.toChartId+'?token='+this.$route.query.token,{}).then((res)=>{
				if(res.data.success){
					this.othersInfo=res.data.data;
					setTimeout(()=>{
						this.getHistory();
					},500)
					console.log(res.data);
				}
			}).catch((e)=>{
				console.log(e);
			})
		},
		getHistory(){
			var _this=this;
			YYIMChat.getHistoryMessage({
				id:_this.$route.query.toChartId,
				type:'chat',
				contentType: 2,
			   	start: 0,
			   	size: 150,
			   	startVersion: 0,
			   	endVersion: 100,
			   	success:function(data){
				   	if(data.result&&data.result.length!=0){
					   	var result=data.result;
					   	var len=result.length-1;
					   	for(var i=len;i>=0;i--){
						   	if(result[i].from&&result[i].from==_this.$route.query.toChartId){
								console.log(_this.othersInfo);
								result[i].pic=_this.othersInfo.pic;
							   	_this.createOnMessage(result[i])
						   	}else{
								result[i].pic=_this.currentUserImgae;
							   	_this.createUserTalk(result[i])
						   	}
					   	}
				   	}
			   	},
			   	error:function(err){
			   		console.log(err);
			   	}
			})
		},
		getToken(){
			let username=window.localStorage.getItem('USERID');
			if(!username){
				username=window.localStorage.getItem('USERPHONE');
			}
			if(this.$route.query.senderDId){
				username=this.$route.query.senderDId;
			}
			if(window.localStorage.getItem('CURRENTUSER')){
				username=JSON.parse(window.localStorage.getItem('CURRENTUSER')).id;
			}

			 $.ajax({
		        url: 'https://im.yyuap.com/sysadmin/rest/zxy_test/globalmate_test/token',
		        type: 'POST',
		        dataType: 'json',
		        headers: {"Content-Type": "application/json"},
		        data: JSON.stringify({
		            "username":username,
		            "clientId":"44a18837b5acf71f0017772df15e1542",
		            "clientSecret":"959E5086D0544F36C915F91B624EA8DE"
		        }),
		        success: function (result) {
		            let clientIdentify = "pc" + String(new Date().getTime());
		            //登陆YYIMSDK
		            YYIMChat.login({
		                "username": username,
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
							console.log(res);
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
					if(arg&&_this.status_type.includes(arg.data.content)){
						_this[arg.data.content]=true;

					}else{
						_this.createOnMessage(arg)
					}

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
	activated(){
		$('#chat-thread').empty();
		this.id=this.$route.query.id;
		this.toChartId=this.$route.query.toChartId;
		this.currentUserImgae=JSON.parse(window.localStorage.getItem('CURRENTUSER')).pic;
		this.getOthersInfo(this.toChartId);
		this.init();
		this.loadData();

	},
    created(){
		this.id=this.$route.query.id;
		this.toChartId=this.$route.query.toChartId;

    }
}
</script>

<style>
@import "../assets/css/im.css";
#main{
	background-color:#f4f4f4
}
.icon-image_default::before{
	font-size: 58px;
	color: #999;
}
.im_top_fix{
	position: fixed;
	z-index: 1;
	background: #f4f4f4;
	width: 100%;
	right: 0;
	left: 0;
}
.convo{
	margin-top: 90px!important;
	margin-bottom: 10px;
}
.chart_main_content{
	font-size: 14px;
	margin: 10px auto;
	width: 80%;
	padding: 12px .32rem;
	border-radius: 14px;
	background: #fff;
	display: flex;
}

.chart_main_content_image > div{
	width: 1.44rem;
	height: 1.2rem;
}
.chart_main_content_image > div > img{
	width: 100%;
	height: 100%;
}
.chart_main_content_decription{
	margin-left: 18px;
	overflow: hidden;
}
.chart_main_content_decription span{
	line-height: 20px;
	float: left;
	margin-right: .2rem;
	text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 2.4rem;
	overflow: hidden;
	color: #888;
}
.chart_main_content_decription .detail_name{
	color: #333;
}
.detail_list_price{
	text-align: right;
	font-size: 18px;
	line-height: 72px;
}
.form-control{
	color: #333;
}


/*
*评价css
 */
.chart_main_content_action{
	position: relative;
	width: 4.2rem;
}
.chart_main_content_action>div{
	position: absolute;
	bottom: 0;
	right: 0;

}
.chart_main_content_action>div span{
	padding: .12rem;
	left: 286px;
	background-color: rgba(241, 241, 241, 1);
	border: 1px solid rgba(151, 151, 151, 1);
	border-radius: 2px;
	color: #666;
	white-space: nowrap;
	overflow: hidden;
}
.do_evaluate{

}
</style>
