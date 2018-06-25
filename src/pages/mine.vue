<style scoped>

.mine {
    overflow: hidden;
}

.header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background: #fff;
    z-index: 11;
    height: 33px;
}

.mine_body {
    margin-top: 33px;
    padding: 21px 0.4rem;
    overflow: hidden;
}

.mine_detail {
    overflow: hidden;
    position: relative;
}

.mine_image {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    float: left;
    border: 1px solid rgba(151, 151, 151, 1);
}

.mine_image img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: inline-block;
}

.mine_information {
    float: left;
    width: 76%;
    height: 60px;
    /*background: red;*/
    margin-left: 0.4rem;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #9B9B9B;
    text-align: left;
}

.mine_information > div {
    flex: 1
}

.mine_username {
    font-size: 20px;
    color: #333;
}

.mine_location {
    margin-top: 18px;
}

.mine_top {
    margin-top: 6px;
}

.mine_call {
    margin-left: .14rem;
}

.mine_settings {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    color: #4A4A4A;
}

.mine_business {
    border-bottom: 1px solid rgba(241, 241, 241, 1)
}

</style>

<template>

<div class="mine">
    <div class="header">
        <Header :hearderParas='hearderParas'></Header>
    </div>
    <div class="mine_body">
        <div class="mine_detail">
            <div class="mine_image" @click='toMineInformation'>
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529843567270&di=7d4461aad4d2e95deacf7b85c6669387&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F86%2F88%2F55a09df24b97e_1024.jpg" alt="">
            </div>
            <div class="mine_information" @click='toMineInformation'>
                <div class="mine_top">
                    <span class="mine_username">圈圈</span>
                    <span class="mine_call">好人值 101</span>
                </div>
                <div class="mine_location">
                    <span class="">北京</span>
                </div>
            </div>
            <div class="mine_settings">
                设置
            </div>
        </div>
    </div>
    <div class="mine_business">
        <div class="" v-for="item in listRepeat">
            <List :itemRepeat='item' :clickCallBack='clickCallBack'></List>
        </div>
    </div>
</div>

</template>

<script>

import Header from '../components/header.vue'
import List from '../components/list.vue'
export default {
    'name': 'mine',
    data() {
        return {
            hearderParas: {
                title: '我的',
                right: {
                    text: '',
                    icon: '../assets/logo.png'
                }
            },
            listRepeat: [{
                title: '我发布的',
                text: 2,
                arrow: true,
                mineType: 'publish'
            }, {
                title: '我解决的',
                text: 223,
                arrow: true,
                mineType: 'solove'
            }],
            mineInformation: {
                title: '我的',
                right: {
                    text: '',
                    icon: '../assets/logo.png'
                }
            },
        }
    },
    components: {
        Header,
        List
    },
    methods: {
        toMineInformation() {
                this.$router.push({
                    path: 'mineInformation',
                    query: {
                        'token': '22223',
                        'title': '哈哈',
                        'id': 'fffff',
                    }
                });
            },
            clickCallBack(item) {
                if (item.mineType === 'publish') {
                    this.$router.push({
                        path: 'myAssist',
                        query: {
                            'token': '22223',
                            'title': '哈哈',
                            'id': 'fffff',
                        }
                    });
                }
            }
    }
}

</script>
