<style scoped>
	.messageList{
		font-size: 12px;
		color: #999;
	}
	.image_chat{
		width: 1rem;
		height: 1rem;
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
</style>

<template>

	<div class="messageList">
		<div class="message_warp">
			<ul>
				<li v-for="(item,index) in messageList" @click='toChatPage(item)'>
					<div class="image_chat">
						<img src="../assets/images/12.jpeg" alt="">
					</div>
					<div class="content_chat">
						<span class="name_chat">{{item.from}}</span>
						<span class="detail_chat">{{item.data.content}}</span>
						<span class="time_chat">{{timestampToTime(item.dateline)}}</span>
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
        }
    },
    methods:{
		toChatPage(item){
			console.log(item);
			this.$router.push({
				path: 'im',
				query: {
					'token': this.token,
					'title': item.nikename,
					'id': item.to,
					'toChartUser':item.from,
					'toChartId':item.from
				}
			});
		},
        timestampToTime(time){
            let date = new Date(time);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + '';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y+M+D;
        },
    },
    activated(){
		if(window.localStorage.getItem('MESSAGELIST')){
			this.messageList=JSON.parse(window.localStorage.getItem('MESSAGELIST'));
			console.log(this.messageList);
		}
    },
    created(){
		this.messageList=[]
    }

}

</script>
