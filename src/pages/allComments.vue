<template>
    <div class="">
        <div class="mineInformation_comment_warp">
            <div class="comment_repeat" v-for="(item,index) in commentList" >
                <p class="comment_repeat_top">
                    <img :src="item.pic" alt="">
                    <span>{{item.evaluation.uEvluatorName}}</span>
                    <span class="score">评分:{{item.evaluation.score}}</span>
                </p>
                <p class="comment_repeat_middle">
                    {{item.evaluation.createTime}} 标题:{{item.needAggEntity.conceretNeed.title}} 悬赏金额:{{item.needAggEntity.conceretNeed.rewardAmount}}
                </p>
                <p class="comment_repeat_bottom">
                    {{item.evaluation.content}}
                </p>
            </div>

        </div>
         <div class="defindloadig" v-if="loadingShow">
             <loading></loading>
         </div>
    </div>
</template>

<script>
    import loading from '../components/loading.vue'
    import userMix from "../mixins/userInfo";
	export default {
        'name': 'allComments',
        mixins: [userMix],
		components:{
            loading
		},
		data(){
			return{
                commentList:[],
                loadingShow:true
			}
		},
		props:{

		},
		methods:{
            getEvalute(){
                let acquired='&acquired=true';
                if(this.id=='mycomment'){
                    acquired='&acquired=false'
                }
                let url='/globalmate/rest/evaluate/list'
                if(this.isOthers){
                    url='/globalmate/rest/evaluate/list/'+this.otherUserId;
                }
                this.axios.get(this.ip+url,{
                    params:{
                        token:this.userInfo.token,
                        onlyCurrentUser:true,
                        acquired:true,
                    }
                }).then((res)=>{
                    if(res.success){
                        let data=res.data
                        this.getEvalutePic(data)
                    }else {
                        this.loadingShow=false;
                    }

                }).catch((e)=>{
                    this.loadingShow=false;
                    console.log(e);
                })
            },
            getEvalutePic(data){
                this.commentList=[];
                let _this=this;
                for(var i=0;i<data.length;i++){
                    var curData=data[i];
                    curData.evaluation.createTime=this.moment(curData.evaluation.createTime).format('YYYY-MM-DD');
                    for(var n=0;n<this.userList.length;n++){
                        if(curData.evaluation.uEvaluatorId==this.userList[n].id){
                            curData.pic=this.userList[n].pic;
                            _this.commentList.push(curData)
                            let len = _this.commentList.length;
        　　                 let minIndex, temp;
                            for(var i=0;i<len;i++){
                                minIndex = i;
                        　　　　 for (var j = i + 1; j < len; j++) {
                        　　　　 　　if (_this.commentList[j].evaluation.score> _this.commentList[minIndex].evaluation.score) {
                        　　　　　 　　　minIndex = j;
                        　　　　　 　}
                        　　　　 }
                                temp = _this.commentList[i];
        　　　                   _this.commentList[i] = _this.commentList[minIndex];
        　　　　                 _this.commentList[minIndex] = temp;
                            }
                        }
                    }
                    this.loadingShow=false;
                }
            },
		},
		activated(){
            this.commentList=[];
            this.isOthers=this.$route.query.isOthers;
            if (this.userInfo.token) {
               this.getEvalute();
            } else {
              this.time = setInterval(() => {
                if (this.userInfo.token) {
                  this.getEvalute();
                  clearInterval(this.timer);
                }
              }, 200);
            }
		},
        deactivated() {
          clearInterval(this.timer);
        },
		created(){

		}
	}
</script>

<style>
    .mineInformation_comment_warp{
        position: relative;
        font-size: 14px;
        background: #f7f5f3;
        padding: 10px 0;
    }
    .mineInformation_comment_warp>div{
        background: #fff;
        margin-bottom: 10px;
        padding: 10px 0.4rem;
        font-size: 14px;
    }
    .mineInformation_comment_warp .mineInformation_comment_header{
        margin-bottom: 0;
        text-align: left;
    }
    .mineInformation_comment_warp>div>.comment_repeat_top img{
        width: .8rem;
        height: 0.8rem;
        border-radius:4px;
    }
    .comment_repeat_top{
        display: flex;
        flex-direction: row;
        position: relative;
    }
    .comment_repeat_top span{
        line-height: 0.8rem;
        margin-left: .2rem;
        color: #333;
    }
    .comment_repeat_top .score{
        position: absolute;
        right: 0;
        color: #ff0023;
    }
    .comment_repeat_middle{
        margin-top: 10px;
        font-size: 12px;
        color: #999;
        text-align: left;
    }
    .comment_repeat_bottom{
        margin-top: 10px;
        text-align: left;
    }
    .mineInformation_comment_warp>p{
        width: 2rem;
        margin: auto;
        color: #e42641;
        border: 1px solid #e42641;
        background: #fff;
        padding: 6px 0.3rem;
        border-radius: 16px;
    }
</style>
