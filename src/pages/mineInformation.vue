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
    height: 190px;
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
    color: #9B9B9B;
    width: 40%;
    text-align: center;
}
.mineInformation_edit_button span{
    width: 1.8rem;
    display: inline-block;
    background: #F1F1F1;
    height: 34px;
    border: 1px solid #979797;
    line-height: 34px;
}
/*.mineInformation_recommend::after{
    content: '';
    clear: both;
    width: 84%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-bottom: 1px solid rgba(151,151,151,0.34);
}*/
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
            <div class="mineInformation_edit_button">
                <span>编辑信息</span>
            </div>
        </div>
        <div class="mineInformation_recommend">
            <p>Facebook（脸书）是美国的一个社交网络服务网站 ，创立于2004年2月4日，总部位于美国加利福尼亚州帕拉阿图，2012年3月6日发布Windows版桌面聊天软件Facebook Messenger</p>
        </div>
    </div>
    <div class="mineInformation_line">

    </div>
    <div class="mineInformation_history_action">
        <div class="" v-for="(item,index) in historyAction">
            <ActionList :historyActionItem="item"></ActionList>
        </div>
    </div>
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
    components: {
        Header,
        List,
        ActionList
    },
}

</script>
