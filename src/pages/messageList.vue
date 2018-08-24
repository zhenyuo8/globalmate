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
		padding: .16rem;
		border-radius: 2px;
		margin-left: 0.2rem;
		&.accept{
			background: #2343de;
		}
		&.refuse{
			background: red;
		}
	}
	.defindloadig{
	   position: fixed;
	   z-index: 11;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}

</style>

<template>

	<div class="messageList">
		<div class="message_warp">
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
					<div class="request_action" v-show="item.isAddFriends&&item.lastMessage.from!=currentUserId">
						<span class="accept" @click='agreeAddFriend($event,item)'>{{$t('button.agree')}}</span>
						<span class="refuse">{{$t('button.refuse')}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="defindloadig" v-if="loadingShow">
            <loading></loading>
        </div>
	</div>

</template>

<script>
import CONFIG from '../config/config'
import loading from '../components/loading.vue'
import { MessageBox,Toast} from 'mint-ui';
export default {
    'name': 'myAssist',
    components: {
		loading
    },
    data() {
        return {
            messageList: [],
			friends:[],
			list:[],
			friendsIdList:[],
			addFriedsRequestList:[],
			loadingShow:false,
			currentUserId:''
        }
    },
    methods:{
		/**
		 * 同意对方加好友请求glohelp添加好友
		 * @param  {[event]} e    [阻止冒泡事件]
		 * @param  {[Object]} item [gl加好友]
		 * @return {[type]}      [description]
		 */
		agreeAddFriend(e,item){
			e=e?e:window.event;
			e.preventDefault();
			event.stopPropagation();
			e.cancelBubble=true;
			let _this=this;
			MessageBox.confirm('',{
                title: '',
                message: '确定同意 '+item.users.nikename+' 的好友请求？',
                confirmButtonText:this.$t('button.confirm'),
                cancelButtonText:this.$t('button.cancel'),
                showCancelButton: true
            }).then(action => {
				//同时添加 IM好友关系
				YYIMChat.addRosterItem(item.id);
				setTimeout(()=>{
					_this.getFriendsInIM()
				},1000)
				_this.apiHost=CONFIG[__ENV__].apiHost;
				_this.axios.get(_this.apiHost+'/globalmate/rest/userRelation/addFriend?token='+_this.$route.query.token+'&targetUserId='+item.id,{
					targetUserId:item.id
				}).then((res)=>{
					if(res.data.success){
						_this.getFriendsInGlohelp();
					}
				}).catch((e)=>{

				});
            }).catch(cancel=>{

            });
		},
		/**
		 * 获取glohelp好友关系
		 * @return {[type]} [description]
		 */
		getFriendsInGlohelp(){
			this.apiHost=CONFIG[__ENV__].apiHost;
			this.axios.get(this.apiHost+'/globalmate/rest/userRelation/getFriends?token='+this.$route.query.token+'&userId='+this.CURRENTUSER.id,{
				userId:this.CURRENTUSER.id
			}).then((res)=>{
				if(res.data.success){
					console.log(res.data,11111);
					this.loadingShow=false;
				}
			}).catch((e)=>{

			});
		},
		toChatPage(item){
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

		processFriendsList(friends){
			this.apiHost=CONFIG[__ENV__].apiHost;
			let mess=friends;
			this.friends=[];
			console.log(mess);
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
		/**
		 * 获取IM好友
		 * @return {[type]} [description]
		 */
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
		/**
		 * 获取单个用户的历史聊天记录
		 * @param  {[type]}   id       [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
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
									if(temp['lastMessageContent'].indexOf('style=')>-1){
										temp['lastMessageContent']="我想和您成为好朋友!"
									}
								}catch(e){
									temp['lastMessageContent']=temp.lastMessage.data.content;
								}
							}
							temp.lastContactTime=this.moment(temp.lastContactTime).format('YYYY-MM-DD');
							if(!this.friendsIdList.includes(temp.id)){
								this.getHistory(temp.id,function(params){
									if(!params){
										temp.isAddFriends=true;
										console.log(temp);
									}
									_this.list.push(temp);
								})
							}else{
								this.friends.push(temp);
							}
							this.loadingShow=false;
						}
					}else{
						this.loadingShow=false;
					}
	            }).catch((e)=>{
					this.loadingShow=false;
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
		/**
		 * 获取IM联系人
		 * @return {[type]} [description]
		 */
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
		getUserByToken(){
			this.apiHost=CONFIG[__ENV__].apiHost;
			let _this=this;
			this.axios.get(this.apiHost+'/globalmate/rest/user/getUserByToken'+'?token='+_this.$route.query.token,{}).then((res)=>{
				if(res.data.success){
					this.CURRENTUSER=res.data.data;
					this.currentUserId=res.data.data.id;
					_this.getFriendsInIM();
					_this.getFriendsInGlohelp();
				}
			}).catch((e)=>{
				console.log(e);
			})
		}
    },
    activated(){
		this.messageList=[]
		this.getUserByToken();
		this.loadingShow=true;
    },
    created(){

    }

}

</script>
