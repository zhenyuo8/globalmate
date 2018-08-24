<style scoped>

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
    font-size: 30px;
    margin-top: 8px;
    margin-right:.4rem;
    text-align: right;
}
 .mineInformation_chart_button span{
    width: auto!important;
    margin-left: 0!important;
    display: inline-block;
    background: #eee;
    padding:0.1rem;
    border-radius: 4px;
    color: #007aff;
    border-radius: 50%;
    margin-right: .2rem;
}
 .mineInformation_chart_button .icon-wechat::before{
     color: #0bbb0b;
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
.mineInformation_hobby, .mineInformation_school, .mineInformation_comment{
     font-size: 14px;
     color: #999;
     width: 80%;
     padding: 16px 0.2rem;
     margin: auto;
     margin-top: 20px;
     border: 1px solid #eee;
     border-radius: 6px;
     position: relative;
}
.mineInformation_hobby_content{
    padding: .04rem;
}
.mineInformation_school_title, .mineInformation_hobby_title, .mineInformation_comment_title{
    height: 32px;
    line-height: 32px;
    position: absolute;
    top: -16px;
    background: #fff;
    padding: 0 10px;
    left: 6%;

}
.mineInformation_school_content_repeat span, .mineInformation_hobby_offer span, .mineInformation_hobby_love span{
    line-height: 32px;
    color: #333;
    font-size: 13px;
    margin-left: .12rem;
    text-align: left;
}

.mineInformation_school_content_repeat, .mineInformation_hobby_offer, .mineInformation_hobby_love{
    text-align: left;
    white-space: nowrap;
    overflow-x: scroll;
}
.mineInformation_comment_content{
    overflow: hidden;
}
.mineInformation_comment_content span{
    color: #fff;
    padding: .1rem 0.15rem;
    border-radius: 4px;
    margin-top: 12px;
    float: left;
    margin-left: .2rem;
}
.mineInformation_comment_content span:nth-child(3n+1){
    background: red;
}
.mineInformation_comment_content span:nth-child(3n+2){
    background: #cc00ff;
}
.mineInformation_comment_content span:nth-child(3n+3){
    background: blue;
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
                    <span class="mineInformation_call">{{$t('formTitle.serviceValue')}} <i style='color:blue'>{{nice}}</i></span>
                </div>
            </div>
            <div class="mineInformation_chart_button"  v-show="isOthers">
                <span class="icon-wechat" @click='chartWith'></span>
                <span class="icon-user-add" @click='addIMFriend'></span>
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
        <div class="mineInformation_hobby">
            <div class="mineInformation_hobby_title">
                {{$t('formTitle.pfrofile')}}
            </div>
            <div class="mineInformation_hobby_content">
                <div class="mineInformation_hobby_love">
                    <span class="title">{{$t('formTitle.intrest')}} ：{{hobby}}</span>
                </div>
                <div class="mineInformation_hobby_offer">
                    <span class="title">{{$t('formTitle.helpAvailable')}} ：{{helpAvailable}}</span>
                </div>
            </div>
        </div>
        <div class="mineInformation_comment">
            <div class="mineInformation_comment_title">
                {{$t('formTitle.commentsme')}}
            </div>
            <div class="mineInformation_comment_content">
                <p v-if="tipInOther.length==0">暂无评价</p>
                <span v-for='item in tipInOther'>{{item}}</span>
            </div>
        </div>
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
    'name': 'mine',
    components: {
        loading
    },
    data() {
        return {
            school:[],
            hobby:'',
            nice:'',
            helpAvailable:'',
            information:{},
            tipInOther:[],
            isOthers:true,
            loadingShow:true,
            otherUserId:'',
            currentUserId:'',

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
                'request_person':this.currentUserId
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
            this.apiHost=CONFIG[__ENV__].apiHost;
            this.axios.get(this.apiHost+'/globalmate/rest/evaluate/list'+'?token='+this.$route.query.token+'&onlyCurrentUser=true',{

            }).then((res)=>{
                if(res.data.success){
                    console.log(res.data);

                }else {
                    this.loadingShow=false;
                }

            }).catch((e)=>{
                this.loadingShow=false;
                console.log(e);
            })
        },
        loadInfo(){
            this.apiHost=CONFIG[__ENV__].apiHost;
            let url='/globalmate/rest/user/getUserByToken'
            if(this.$route.query.otherUserId){
                url='/globalmate/rest/user/list/'+this.$route.query.otherUserId
            }
            this.axios.get(this.apiHost+url+'?token='+this.$route.query.token,{

            }).then((res)=>{
                if(res.data.success){
                    let data=res.data.data;
                    this.information=data;
                    this.userId=data.id;
                    this.hobby=data.hobby;
                    this.nice=data.nice;
                    this.helpAvailable=data.helpAvailable;
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
        this.loadInfo();
        this.isOthers=true;
        this.otherUserId=this.$route.query.otherUserId;
        this.currentUserId=this.$route.query.currentuser;
        this.getEvalute();
        if(!this.otherUserId||(this.otherUserId==this.currentUserId)){
            this.isOthers=false;
        }
    },
    created(){
    }

}

</script>
