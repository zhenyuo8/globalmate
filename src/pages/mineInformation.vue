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
    height: 60px;
    /*position: relative;*/
}

.mineInformation_image {
    width: 58px;
    height: 58px;
    position: absolute;
    left: 0.68rem;
    top: -30px;
    z-index: 12;
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
}

.mineInformation_call {
    margin-left: .14rem;
}
.mineInformation_top img{
    width: 16px;
}

.mineInformation_interaction{
    display: flex;
}

.mineInformation_interaction_sub{
    display: flex;
    font-size: 14px;
    width: 60%;
    color: #9B9B9B;
}
.mineInformation_interaction_sub > div{
    flex: 1;
    flex-direction: column;
    display: flex;
    height: 36px;
}
.mineInformation_interaction_sub > div > span{
    flex: 1;
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
    color: #fff;
    width: 40%;
    text-align: center;
    height: 32px;
}
 .mineInformation_chart_button span{
    width: auto!important;
    margin-left: 0!important;
    padding: 0 .08rem;
    display: inline-block;
    background: #007aff;
    height: 32px;
    border-radius: 4px;
    line-height: 32px;
}
 .mineInformation_chart_button .icon-chat::before{
     margin-right: .08rem;
     font-weight: bold;
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
     width: 80%;
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
    height: 32px;
    line-height: 32px;
    color: #333;
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
    <!-- <div class="header">
        <Header :hearderParas='hearderParas'></Header>
    </div> -->
    <div class="mineInformation_user_image">
        <img src="../assets/images/secondimage.jpg" alt="">
    </div>
    <div class="mineInformation_info">
        <div class="mineInformation_detail">
            <div class="mineInformation_image">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529843567270&di=7d4461aad4d2e95deacf7b85c6669387&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F86%2F88%2F55a09df24b97e_1024.jpg" alt="">
            </div>
            <div class="mineInformation_information">
                <div class="mineInformation_top">
                    <span class="mineInformation_username">圈圈</span>
                    <span class="mineInformation_call">好人值 101</span>
                    <img src="../assets/images/mine-identify.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="mineInformation_interaction">
            <div class="mineInformation_interaction_sub">
                <div class="mineInformation_foucs">
                    <span class="mineInformation_foucs_amount">123</span>
                    <span class="mineInformation_foucs_text">关注</span>
                </div>
                <div class="mineInformation_fans">
                    <span class="mineInformation_fans_amount">9999</span>
                    <span class="mineInformation_fans_text">粉丝</span>
                </div>
                <div class="mineInformation_praise">
                    <span class="mineInformation_praise_amount">87988</span>
                    <span class="mineInformation_praise_text">赞</span>
                </div>
            </div>
            <div class="mineInformation_edit_button" @click='goEditMineInfo'>
                <span>编辑信息</span>
            </div>
            <!-- <div class="mineInformation_chart_button" @click='chartWith'>
                <span class="icon-chat">联系她/他</span>
            </div> -->
        </div>
        <div class="mineInformation_recommend">
            <p>Facebook（脸书）是美国的一个社交网络服务网站 ，创立于2004年2月4日，总部位于美国加利福尼亚州帕拉阿图，2012年3月6日发布Windows版桌面聊天软件Facebook Messenger</p>
        </div>
        <div class="mineInformation_line">

        </div>
        <div class="mineInformation_school">
            <div class="mineInformation_school_title">
                我的圈子
            </div>
            <div class="mineInformation_school_content">
                <div class="mineInformation_school_content_repeat">
                    <span class="scholl_name">南开大学</span>
                    <span class="scholl_time">2006-09-01</span>
                    <span class="scholl_professional">中文历史</span>
                    <span class="scholl_grade">1</span>
                </div>
                <div class="mineInformation_school_content_repeat">
                    <span class="scholl_name">临川中学</span>
                    <span class="scholl_time">2003-09-01</span>
                    <span class="scholl_professional">高中理科</span>
                    <span class="scholl_grade">1</span>
                </div>
            </div>
        </div>
        <div class="mineInformation_hobby">
            <div class="mineInformation_hobby_title">
                个人特质
            </div>
            <div class="mineInformation_hobby_content">
                <div class="mineInformation_hobby_love">
                    <span class="title">兴趣爱好 ：</span>
                    <span class="content">喜欢打篮球，游泳</span>
                </div>
                <div class="mineInformation_hobby_offer">
                    <span class="title">愿意提供的帮助 ：</span>
                    <span class="content">帮带／陪伴</span>
                </div>
            </div>
        </div>
        <div class="mineInformation_comment">
            <div class="mineInformation_comment_title">
                别人眼中的我
            </div>
            <div class="mineInformation_comment_content">
                <span class="">诚实</span>
                <span>守时，靠谱</span>
                <span>年轻思维活跃</span>
                <span>家有萌娃</span>
                <span>实力派+偶像派</span>
                <span>坑货</span>
            </div>
        </div>
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
export default {
    'name': 'mine',
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
            ]
        }
    },
    methods:{
        goEditMineInfo(){
            this.$router.push({
                path: 'personalFile',
                query: {
                    'token': this.token,
                    'title': '个人资料',
                }
            });
        },
        chartWith(){
            this.$router.push({
                path: 'im',
                query: {
                    'token': '22223',
                    'title': '哈哈',
                    'id': 'fffff',
                }
            });
        }
    },
    components: {
        Header,
        List,
        ActionList
    },
}

</script>
