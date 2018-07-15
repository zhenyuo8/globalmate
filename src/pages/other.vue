<style scoped>
@import '../assets/css/common.css';
</style>

<template>

<div class="assist">
    <!-- <div class="header">
        <Header :hearderParas='hearderParas'></Header>
    </div> -->
    <div class="body" >
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
                <List :itemRepeat='myReward'></List>
                <div class="add_label_container" @click='addLabel'>
                    <span >添加标签</span>
                </div>
            </div>
    </div>
    <div class="assist_bottom" @click='publish'>
        发布
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
                title: '其他',
                right: {
                    text: '发布',
                    icon: '../assets/logo.png'
                }
            },
            listRepeat: [{
                title: '紧急程度',
                text: '紧急',
                arrow: true
            }],
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
    methods:{
        publish(){
           this.axios.post('http://10.4.111.31:9090/globalmate/rest/need/other/add'+'?token='+this.$route.query.token,{
               'description':'帮忙翻译韩语文章，立刻马上',
               'rewardAmount':'',
               'payway':'',

           }).then((res)=>{
               console.log(res);
           }).catch((e)=>{
               console.log(e);
           });
        },
        addLabel(){
            alert('添加标签~~')
        }
    }
}

</script>
