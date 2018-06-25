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
.home_image {
    height: 186px;
    width: 100%;
    /*margin-top: 33px;*/
}

.home_image img {
    width: 100%;
    height: 100%;
    display: inline-block;
}

.nav,
.nav_sec {
    position: relative;
    display: flex;
    font-size: 14px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #F1F1F1;
    color: #4A4A4A;
}

.nav > div,
.nav_sec > div {
    flex: 1;
    border-left: 1px solid #f1f1f1;
}

.nav_item:first-child {
    border: none;
}

</style>

<template>

<div class="home" id='home'>
    <!-- <div class="header">
        <Header :hearderParas='hearderParas'></Header>
    </div> -->
    <div class="home_image">
        <img src="../assets/images/home.jpg" alt="">
    </div>
    <div class="nav">
        <div class="nav_item" v-for="item in navData" @click='navRoute(item)'>
            {{item.text}}
        </div>
    </div>
    <div class="nav_sec">
        <div class="nav_item" v-for="item in navSecData" @click='navRoute(item)'>
            {{item.text}}
        </div>
    </div>
</div>

</template>

<script>

import Header from '../components/header.vue'
export default {
    data() {
            return {
                hearderParas: {
                    title: 'GM公众号',
                    right: {
                        text: '',
                        icon: '../assets/logo.png'
                    }
                },
                navData: [{
                    'text': '帮代',
                    'type': 'assist'
                }, {
                    'text': '陪伴',
                    'type': 'accompany'
                }, {
                    'text': '其他',
                    'type': 'other'
                }],
                navSecData: [{
                    'text': '个人中心',
                    'type': 'mine'
                }, {
                    'text': '我的求助',
                    'type': 'myAssist'
                }, {
                    'text': '平台反馈',
                    'type': 'other'
                }],
            }
        },
        components: {
            Header,
        },
        methods: {
            navRoute(item) {
                this.$router.push({
                    path: item.type,
                    query: {
                        'token': '22223',
                        'title': '哈哈',
                        'id': 'fffff',
                    }
                });
            }
        }
}

</script>
