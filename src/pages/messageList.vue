<style scoped lang='less'>
	.messageList{
		font-size: 12px;
		color: #999;
	}
	.image_chat{
		width: 1rem;
		height: 1rem;
		position: relative;
	}
	.image_chat_after::after{
		content: '';
		clear: both;
		position: absolute;
		width: .16rem;
		height: .16rem;
		border-radius: 50%;
		background: red;
		right: -0.08rem;
		top: -0.08rem;
	}
	.image_chat img{
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.message_warp ul{
		margin-left: .2rem;
	}
	.message_warp ul li{
		display: flex;
		flex-direction: row;
		padding: 10px .2rem 10px 0;
		border-bottom: 1px solid #eee;
		position: relative;
	}
	.content_chat{
		margin-left: .2rem;
		position: relative;
		flex: 1;
		overflow: hidden;
	}
	.content_chat span{
		display: block;
		text-align: left;
		padding: 4px;
		white-space: nowrap;
    	text-overflow: ellipsis;
    	overflow: hidden;
	}
	.content_chat .time_chat{
		position: absolute;
		right: 0;
		top: 0
	}
	.content_chat .name_chat{
		font-size: 15px;
		font-weight: 500;
		color: #333;
	}
	ul>li:last-child{
		border: none;
	}
	.message_warp>p{
		padding: 6px 0.2rem;
		color: #333;
		text-align: left;
		font-size: 14px;
		background: #eee;
	}
	.request_action{
		position: absolute;
		right: 0.2rem;
		top: 50%;
	}
	.request_action span{
		font-size: 14px;
		color: #fff;
		padding: .16rem .32rem;
		border-radius: 2px;
		margin-left: 0.2rem;
		&.accept{
			background: #2343de;
		}
		&.refuse{
			background: red;
		}
	}

</style>

<template>

	<div class="messageList">
		<div class="message_warp">
			<ul>
				<li v-for="(item,index) in messageList" @click='toChatPage(item)'>
					<div class="image_chat" :class="item.newMessage?'image_chat_after':''">
						<img :src="item.pic" v-if='item.pic' alt="">
						<img src='../assets/images/icon.png' v-if='!item.pic' alt="">
					</div>
					<div class="content_chat">
						<span class="name_chat">{{item.userName}}</span>
						<span class="detail_chat">{{item.data.content.chatContent}}</span>
						<span class="time_chat">{{item.dateline}}</span>
					</div>
				</li>
			</ul>
			<p v-show="friends.length!==0">{{$t('messagePage.friends')}}</p>
			<ul>
				<li v-for="(item,index) in friends" @click='toChatPage(item)'>
					<div class="image_chat" :class="item.newMessage?'image_chat_after':''">
						<img :src="item.users.pic+'?x-oss-process=image/resize,m_fixed,h_65,w_65'"  v-if='item.users.pic' alt="">
						<img src='../assets/images/icon.png' v-if='!item.users.pic' alt="">
					</div>
					<div class="content_chat">
						<span class="name_chat">{{item.users.nikename}}</span>
						<span class="detail_chat">{{item.lastMessageContent}}</span>
						<span class="time_chat">{{item.lastContactTime}}</span>
					</div>
				</li>
			</ul>
			<p v-show="list.length!==0">{{$t('messagePage.concat')}}</p>
			<ul class="gl_contact">
				<li v-for="(item,index) in list" @click='goIm(item)'>
					<div class="image_chat" :class="item.newMessage?'image_chat_after':''">
						<img :src="item.users.pic" alt=""  v-if='item.users.pic'>
						<img src='../assets/images/icon.png' v-if='!item.users.pic' alt="">
					</div>
					<div class="content_chat">
						<span class="name_chat">{{item.users.nikename}}</span>
						<span class="detail_chat">{{item.lastMessageContent}}</span>
						<span class="time_chat">{{item.lastContactTime}}</span>
					</div>
					<div class="request_action" v-show="item.isAddFriends">
						<span class="accept" @click='agreeAddFriend($event,item)'>{{$t('button.agree')}}</span>
						<span class="refuse">{{$t('button.refuse')}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>

</template>

<script>
import CONFIG from '../config/config'
export default {
    'name': 'myAssist',
    components: {

    },
    data() {
        return {
            messageList: [],
			friends:[],
			list:[],
			friendsIdList:[],
			addFriedsRequestList:[]
        }
    },
    methods:{
		/**
		 * [agreeAddFriend description]
		 * @param  {[event]} e    [阻止冒泡事件]
		 * @param  {[Object]} item [gl加好友]
		 * @return {[type]}      [description]
		 */
		agreeAddFriend(e,item){
			e=e?e:window.event;
			e.preventDefault();
			event.stopPropagation();
			e.cancelBubble=true;
			YYIMChat.addRosterItem(item.id);
			setTimeout(()=>{
				this.getFriendsInIM()
			},1000)
			this.apiHost=CONFIG[__ENV__].apiHost;
			this.axios.get(this.apiHost+'/globalmate/rest/userRelation/addFriend?token='+this.$route.query.token+'&targetUserId='+item.id,{
				targetUserId:item.id
			}).then((res)=>{
				if(res.data.success){
					this.getFriendsInGlohelp();
				}
			}).catch((e)=>{

			});
		},
		getFriendsInGlohelp(){
			this.apiHost=CONFIG[__ENV__].apiHost;
			this.axios.get(this.apiHost+'/globalmate/rest/userRelation/getFriends?token='+this.$route.query.token+'&userId='+this.CURRENTUSER.id,{
				userId:this.CURRENTUSER.id
			}).then((res)=>{
				if(res.data.success){
					console.log(res.data,11111);
				}
			}).catch((e)=>{

			});
		},
		toChatPage(item){
			this.$router.push({
				path: 'im',
				query: {
					'token': this.$route.query.token,
					'title': item.nikename,
					'senderDId':item.to ,
					'toChartId':item.from,
				}
			});
		},
		goIm(item){
			let chatItemId='';
			if(item.lastMessage&&item.lastMessage.data&&item.lastMessage.data.content){
				try{
					chatItemId=JSON.parse(item.lastMessage.data.content).item
				}catch(e){
					chatItemId=''
				}
			}
			this.$router.push({
				path: 'im',
				query: {
					'token': this.$route.query.token,
					'title': item.users.nikename,
					'senderDId':item.to ,
					'toChartId':item.users.id,
					'chatItemId':chatItemId,
				}
			});

		},
		processMessageList(messageList){
			this.apiHost=CONFIG[__ENV__].apiHost;
			let mess=messageList;
			this.messageList=[];
			for(var i=0;i<mess.length;i++){
				let temp=mess[i];
				this.axios.get(this.apiHost+'/globalmate/rest/user/list/'+mess[i].from+'?token='+this.$route.query.token,{}).then((res)=>{
					if(res.data.success){
						temp.userName=res.data.data.nikename;
		                temp.pic=res.data.data.pic;
						temp.dateline=this.moment(temp.dateline).format('YYYY-MM-DD');
						temp.data.content=JSON.parse(temp.data.content);
						this.messageList.push(temp);
					}
	            }).catch((e)=>{

	            })
			}
		},
		processFriendsList(friends){
			this.apiHost=CONFIG[__ENV__].apiHost;
			let mess=friends;
			this.friends=[];
			if(mess.length==0){
				this.getContact();
				return;
			}
			for(var i=0;i<mess.length;i++){
				let temp=mess[i];
				this.axios.get(this.apiHost+'/globalmate/rest/user/list/'+mess[i].id+'?token='+this.$route.query.token,{}).then((res)=>{
					if(res.data.success){
						this.friendsIdList.push(res.data.data.id);
					}

	            }).catch((e)=>{

	            })
			}
			this.getContact()
		},
		getFriendsInIM(){
			let _this=this;
			YYIMChat.getRosterItems({
				success: function(data){
					if(data){
						_this.processFriendsList(JSON.parse(data));
					}
				},
				error: function(err){
					console.log(err);
				},
				complete: function(){}
			});
		},
		getHistory(id,callback){
			var _this=this;
			YYIMChat.getHistoryMessage({
				id:id,
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
							if(result[i].data.content.indexOf('add_friends_request')>-1){
								console.log(result[i]);
								callback&&callback(false);
								return;
							}
					   	}
						callback&&callback(true);
						return;
				   	}
					callback&&callback(true);
					return;
			   	},
			   	error:function(err){
			   		console.log(err);
			   	}
			})
		},
		processList(friends){
			this.apiHost=CONFIG[__ENV__].apiHost;
			let mess=friends,_this=this;
			this.list=[];
			for(var i=0;i<mess.length;i++){
				let temp=mess[i];
				this.axios.get(this.apiHost+'/globalmate/rest/user/list/'+mess[i].id+'?token='+this.$route.query.token,{}).then((res)=>{
					if(res.data.success){
						if(res.data.data){
							temp['users']=res.data.data;
							if(temp.lastMessage&&temp.lastMessage.data&&temp.lastMessage.data.content){
								try{
									temp['lastMessageContent']=JSON.parse(temp.lastMessage.data.content).chatContent;
								}catch(e){
									temp['lastMessageContent']=temp.lastMessage.data.content;
								}
							}
							temp.lastContactTime=this.moment(temp.lastContactTime).format('YYYY-MM-DD');
							if(!this.friendsIdList.includes(temp.id)){
								this.getHistory(temp.id,function(params){
									if(!params){
										temp.isAddFriends=true;
									}
									_this.list.push(temp);
								})
							}else{
								this.friends.push(temp);
							}
						}
					}
	            }).catch((e)=>{

	            })
			}
		},
		dealMessage(message){
			let _this=this;
			if(message&&message.from){
				this.list.forEach(function (item,index) {
					if(item.id==message.from&&message.data.content){
						try{
							item.lastMessageContent=JSON.parse(message.data.content).chatContent;
						}catch(e){
							item.lastMessageContent=message.data.content;
						}
						item.lastContactTime=_this.moment(message.dateline).format('YYYY-MM-DD');
						item.newMessage=true;
					}
				})
			}
		},
		getContact(){
			let _this=this;
			YYIMChat.getRecentDigset({
				startDate:0,
				size: 100,
				success:function(data){
					var list=_this.processList(data.list);
				},
				error:function(err){
					console.log(err);
				}
			});
		},
		loginIM(){
			let username=window.localStorage.getItem('USERID');
			if(!username){
				username=window.localStorage.getItem('USERPHONE');
			}
			if(window.localStorage.getItem('CURRENTUSER')){
				username=JSON.parse(window.localStorage.getItem('CURRENTUSER')).id;
			}
			if(!username) return;
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
				_this.dealMessage(arg)
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
			this.loginIM();
			YYIMChat.onMessage();
		},
		getUserByToken(){
			this.apiHost=CONFIG[__ENV__].apiHost;
			this.axios.get(this.apiHost+'/globalmate/rest/user/getUserByToken'+'?token='+_this.$route.query.token,{}).then((res)=>{
				if(res.data.success){
					this.CURRENTUSER=res.data.data;
					window.localStorage.setItem('CURRENTUSER',JSON.stringify(res.data.data));
					this.initIM();
				}
			}).catch((e)=>{
				console.log(e);
			})
		}
    },
    activated(){
		if(!window.localStorage.getItem('CURRENTUSER')){
			this.getUserByToken();
		}else{
			this.CURRENTUSER=window.localStorage.getItem('CURRENTUSER');
			this.initIM();
		}
		setTimeout(()=>{
			this.getFriendsInIM();
			this.getFriendsInGlohelp();
			// this.getContact()
		},1000)
		if(window.localStorage.getItem('MESSAGELIST')){
			let messageList=JSON.parse(window.localStorage.getItem('MESSAGELIST'));
			 this.processMessageList(messageList)
		}
    },
    created(){
		this.messageList=[]
    }

}

</script>
