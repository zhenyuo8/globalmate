<style scoped>

@import '../assets/css/common.css';

</style>

<template>

<div class="assist">
    <div class="header">
        <Header :hearderParas='hearderParas'></Header>
    </div>
    <div class="body">
        <div class="main_view">
            <div class="" v-for="item in listRepeat">
                <List :itemRepeat='item'></List>
            </div>
        </div>
        <div class="main_decription">
            <div class="main_decription_title">
                标题 简单说下求助内容
            </div>
            <div class="main_decription_area">
                <textarea name="name" placeholder='描述一下求助细节 时间 航班 人数 地点 偏好的景点等等' style='width:100%'></textarea>
            </div>
            <div class="main_decription_uploader">
                <div class="main_decription_uploader_container">
                    <span class="icon-add"></span>
                    <input type="file" name="" value="+">
                </div>
            </div>
        </div>

        <div class="main_style">
            <List :itemRepeat='payStyle'></List>
            <List :itemRepeat='myReward'></List>
            <div class="add_label_container" @click=''>
                <span>添加标签</span>
            </div>
            <div class="add_content_container">
                <span class="add_content_title">添加内容</span>
                <span class="add_cotent_icon">+</span>
            </div>
        </div>
    </div>

</div>

</template>

<script>

import Header from '../components/header.vue'
import List from '../components/list.vue'
export default {
    'name': 'assist',
    data() {
        return {
            hearderParas: {
                title: '帮代',
                right: {
                    text: '发布',
                    icon: '../assets/logo.png'
                }
            },
            listRepeat: [{
                title: '方式',
                text: '带并转交／代购',
                arrow: true
            }, {
                title: '物品类型',
                text: '电子产品',
                arrow: true
            }, {
                title: '紧急程度',
                text: '紧急',
                arrow: true
            }],
            payStyle: {
                title: '交收方式',
                text: '',
                arrow: true
            },
            myReward: {
                title: '我的悬赏',
                text: '',
                type: 'input',
                arrow: false
            }
        }
    },
    components: {
        Header,
        List
    },
}

</script>
