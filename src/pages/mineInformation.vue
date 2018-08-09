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
    /*height: 190px;*/
    position: relative;
}


.mineInformation_detail {
    overflow: hidden;
    /*height: 36px;*/
    /*position: relative;*/
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
    border: 1px solid rgba(151, 151, 151, 1);
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
    margin: 21px auto;
    border-bottom: 1px solid rgba(151,151,151,0.34);
}
.mineInformation_history_action{
    padding-bottom: 20px;
}
.mineInformation_hobby, .mineInformation_school, .mineInformation_comment{
     font-size: 14px;
     color: #999;
     width: 86%;
     padding: 16px 0;
     margin: auto;
     margin-top: 20px;
     border: 1px solid #eee;
     border-radius: 6px;
     position: relative;
}
.mineInformation_school{

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
.mineInformation_school_content_repeat{
    /*display: flex;*/
}
.mineInformation_school_content_repeat span, .mineInformation_hobby_offer span, .mineInformation_hobby_love span{
    /*height: 32px;*/
    line-height: 32px;
    color: #333;
    font-size: 13px;
    margin-left: .12rem;
    text-align: left;
}
.mineInformation_school_content_repeat, .mineInformation_hobby_offer, .mineInformation_hobby_love{
    text-align: left;
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

<div class="mineInformation">
    <!-- <div class="header">
        <Header :hearderParas='hearderParas'></Header>
    </div> -->
    <div class="mineInformation_user_image">
        <!-- <span class="icon-image_default"></span> -->
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
                    <span class="mineInformation_call">服务值 0</span>
                    <!-- <img src="../assets/images/mine-identify.jpg" alt=""> -->
                </div>
            </div>
            <div class="mineInformation_chart_button" @click='chartWith' v-if="isOthers">
                <span class="icon-wechat"></span>
                <span class="icon-user-add"></span>
            </div>
        </div>

        <div class="mineInformation_recommend" v-if="information.decription">
            <p></p>
        </div>
        <div class="mineInformation_line">

        </div>
        <div class="mineInformation_school">
            <div class="mineInformation_school_title">
                我的圈子
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
                个人特质
            </div>
            <div class="mineInformation_hobby_content">
                <div class="mineInformation_hobby_love">
                    <span class="title">兴趣爱好 ：</span>
                    <span class="content">{{hobby}}</span>
                </div>
                <div class="mineInformation_hobby_offer">
                    <span class="title">愿意提供的帮助 ：</span>
                    <span class="content">{{helpAvailable}}</span>
                </div>
            </div>
        </div>
        <div class="mineInformation_comment">
            <div class="mineInformation_comment_title">
                别人眼中的我
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
    <div class="mineInformation_line">

    </div>
    <!--<div class="mineInformation_history_action">-->
        <!--<div class="" v-for="(item,index) in historyAction">-->
            <!--<ActionList :historyActionItem="item"></ActionList>-->
        <!--</div>-->
    <!--</div>-->
</div>

</template>

<script>

import Header from '../components/header.vue'
import List from '../components/list.vue'
import ActionList from '../components/actionList.vue'
import CONFIG from '../config/config'
import loading from '../components/loading.vue'
export default {
    'name': 'mine',
    components: {
        Header,
        List,
        ActionList,
        loading
    },
    data() {
        return {
            hearderParas: {
                title: '个人资料',
                right: {
                    text: '',
                    icon: '../assets/logo.png'
                }
            },
            listRepeat: [{
                title: '我发布的',
                text: 2,
                arrow: true
            }, {
                title: '我解决的',
                text: 223,
                arrow: true
            }],
            mineInformation: {
                title: '我的',
                right: {
                    text: '',
                    icon: '../assets/logo.png'
                }
            },
            school:[],
            hobby:'',
            helpAvailable:'',
            information:{},
            historyAction:[
                {
                    'time':'今天',
                    'data':{
                        'top':{
                            'title':'!!! 标题',
                            'type':'陪伴',
                        },
                        'decription':'我要去环游世界我要去环游世界我要去环游世界我要去环游世界我要去环游世界我要去环游世界我要去环游世界我要去环游世界我要去环游世',
                        'url':'',
                        'from':'夏威夷群岛',
                        'rewardContent':'悬赏内容'
                    }
                },
                {
                    'time':'昨天',
                    'data':{
                        'top':{
                            'title':'### 标题',
                            'type':'代购',
                        },
                        'decription':'我要购买特斯拉,白宫劳斯莱斯加长我要购买特斯拉,白宫劳斯莱斯加长我要购买特斯拉,白宫劳斯莱斯加长',
                        'url':'',
                        'from':'北极',
                        'rewardContent':'悬赏内容'
                    }
                }
            ],
            tipInOther:[],
            isOthers:false,
            loadingShow:true
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
                    'toChartId':this.userId,
                }
            });
        },
        loadInfo(){
            this.apiHost=CONFIG[__ENV__].apiHost;
            let url='/globalmate/rest/user/getUserByToken'
            if(this.$route.query.userId){
                url='/globalmate/rest/user/list/'+this.$route.query.userId
            }
            this.axios.get(this.apiHost+url+'?token='+this.$route.query.token,{

            }).then((res)=>{
                if(res.data.success){
                    let data=res.data.data;
                    this.information=data;
                    this.userId=data.id;
                    this.hobby=data.hobby;
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
        }
    },
    activated(){
        this.loadInfo();
        if(this.$route.query.userId){
            this.isOthers=true;
        }
    },

}

</script>
