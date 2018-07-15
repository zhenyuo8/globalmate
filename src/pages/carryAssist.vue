<style scoped>

@import '../assets/css/common.css';

</style>

<template>

<div class="assist">
    <div class="body">
        <div class="main_view">
            <div class="" v-for="item in listRepeat" :getConfig='getConfig'>
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
    <div class="assist_bottom" @click='publish'>
        发布
    </div>
</div>

</template>

<script>

import List from '../components/list.vue'
export default {
    'name': 'assist',
    data() {
        return {
            listRepeat: [{
                title: '方式',
                text: 'carry',
                arrow: true
            }, {
                title: '从哪里',
                text: '美国',
                arrow: true
            }, {
                title: '到哪里',
                text: '中国香港',
                arrow: true
            }, {
                title: '到达时间',
                text: '2018-09-01',
                arrow: true
            }, {
                title: '物品类型',
                text: '电子产品',
                arrow: true
            } , {
                title: '品牌',
                text: 'nike',
                arrow: true
            }, {
                title: '商品名称',
                text: 'nike',
                arrow: false,
                type: 'input',
            },{
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
            },
            publishData:[]
        }

    },
    components: {
        List
    },
    methods:{
        publish(){
           this.axios.post('http://10.4.111.31:9090/globalmate/rest/need/carry/add'+'?token='+this.$route.query.token,{
               'to':'美国',
               'from':'中国香港',
               'arrive':'2018-09-01',
               'brand':'美素佳儿',
               'goodsName':'美素佳儿1段',
               'deliveryWay':'快递',
               'payway':'',
               'description':'',
               'pic':'',
               'rewardAmount':'',
               'weight':'',
               'volume':'',
           }).then((res)=>{
               console.log(res);
           }).catch((e)=>{
               console.log(e);
           });
        },
        getConfig(item){

        }
    },
    created(){

    }
}

</script>
