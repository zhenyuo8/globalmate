<template>
	<div class="um-win um-page" id="main">
		<div class="um-content p5" id="content">
			<div class="im_top_fix" v-show="id">
				<div class="chart_main_content">
	                <div class="chart_main_content_image" @click='showDetail(detail)'>
	                    <div class="">
							<span class="icon-image_default" v-if="imageArr.length==0"></span>
	                        <img :src="imageArr[0]+'?x-oss-process=image/resize,m_fixed,h_65,w_95'" v-if="imageArr.length!=0" alt="">
	                    </div>
	                </div>
	                <div class="chart_main_content_decription" @click='showDetail(detail)'>
	                    <span class="detail_name">{{detail.title}}</span>
	                    <span class="detail_type">{{detail.tag}}</span>
	                    <span class="detail_brand">{{detail.where}}</span>
	                </div>
	                <div class="chart_main_content_action">
	                    <div class="">
	                        <span class='' :class="hasSelectAready?'do_help_grey':'do_help'" @click="selectWhoHelp()" v-show="CURRENTUSER.id==detail.userId">选择Ta</span>
	                    </div>
	                </div>
	            </div>
			</div>
			<div id="convo" class="convo" :class="id?'':'gl_no_item'">
				<ul class="chat-thread" id="chat-thread">
					<li :class="item.type?'left-item':'right-item'" v-for="(item,index) in historyList" @click='showInfo(item)'>
						<img :src="item.pic" alt="">
						<div class="chat-item-text">
							{{item.chatContent}}
						</div>
					</li>
				</ul>
			</div>
		</div>
		 <div class="um-footer">
			<div class="chat-input-box">
				<img src="../assets/images/speech.png" alt="" class="change-input-type" data-flag='speech'/>

				<div class="show-input">
					<input type="text" class="form-control chat-input" placeholder="" v-model='chartValue' @keyup.enter ="createUserTalk()"/>
					<button class="btn chat-send" @click='createUserTalk()'>
						{{$t('button.send')}}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CONFIG from '../config/config'
import { MessageBox,Toast} from 'mint-ui';
export default {
    data(){
        return{
			chartValue:'',
			id:'',
			taskId:'',
			toChartId:'',
			CURRENTUSER:{},
			detail:{
				'title':'',
				'type':'',
				'where':''
			},
			imageArr:[],
			others:false,
			hasSelectAready:false,
			historyList:[],

        }
    },
    methods:{
		showInfo(item){
			if(item.type){
				this.showPersonal();
			}else{
				this.showMySelf();
			}
		},
		showDetail(detail){
			this.$router.push({
                path: 'detail',
                query: {
                    'token': this.$route.query.token,
                    'title': detail.title,
                    'id': this.id,
                    'otherUserId':''
                }
            });
		},
		showPersonal(){
			this.$router.push({
				path: 'mineInformation',
				query: {
					'token': this.$route.query.token,
					'title': this.othersInfo.name,
					'otherUserId':this.othersInfo.id,
					'id': this.othersInfo.id,
				}
			});
		},
		showMySelf(){
			this.$router.push({
				path: 'mineInformation',
				query: {
					'token': this.$route.query.token,
					'title': this.CURRENTUSER.name,
					'otherUserId':this.CURRENTUSER.id,
					'id': this.CURRENTUSER.id,
				}
			});
		},
		/**
		 * 选择当前用户帮忙
		 * @return {[type]} [description]
		 */
		selectWhoHelp(){
			let _this=this;
			if(this.detail.enable!=1){
				Toast({
  					message: '当前求助正在执行中',
  					duration: 2000
				});
				return
			}
            MessageBox.confirm('',{
                title: '',
                message: "确定选择 <"+_this.othersInfo.nikename+"> 来帮忙？",
                confirmButtonText:this.$t('button.confirm'),
                cancelButtonText:this.$t('button.cancel'),
                showCancelButton: true
            }).then(action => {
                _this.confirmWhoHelp();
            }).catch(cancel=>{

            });
		},
		confirmWhoHelp(){
			this.apiHost=CONFIG[__ENV__].apiHost;
            this.axios.get(this.apiHost+'/globalmate/rest/assist/'+this.detail.id+'/agree'+'?providerId='+this.othersInfo.id+'&token='+this.$route.query.token,{

            }).then((res)=>{
                if(res.data.success){
					this.hasSelectAready=true
                     console.log(res.data);

                }else{

                }
            }).catch((e)=>{
                console.log(e);
            })
		},
		createUserTalk(arg) {
			let headerPath = require("../assets/images/icon.png");
			if(!this.currentUserImgae){
				this.currentUserImgae=headerPath;
			}
			let $li,_this=this;
			let obj={};
			if(!arg){
				if(!this.chartValue) return;
				let content={
					'item':this.$route.query.id,
					'chatContent':this.chartValue,
					'chatType':'',
				}
				YYIMChat.sendTextMessage({
					to: this.$route.query.toChartId+'',
					type: 'chat',
					content: JSON.stringify(content),
					body: {},
					success:function(data){
					},
					error:function(err){
						console.log(err);
					}
				})
			     $li = $('<li class="right-item"> <img src="'+this.currentUserImgae+'" alt=""/> <div class="chat-item-text">' + this.chartValue + '</div> </li>');
				  $('#chat-thread').append($li);
			}else {

				try{
					let content=JSON.parse(arg.data.content);
					if(content&&content.chatType&&!content.chatContent){
					}else{
						obj['chatContent']=content.chatContent;
					}
				}catch(e){

					obj['chatContent']=arg.data.content;
				}
				obj['pic']=this.currentUserImgae;
				obj['type']=false;
				$li = $('<li class="right-item"> <img src="'+this.currentUserImgae+'" alt=""/> <div class="chat-item-text">' + obj['chatContent'] + '</div> </li>');
				$('#chat-thread').append($li);
				// this.historyList.push(obj)

			}

			if($li){
				$li.on('click',function (e) {
					if(e.target.tagName=='IMG'){
						_this.showMySelf()
					}
				});
			}

			this.chartValue=''
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
                             if(data.conceretNeed[key]&&data.conceretNeed[key].indexOf('aliyuncs')>-1){
                                 this.imageArr=data.conceretNeed[key].split(';');
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
					 if(this.CURRENTUSER.id!==res.data.data.need.userId){
						 this.others=true;
					 }
					 if(res.data.data.need.enable!=1){
						 this.hasSelectAready=true
					 }
                }else{

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
								result[i].pic=_this.othersInfo.pic;
								try{
									_this.chatItemId=JSON.parse(result[i].data.content).item;
									_this.id=_this.chatItemId;

								}catch(e){

								}
							   	_this.createOnMessage(result[i])
						   	}else{
								result[i].pic=_this.currentUserImgae;
							   	_this.createUserTalk(result[i])
						   	}
					   	}
						$(document).ready(function () {
							let top = $('#convo').height();
							console.log(top);
							$('#content').animate({
								scrollTop: top
							}, 100);
						})

						setTimeout(()=>{

						},0)
						_this.loadData()
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
		},

    },
	activated(){
		$('#chat-thread').empty();
		this.id='';
		this.id=this.$route.query.id;
		this.toChartId=this.$route.query.toChartId;
		if(window.localStorage.getItem('gl_CURRENTUSER')){
			this.CURRENTUSER=JSON.parse(window.localStorage.getItem('gl_CURRENTUSER'));
			this.currentUserImgae=this.CURRENTUSER.pic;
		}
		this.getOthersInfo(this.toChartId);
		this.loadData();
	},
	mounted(){

	},
    created(){
		this.id=this.$route.query.id;
		this.toChartId=this.$route.query.toChartId;
		$('#chat-thread').bind('click',function (e) {
			console.log(e);
		})

    }
}
</script>

<style lang='less'>
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
	width: 100%;
	right: 0;
	left: 0;
}
.convo{
	margin-top: 90px!important;
	margin-bottom: 10px;
}
.gl_no_item{
	margin-top: 0!important;
}
.chart_main_content{
	font-size: 14px;
	margin: 10px auto;
	width: 84%;
	padding: 12px .24rem;
	border-radius: 8px;
	background: #fff;
	display: flex;
}

.chart_main_content_image > div{
	width: 1.6rem;
	height: 100%;
}
.chart_main_content_image > div > img{
	width: 100%;
	height: 100%;
}
.chart_main_content_decription{
	flex:2;
	margin-left: .2rem;
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
	flex: 1;
}
.chart_main_content_action>div{
	flex: 1;
    margin-top: 36px;
    display: flex;
    flex-direction: row;

}
.chart_main_content_action>div span{
	padding: 6px .24rem;
	margin-left: .08rem;
	background-color: rgba(241, 241, 241, 1);
	border-radius: 2px;
	color: #666;
	white-space: nowrap;
	overflow: hidden;
	color: #fff;
	&.do_agree{
		background: #1676ec;
	}
	&.do_reject{
		background: red;

	}
	&.do_help{
		background: #1676ec
	}
	&.do_help_grey{
		background: #b3b3b3;
	}
}
.mint-toast{
	padding: 20px .2rem!important;
}
</style>
