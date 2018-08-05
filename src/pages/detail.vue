<style scoped>

.detail {
    margin-top: 10px;
    border-top: 1px solid rgba(241, 241, 241, 1);
    box-sizing: border-box;
    font-size: 14px;
    color: #9B9B9B;
    padding-bottom: 54px;
}

.detail_first {
    line-height: 44px;
    display: flex;
    height: 44px;
    overflow: hidden;
    padding: 0 0.36rem;
    border-bottom: 1px solid rgba(241, 241, 241, 1);
}

.detail_first > div {
    flex: 1
}

.detail_first .detail_first_left {
    text-align: left;
    flex: 2
}

.detail_first_left img {
    width: 32px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
}

.detail_first_left span {
    display: inline-block;
}

.detail_first .detail_first_right {
    text-align: right;
}


.detail_second {
    height: 45px;
    line-height: 45px;
    padding: 0 0.36rem;
    border-bottom: 1px solid rgba(241, 241, 241, 1);
}
.detail_second .detail_second_left{
    float: left;
}
.detail_second .detail_second_right{
    float: right;
}


.detail_content{
    min-height: 80px;
    /*height: 250px;*/
    padding: 0 0.36rem;
}
.detail_content_title{
    height: 42px;
    font-size: 16px;
    font-weight: 500;
    line-height: 42px;
    text-align: left;
}
.detail_content_text{
    overflow: hidden;
    height: 83%
}
.detail_content_text p{
    line-height: 20px;
    overflow-y: scroll;
    height: 100%
}
.detail_image, .detail_list, .detail_message{
    padding: 0 0.36rem;
}
.detail_image > div{
    margin-top: 9px;
}
.detail_message{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
}
.detail_image > div > img{
    width: 100%;
    height: 100%;
}

.detail_list{
    margin-top: 14px;
}
.detail_list_repeat{
    height: 72px;
    padding: 12px .32rem;
    border-radius: 14px;
    background: #F1F1F1;
    margin-bottom: 9px;
    display: flex;
}
.detail_list_repeat > div{
    flex: 1
}
.detail_list_image > div{
    width: 1.44rem;
    height: 1.44rem;
}
.detail_list_image > div > img{
    width: 100%;
    height: 100%;
}
.detail_list_decription{
    padding: 15px 0;
}
.detail_list_decription span{
    line-height: 20px;
    float: left;
    margin-right: .2rem;
}
.detail_list_price{
    text-align: right;
    font-size: 18px;
    line-height: 72px;
}

.detail_message {
    display: flex;
    flex-direction: row;
    padding: .2rem;
    /*height: 66px;
    line-height: 66px;*/
    border-top: 1px solid rgba(151, 151, 151, 0.5);
}
.detail_message > div {
    flex: 1;
    line-height: 36px;
}
.detail_message_leave{
    text-align: left;
}
.detail_message_chart{
    text-align: right;
    height: 36px;
}
.detail_message_chart span{
    padding: 0 .4rem;
    background: #F1F1F1;
    border-radius: 4px;
    background: #26a2ff;
    color: #fff;
    font-weight: bold;
}
</style>

<template>

<div class="detail">
    <div class="detail_first">
        <div class="detail_first_left" @click='goPersonalFile'>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529843567270&di=7d4461aad4d2e95deacf7b85c6669387&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F86%2F88%2F55a09df24b97e_1024.jpg" alt="" class="bottom_left_userimage">
            <span class="bottom_left_username">{{detail.userName}}</span>
            <span class="bottom_left_time">{{detail.createTime}}</span>
        </div>
        <div class="detail_first_right">
            来自 {{country}}
        </div>
    </div>
    <div class="detail_second">
        <span class="detail_second_left">
            {{detail.title}}
        </span>
        <span class="detail_second_right">
            帮代 icon
        </span>
    </div>
    <div class="detail_content">
        <div class="detail_content_title">
            悬赏内容
        </div>
        <div class="detail_content_text">
            <p>
                {{detail.description}}
            </p>
        </div>
    </div>
    <div class="detail_image">
        <div class="" v-for='item in imageArr'>
            <img :src="item" alt="">
        </div>

    </div>
    <!-- <div class="detail_list">
        <div class="detail_list_repeat">
            <div class="detail_list_image">
                <div class="">
                    <img src="../assets/images/1.jpeg" alt="">
                </div>
            </div>
            <div class="detail_list_decription">
                <span class="detail_name">火影忍者佐助</span>
                <span class="detail_type">cool</span>
                <span class="detail_brand">japan</span>
            </div>
            <div class="detail_list_price">
                ¥ 123
            </div>
        </div>
        <div class="detail_list_repeat">
            <div class="detail_list_image">
                <div class="">
                    <img src="../assets/images/2.jpeg" alt="">
                </div>
            </div>
            <div class="detail_list_decription">
                <span class="detail_name">秦时明月</span>
                <span class="detail_type">history</span>
                <span class="detail_brand">台湾</span>
            </div>
            <div class="detail_list_price">
                $ 7890
            </div>
        </div>
        <div class="detail_list_repeat">
            <div class="detail_list_image">
                <div class="">
                    <img src="../assets/images/3.jpg" alt="">
                </div>
            </div>
            <div class="detail_list_decription">
                <span class="detail_name">火影忍者</span>
                <span class="detail_type">v89</span>
                <span class="detail_brand">japan</span>
            </div>
            <div class="detail_list_price">
                ¥ 777
            </div>
        </div>
    </div> -->
    <div class="detail_message" v-if="id===userId">
    <!-- <div class="detail_message"> -->
        <div class="detail_message_leave">
            留言
        </div>
        <div class="detail_message_chart">
            <span @click='goChart'>聊一下</span>
        </div>
    </div>
</div>

</template>

<script>
import CONFIG from '../config/config.js'
export default {
    'name': 'detail',
    components: {

    },
    data() {
        return {
            id:'',
            userId:'',
            detailId:'',
            show:false,
            country:'',
            detail:{
                'title':'',
                'description':'',
                'createTime':''
            },
            imageArr:[]
        }
    },
    activated(){
        this.imageArr=[];
        this.detail={
        'title':'',
          'description':''
        };
        this.country='';
        this.show=false;
        this.id=this.$route.query.id;
        this.apiHost=CONFIG[__ENV__].apiHost;
        this.axios.get(this.apiHost+'/globalmate/rest/user/getUserByToken'+'?token='+this.$route.query.token,{

        }).then((res)=>{
            if(res.data.success){
                let data=res.data.data;
                this.userId=data.id;
                this.country=data.country;
                this.loadData();
            }

        }).catch((e)=>{
            console.log(e);
        })

    },
    methods:{
        loadData(){
            this.apiHost=CONFIG[__ENV__].apiHost;
            this.axios.get(this.apiHost+'/globalmate/rest/need/list/'+this.id+'?token='+this.$route.query.token+'&onlyCurrentUser=true',{
                onlyCurrentUser:true
            }).then((res)=>{
                if(res.data.success){
                     let data=res.data.data;
                     this.detail=data;
                     setTimeout(()=>{
                         this.show=true;
                     },500)
                     for(var key in data.conceretNeed){
                         this.detail[key]=data.conceretNeed[key];
                         if(key==='pic'){
                             if(data.conceretNeed[key]){
                                 this.imageArr=data.conceretNeed[key].split(';')
                             }
                         }

                     }
                     for(var key in data.need){
                         this.detail[key]=data.need[key];
                         if(key==='createTime'){
                             this.detail[key]=this.timestampToTime(data.need[key])
                         }
                     }
                     this.detailId=data.need.id;

                }else{

                }
            }).catch((e)=>{
                console.log(e);
            })
        },
        goChart(){
            this.$router.push({
                path: 'im',
                query: {
                    'token': this.token,
                    'title': 'im',               }
            });
        },
        timestampToTime(time){
            let date = new Date(time);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + '';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y+M+D;
        },
        goPersonalFile(){
            console.log(this.userId);
        }
    },


}

</script>
