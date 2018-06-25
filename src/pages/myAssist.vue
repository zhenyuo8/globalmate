<style scoped>
@import '../assets/css/list.css';
</style>

<template>

<div class="myAssist">
    <!-- <div class="header">
        <Header :hearderParas='hearderParas'></Header>
    </div> -->
    <div class="repeat_assist" v-for="item in myAssistList">
        <div class="top">
            <span class="top_left">
                        {{item.data.top.title}}
                    </span>
            <span class="top_right">
                        {{item.data.top.type}}
                    </span>
        </div>
        <div class="middle">
            <div class="middle_left">
                <p class="middle_decription">{{item.data.decription}}</p>
                <p class="middle_from">{{item.data.from}}</p>
            </div>
            <div class="middle_right">
                <img src="../assets/images/history.jpeg" alt="">
                <!-- {{historyActionItem.data.url}} -->
            </div>
        </div>
        <div class="bottom">
            <div class="bottom_left">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529843567270&di=7d4461aad4d2e95deacf7b85c6669387&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F86%2F88%2F55a09df24b97e_1024.jpg" alt="" class="bottom_left_userimage">
                <span class="bottom_left_username">{{item.data.bottom.modifyinfo.username}}</span>
                <span class="bottom_left_time">{{item.data.bottom.modifyinfo.modifytime}}</span>
            </div>
            <div class="bottom_right">
                {{item.data.bottom.rewardContent}}
            </div>
        </div>
    </div>
</div>

</template>

<script>

import Header from '../components/header.vue'
export default {
    'name': 'myAssist',
    components: {
        Header,
    },
    data() {
        return {
            hearderParas: {
                title: '我发布的',
                right: {
                    text: '',
                    icon: '../assets/logo.png'
                }
            },
            myAssistList: [{
                'time': '今天',
                'data': {
                    'top': {
                        'title': '!!! 标题',
                        'type': '陪伴',
                    },
                    'decription': '我要去环游世界我要去环游世界我要去环游世界我要去环游世界我要去环游世界我要去环游世界我要去环游世界我要去环游世界我要去环游世',
                    'url': '',
                    'from': '夏威夷群岛',
                    'bottom':{
                        'modifyinfo':{
                            'url':'',
                            'username':'圈圈',
                            'modifytime':'2018-09-01',
                        },
                        'rewardContent': '悬赏内容'
                    }
                }
            }, {
                'time': '昨天',
                'data': {
                    'top': {
                        'title': '### 标题',
                        'type': '代购',
                    },
                    'decription': '我要购买特斯拉,白宫劳斯莱斯加长我要购买特斯拉,白宫劳斯莱斯加长我要购买特斯拉,白宫劳斯莱斯加长',
                    'url': '',
                    'from': '北极',
                    'bottom':{
                        'modifyinfo':{
                            'url':'',
                            'username':'圈圈',
                            'modifytime':'2018-09-09',
                        },
                        'rewardContent': '悬赏内容'
                    }
                }
            },{
                'time': '昨天',
                'data': {
                    'top': {
                        'title': '### 标题',
                        'type': '代购+陪玩',
                    },
                    'decription': '我要购买特斯拉,白宫劳斯莱斯加长我要购买特斯拉,白宫劳斯莱斯加长我要购买特斯拉,白宫劳斯莱斯加长',
                    'url': '',
                    'from': '北极',
                    'bottom':{
                        'modifyinfo':{
                            'url':'',
                            'username':'圈圈',
                            'modifytime':'2018-10-19',
                        },
                        'rewardContent': '悬赏内容'
                    }
                }
            }]
        }
    }

}

</script>
