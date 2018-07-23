<style scoped>

@import '../assets/css/common.css';

</style>

<style media="screen">
    .list_show{
        position: fixed;
        right:0;
        top:0;
        bottom:0;
        width:7.5rem;
        background:#f5f5f5;
       -webkit-transition: all .2s ease-in;
       -moz-transition: all .2s ease-in;
       transition: all .2s ease-in;
    }
    .list_hide{
        position: fixed;
        right: -7.5rem;
        top:0;
        bottom:0;
        width:7.1rem;
        background:#fff;
        -webkit-transition: all .2s ease-out;
        -moz-transition: all .2s ease-out;
        transition: all .2s ease-out;
    }
    .main_view_repeat:last-child{
        border-bottom: 1px solid #f1f1f1;
    }
    .main_decription_uploader_container_img{
        width:1.4rem;height:1.4rem;margin-right:0.1rem;border: 1px solid #F2F2F2;
    }
    .hide_space{
        display: flex;
    }
    .prev_imgae{
        width: 100%;
        height: 100%;
        display: inline-block;
    }
</style>

<template>

<div class="assist">
    <div class="body">
        <div class="main_view">
            <div class="main_view_repeat" v-for="item in listRepeat">
                <List :itemRepeat='item' :clickCallBack='clickCallBack'></List>
            </div>
        </div>
        <div class="main_decription">
            <div class="main_decription_title">
                <List :itemRepeat='title' :clickCallBack='clickCallBack'></List>
            </div>
            <div class="main_decription_area">
                <textarea name="name" placeholder='描述一下求助细节 时间 航班 人数 地点 偏好的景点等等' style='width:100%'></textarea>
            </div>
            <div class="main_decription_uploader">
                <div class="hide_space">

                </div>
                <div class="main_decription_uploader_container">
                    <span class="icon-add"></span>
                    <input type="file" name="" value="+" @change="uploadImg($event)">
                </div>
            </div>
        </div>

        <div class="main_style">
            <List :itemRepeat='payStyle' :clickCallBack='clickCallBack' v-if="payStyle"></List>
            <List :itemRepeat='myReward' :clickCallBack='clickCallBack'></List>
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
     <selectList :class="show?'list_show':'list_hide'" :selectCallBack='selectCallBack' :selectItem='selectItem'></selectList>
</div>

</template>

<script>

import List from '../components/list.vue'
import selectList from '../components/selectList.vue'

import { Toast } from 'mint-ui';
export default {
    'name': 'assist',
    data() {
        return {
            listRepeat: [],
            payStyle: {
                title: '交收方式',
                text: '请选择',
                arrow: true,
                key:'delivery',
                isRequire:true,
                isPlacehold:true,
                componentKey:'deliveryWay'

            },
            myReward: {
                title: '我的悬赏',
                text: '请输入',
                type: 'input',
                arrow: false,
                key:'reward',
                isRequire:false,
                isPlacehold:true,
                componentKey:'rewardAmount'
            },
            title: {
                title: '标题',
                text: '简单说下求助内容',
                type: 'input',
                arrow: false,
                key:'title',
                isRequire:false,
                isPlacehold:true,
                componentKey:'title'
            },
            publishData:[],
            show:false,
            selectItem:{},
        }

    },
    components: {
        List,selectList,Toast
    },
    methods:{
        // 点击发布按钮逻辑
        publish(){
           let postData=this.getListData();
           this.axios.post('http://10.4.111.31:9090/globalmate/rest/need/buy/add'+'?token='+this.$route.query.token,postData).then((res)=>{
               if(data.data.success){
                   window.history.go(-1);
               }else{
                   alert('请确认后再提交')
               }

           }).catch((e)=>{
               console.log(e);
           });
        },
        clickCallBack(item,e) {
            if(!item.type){
                this.show=true;
                this.selectItem=item;
            }else{
                if(e){
                    this.selectCallBack(e.target.value,item);
                }
            }
        },
        selectCallBack(value,selectItem){
            this.show=false;
            let key=selectItem.key;
            switch (key) {
                case 'delivery':
                    this.payStyle.text=value;
                    this.payStyle.isPlacehold=false;
                    break;
                case 'reward':
                    this.myReward.text=value;
                    this.myReward.isPlacehold=false;
                    break;
                case 'title':
                    this.title.text=value;
                    this.title.isPlacehold=false;
                    break;
                default:
                    this.listRepeat.forEach(function (item,index) {
                        if(item.key===selectItem.key){
                            item.text=value;
                            item.isPlacehold=false;
                        }
                    });
                    break;

            }

        },
        // 获取发布所需要的数据
        getListData(){
            let listRepeat=this.listRepeat;
            let postData={};
            listRepeat.forEach(function (item,index) {
                if(item.isPlacehold&&!item.isRequire){
                    postData[item.componentKey]='';
                }else if(!item.isPlacehold){
                    postData[item.componentKey]=item.text;
                }else {
                    alert(item.title+'为必填项')
                    return;
                }
            })
            if(!this.payStyle.isPlacehold){
                 postData[this.payStyle.componentKey]=this.payStyle.text;
            }
            if(!this.myReward.isPlacehold){
                 postData[this.myReward.componentKey]=this.myReward.text;
            }
            if(!this.title.isPlacehold){
                 postData[this.title.componentKey]=this.title.text;
            }
            if(this.$el.querySelector('.main_decription_area textarea')){
                postData['description']=this.$el.querySelector('.main_decription_area textarea').value;
            }
            return postData;
        },
        uploadImg(e){
            let _this=this;
            var file = e.target.files[0];
            // 确认选择的文件是图片
            if(file.type.indexOf("image") == 0) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    // 图片base64化
                    let newUrl = this.result;
                    let con=$('<div class="main_decription_uploader_container_img" ><img class="prev_imgae" src="'+newUrl+'"/></div>');
                    $('.hide_space').append(con);
                };
            }
        },
        dataURItoBlob(base64Data){
            let byteString;
            if(base64Data.split(',')[0].indexOf('base64')>=0){
                byteString=atob(base64Data.split(',')[1]);
            }else{
                byteString=unescape(base64Data.split(',')[1]);
            }
            let mimeString=base64Data.split(',')[0].split(':')[1].split(';')[0];
            let ia=new Uint8Array(byteString.length);
            for(var i=0;i<byteString.length;i++){
                ia[i]=byteString.charCodeAt(i);
            }
            return new Blob([ia],{type:mimeString})
        },
        uploadImgToServer(){
            this.axios.get('http://10.4.111.31:9090/globalmate/rest/file/ossPolicy','').then(res=>{
                console.log(res);
            }).catch(e=>{

            })
        },
        // 发布页面显示字段根据form显示不同字段
        listRepeatProcess(){
            let form=this.$route.query.form;
            console.log(form);
            switch (form) {
                case 'assist':
                    this.listRepeat=[{
                        title: '方式',
                        text: '请选择',
                        arrow: true,
                        key:'style',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'businessType'
                    }, {
                        title: '国家',
                        text: '请输入',
                        arrow: false,
                        type: 'input',
                        key:'country',
                        isRequire:true,
                        isPlacehold:true,
                        componentKey:'country'
                    }, {
                        title: '物品类型',
                        text: '请选择',
                        arrow: true,
                        key:'type',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'type'
                    } , {
                        title: '品牌',
                        text: '请选择',
                        arrow: true,
                        key:'brand',
                        isRequire:true,
                        isPlacehold:true,
                        componentKey:'brand'
                    }, {
                        title: '商品名称',
                        text: '请输入',
                        arrow: false,
                        type: 'input',
                        key:'goodsName',
                        isRequire:true,
                        isPlacehold:true,
                        componentKey:'goodsName'
                    },{
                        title: '紧急程度',
                        text: '请选择',
                        arrow: true,
                        key:'emergency',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'emergency'
                    }];
                    this.payStyle={
                        title: '交收方式',
                        text: '请选择',
                        arrow: true,
                        key:'delivery',
                        isRequire:true,
                        isPlacehold:true,
                        componentKey:'deliveryWay'
                    };
                    break;
                case 'accompany':
                    this.listRepeat=[{
                        title: '方式',
                        text: '请选择',
                        arrow: true,
                        key:'style',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'businessType'
                    }, {
                        title: '目的地',
                        text: '请输入',
                        arrow: false,
                        type: 'input',
                        key:'country',
                        isRequire:true,
                        isPlacehold:true,
                        componentKey:'country'
                    }, {
                        title: '紧急程度',
                        text: '请选择',
                        arrow: true,
                        key:'emergency',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'emergency'
                    }];
                    this.payStyle=false;
                    break;
                case 'carryAssist':
                    this.listRepeat=[{
                        title: '方式',
                        text: '请选择',
                        arrow: true,
                        key:'style',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'businessType'
                    }, {
                        title: '从哪里',
                        text: '请输入',
                        arrow: false,
                        type: 'input',
                        key:'country',
                        isRequire:true,
                        isPlacehold:true,
                        componentKey:'country'
                    }, {
                        title: '到哪里',
                        text: '请输入',
                        arrow: false,
                        type: 'input',
                        key:'country',
                        isRequire:true,
                        isPlacehold:true,
                        componentKey:'country'
                    },{
                        title: '物品类型',
                        text: '请选择',
                        arrow: true,
                        key:'type',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'type'
                    } , {
                        title: '品牌',
                        text: '请选择',
                        arrow: true,
                        key:'brand',
                        isRequire:true,
                        isPlacehold:true,
                        componentKey:'brand'
                    }, {
                        title: '商品名称',
                        text: '请输入',
                        arrow: false,
                        type: 'input',
                        key:'goodsName',
                        isRequire:true,
                        isPlacehold:true,
                        componentKey:'goodsName'
                    },{
                        title: '紧急程度',
                        text: '请选择',
                        arrow: true,
                        key:'emergency',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'emergency'
                    }];
                    this.payStyle={
                        title: '交收方式',
                        text: '请选择',
                        arrow: true,
                        key:'delivery',
                        isRequire:true,
                        isPlacehold:true,
                        componentKey:'deliveryWay'

                    };
                    break;
                default:
                    this.listRepeat=[{
                        title: '紧急程度',
                        text: '请选择',
                        arrow: true,
                        key:'emergency',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'emergency'
                    }];
                    this.payStyle=false;
                    break;
            }
        }
    },
    activated(){
        this.listRepeatProcess();
    },
    computed:{
        form: function() {
            return this.$route.query.form || "";
        },
    },
    watch:{
        'form':function (newvalue,old) {
            if(newvalue&&old){
                this.listRepeatProcess();
            }
        }
    },
    created(){

    }
}

</script>
