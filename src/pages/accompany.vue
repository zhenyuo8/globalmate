<style scoped>
@import '../assets/css/common.css';
</style>

<template>

<div class="assist">
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
                <List :itemRepeat='payStyle'></List>
                <List :itemRepeat='myReward'></List>
                <div class="add_label_container" @click='addLabel'>
                    <span >添加标签</span>
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
                text: '陪玩／通宵达旦',
                arrow: true
            }, {
                title: '目的地',
                text: '香港',
                arrow: true
            }, {
                title: '紧急程度',
                text: '紧急',
                arrow: true
            }, {
                title: '开始时间',
                text: '请选择',
                arrow: true,
                key:'start',
            }, {
                title: '结束时间',
                text: '请选择',
                arrow: true,
                key:'end',
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
        List
    },
    methods:{
        publish(){
           this.axios.post('http://10.4.111.31:9090/globalmate/rest/need/accompany/add'+'?token='+this.$route.query.token,{
               'where':'香港',
               'startTime':new Date().getTime(),
               'endTime':new Date().getTime()+636071106,
               'doctor':'',
               'payway':'',
               'description':'',
               'type':'',
               'rewardAmount':'',
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
