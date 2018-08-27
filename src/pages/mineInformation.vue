<style scoped lang='less'>

.header{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background: #fff;
    z-index: 11;
    height: 33px;
}
.mineInformation{
  background: #fff;
}
.mineInformation_user_image {
    width: 100%;
    height: 186px;
}

.mineInformation_user_image img {
    width: 100%;
    height: 100%;
}

.mineInformation_info {
    position: relative;
}


.mineInformation_detail {
    overflow: hidden;
    height: 48px;
}

.mineInformation_image {
    width: 58px;
    height: 58px;
    position: absolute;
    left: 0.68rem;
    top: -30px;
    z-index: 12;
    background: #fff;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.mineInformation_image img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: inline-block;
}

.mineInformation_information {
    position: absolute;
    left: 2.22rem;
    font-size: 14px;
    color: #9B9B9B;
    text-align: left;
}

.mineInformation_information > div {
    flex: 1
}

.mineInformation_username {
    font-size: 20px;
    color: #333;
}

.mineInformation_location {
    margin-top: 18px;
}

.mineInformation_top {
    margin-top: 6px;
    max-width: 3rem;
    white-space: nowrap;
}
.mineInformation_top span{
    display: block;
}

.mineInformation_call {
    margin-top: .14rem;
}
.mineInformation_top img{
    width: 16px;
}

.mineInformation_edit_button{
    font-size: 14px;
    color: #fff;
    width: 40%;
    text-align: center;
    height: 32px;
}
.mineInformation_edit_button span{
    width: 1.8rem;
    display: inline-block;
    background: #007aff;
    margin-left: .76rem;
    height: 32px;
    border-radius: 4px;
    line-height: 32px;
}
.mineInformation_chart_button{
    font-size: 14px;
    position: absolute;
    right: 0.2rem;
    top: 5px;
}
 .mineInformation_chart_button span{
     padding: 4px .2rem;
     box-sizing: border-box;
     border-radius: 14px;
     &.chat{
         background: blue;
         color: #fff;
         border:1px solid blue
     }
     &.friends{
         color: #e42641;
         border:1px solid #e42641
     }
}
.mineInformation_recommend{
    height: 98px;
}
.mineInformation_recommend p{
    text-align: left;
    font-size: 14px;
    color: #9B9B9B;
    padding: 21px .58rem;
}
.mineInformation_line{
    width: 84%;
    margin: 12px auto;
    border-bottom: 1px solid rgba(151,151,151,0.34);
}
.mineInformation_history_action{
    padding-bottom: 20px;
}
 .mineInformation_school{
     font-size: 14px;
     color: #999;
     width: 80%;
     padding: 16px 0.2rem;
     margin: auto;
     margin-top: 20px;
     border: 1px solid #eee;
     border-radius: 6px;
     position: relative;
     margin-bottom: 10px;
}

.mineInformation_school_title{
    height: 32px;
    line-height: 32px;
    position: absolute;
    top: -16px;
    background: #fff;
    padding: 0 10px;
    left: 6%;

}
.mineInformation_school_content_repeat span{
    line-height: 32px;
    color: #333;
    font-size: 13px;
    margin-left: .12rem;
    text-align: left;
}

.mineInformation_school_content_repeat{
    text-align: left;
    white-space: nowrap;
    overflow-x: scroll;
}


.mineInformation_comment_warp, .mineInformation_hobby_warp{
    position: relative;
    font-size: 14px;
    background: #f7f5f3;
    padding: 10px 0;
}
.mineInformation_hobby_warp>div{
    background: #fff;
    margin-bottom: 10px;
    padding: 5px 0.4rem;
}
.mineInformation_hobby_content{
    text-align: left;
}
.mineInformation_hobby_content span{
    padding: 5px;
}
.mineInformation_hobby_love{
    padding: 4px;
}
.mineInformation_hobby_offer{
    border: 1px solid #d3d3d3;
    border-radius: 10px;
    padding: 4px;
}
.mineInformation_hobby_offer>div span{
    padding: 6px .4rem;
    background: #f7ebf4;
    border-radius: 12px;
    margin: 4px .1rem;
    font-size: 12px;
    color: #666;
}
.mineInformation_comment_warp>div{
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 0.4rem;
}
.mineInformation_comment_warp .mineInformation_comment_header, .mineInformation_hobby_warp .mineInformation_hobby_header{
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

<template>

<div class="mineInformation">
    <div class="mineInformation_user_image">
        <img src="../assets/images/stanfu.jpeg" alt="">
    </div>
    <div class="mineInformation_info">
        <div class="mineInformation_detail">
            <div class="mineInformation_image">
                <img :src='information.pic' alt="">
            </div>
            <div class="mineInformation_information">
                <div class="mineInformation_top">
                    <span class="mineInformation_username">{{information.nikename||information.name}}</span>
                    <span class="mineInformation_call">{{$t('formTitle.serviceValue')}} <i style='color:#ff0023'>{{nice}}</i></span>
                </div>
            </div>
            <div class="mineInformation_chart_button"  v-show="isOthers">
                <span class="chat" @click='chartWith'>联系Ta</span>
                <span class="friends" @click='addIMFriend'>+好友</span>
            </div>
        </div>

        <div class="mineInformation_recommend" v-if="information.decription">
            <p></p>
        </div>
        <div class="mineInformation_line">

        </div>
        <div class="mineInformation_school">
            <div class="mineInformation_school_title">
                {{$t('formTitle.mycircle')}}
            </div>
            <div class="mineInformation_school_content">
                <div class="mineInformation_school_content_repeat" v-for="(item,index) in school">
                    <span class="scholl_name">{{item.schoolname}}</span>
                    <span class="scholl_time">{{item.schooldate}}</span>
                    <span class="scholl_professional">{{item.professional}}</span>
                    <span class="scholl_grade">{{item.grade}}</span>
                </div>
                <p v-if="school.length==0">暂未添加圈子</p>
            </div>
        </div>
        <div class="mineInformation_hobby_warp">
            <div class="mineInformation_hobby_header">
                {{$t('formTitle.pfrofile')}}
            </div>
            <div class="mineInformation_hobby_content">
                <div class="mineInformation_hobby_love">
                    <span class="title">{{$t('formTitle.intrest')}} ：{{hobby}}</span>
                </div>
                <div class="mineInformation_hobby_offer">
                    <span class="title">{{$t('formTitle.helpAvailable')}}</span>
                    <div class="">
                        <span v-for="item in helpAvailable">{{item}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mineInformation_comment_warp">
            <div class="mineInformation_comment_header">
                {{$t('formTitle.commentsme')}} ({{total}})
            </div>
            <div class="comment_repeat" v-for="(item,index) in commentList" v-if='index<=2' :key='index'>
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

            <p v-show="total>3" @click='viewAllComments'>查看全部评价</p>
        </div>
    </div>
    <div class="defindloadig" v-if="loadingShow">
        <loading></loading>
    </div>

</div>

</template>

<script>
import loading from '../components/loading.vue'
import { MessageBox,Toast} from 'mint-ui';
import userMix from "../mixins/userInfo";
export default {
    'name': 'mine',
    mixins: [userMix],
    components: {
        loading
    },
    data() {
        return {
            school:[],
            hobby:'',
            nice:'',
            helpAvailable:[],
            information:{},
            isOthers:true,
            loadingShow:true,
            otherUserId:'',
            commentList:[],
            total:0

        }
    },
    methods:{
        goEditMineInfo(){
            this.$router.push({
                path: 'personalFile',
                query: {
                    'token': this.$route.query.token,
                    'title': '个人资料',
                }
            });
        },
        chartWith(){
            this.$router.push({
                path: 'im',
                query: {
                    'token': this.$route.query.token,
                    'title': this.information.nikename,
                    'id': this.$route.query.id,
                    'toChartUser':this.information.nikename,
                    'toChartId':this.otherUserId,
                }
            });
        },
        addIMFriend(){
            let _this=this;
            let content={
                'item':'',
                'chatContent':"<i style='color:red'>我想和您成为好朋友!</i>",
                'chatType':'add_friends_request',
                'request_person':this.userInfo.userId
            }
            YYIMChat.getRosterItems({
            	success: function(data){
                    if(data){
                        let userlist=JSON.parse(data);
                        var isFriend=userlist.some((item,index)=>{
                            return item.id==_this.information.id
                        });
                        if(isFriend){
                            Toast({
              					message: '您和'+_this.information.nikename+'已经是好友关系了！',
              					duration: 2000
            				});
                        }else{
                            MessageBox.confirm('',{
                                title: '',
                                message: '确定发送加好友请求?',
                                confirmButtonText:_this.$t('button.confirm'),
                                cancelButtonText:_this.$t('button.cancel'),
                                showCancelButton: true
                            }).then(action => {
                                YYIMChat.sendTextMessage({
                                    to: _this.information.id+'',
                                    type: 'chat',
                                    content: JSON.stringify(content),
                                    body: {},
                                    success:function(data){
                                    },
                                    error:function(err){
                                        console.log(err);
                                    }
                                })
                            }).catch(cancel=>{

                            });
                        }
                    }
            	},
            	error: function(err){
            		console.log(err);
            	},
            	complete: function(){}
            });
        },
        getEvalute(){
            let url='/globalmate/rest/evaluate/list'
            if(this.isOthers){
                url='/globalmate/rest/evaluate/list/'+this.otherUserId;
            }
            this.axios.get(this.ip+url,{
                params:{
                    token:this.userInfo['token'],
                    onlyCurrentUser:true,
                    acquired:true,
                }
            }).then((res)=>{
                if(res.success){
                    let data=res.data;
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
            this.total=data.length;
            for(var i=0;i<data.length;i++){
                var curData=data[i];
                curData.evaluation.createTime=this.moment(curData.evaluation.createTime).format('YYYY-MM-DD');
                (function(curData){
                    _this.axios.get(_this.ip+'/globalmate/rest/user/list/'+curData.evaluation.uEvaluatorId+'?token='+_this.$route.query.token,{}).then((res)=>{
                        if(res.success){
                            curData.pic=res.data.pic;
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
                    }).catch((e)=>{
                        console.log(e);
                    })
                })(curData)
            }
        },
        viewAllComments(){
            this.$router.push({
                path: 'allComments',
                query: {
                    'token': this.$route.query.token,
                    'title': "全部评价",
                    'isOthers':this.isOthers
                }
            });
        },
        loadInfo(){
            let url='/globalmate/rest/user/getUserByToken'
            if(this.$route.query.otherUserId){
                url='/globalmate/rest/user/list/'+this.$route.query.otherUserId
            }
            this.axios.get(this.ip+url+'?token='+this.$route.query.token,{

            }).then((res)=>{
                if(res.success){
                    let data=res.data;
                    this.information=data;
                    this.userId=data.id;
                    this.hobby=data.hobby;
                    this.nice=data.nice;
                    if(data.helpAvailable&&data.helpAvailable.indexOf('、')>-1){
                        this.helpAvailable=data.helpAvailable.split('、');
                    }else{
                        this.helpAvailable=data.helpAvailable.split(',');
                    }

                    this.loadingShow=false;
                    if(data.school){
                        this.school=JSON.parse(data.school);
                    }

                }else {
                    this.loadingShow=false;
                }

            }).catch((e)=>{
                this.loadingShow=false;
                console.log(e);
            })
        },

    },
    activated(){
        this.isOthers=true;
        this.helpAvailable=[];
        this.commentList=[];
         this.total=0;
        this.otherUserId=this.$route.query.otherUserId;

        if (this.userInfo.token) {
            this.loadInfo();
            if(!this.otherUserId||(this.otherUserId==this.userInfo.userId)){
                this.isOthers=false;
            }
             this.getEvalute();
        } else {
          this.timer = setInterval(() => {
            if (this.userInfo.token) {
              this.loadInfo();
              if(!this.otherUserId||(this.otherUserId==this.userInfo.userId)){
                  this.isOthers=false;
              }
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
