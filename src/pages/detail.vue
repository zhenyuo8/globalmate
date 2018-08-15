<style scoped lang='less'>

.detail {
    box-sizing: border-box;
    font-size: 14px;
    color: #9B9B9B;
    padding: 20px .4rem;
    padding-bottom: 54px;
    position: relative;
}
.detail_message {
    position: fixed;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
    background: #fff;
    padding: .1rem;
    border-top: 1px solid #eee;
}
.detail_message > div {
    flex: 1;
    line-height: 36px;
}
.detail_message_leave{
    text-align: left;
}
.detail_message_chart{
    height: 36px;
}
.detail_message_chart span{
    padding: 0 .8rem;
    background: #F1F1F1;
    border-radius: 4px;
    background: #26a2ff;
    color: #fff;
    font-weight: bold;
}

    .detail_top{
        display: flex;
        position: relative;
        .image_user{
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid #eee;
            img{
                display: inline-block;
                width: 100%;
                height: 100%;
            }
        }
        .name_user{
            display: flex;
            flex: 2;
            flex-direction: column;
            text-align: left;
            margin-left: .24rem;
            span{
                flex:1;
                display: inline-block;
                line-height: 36px;
                &.name{
                    font-size: 16px;
                    color: #333;
                }
                &.type{
                    font-size: 14px;
                    color: #888;
                }
            }
        }
        .status_user{
            position: absolute;
            right: 0;
            bottom: 0;
            line-height: 35px;
            span{
                color: blue;
                font-size: 14px;
            }
        }
        .status_close{
            span{
                color: red!important;
            }
        }
    }
    .detail_middle{
        text-align: left;
        margin-top: 10px;
        p{
            padding: 10px 0;
            border-top: 1px solid #eee;
            color: #333;
            &:last-child{
                border-bottom:1px solid #eee;
            }
        }
    }
    .detail_image_new{
        display: flex;
        padding: 10px 0;
        .detail_content_img{
            width: 1.6rem;
            height: 1.6rem;
            margin-right: .2rem;
            img{
                width: 100%;
                height: 100%;
                display: inline-block;
            }

        }
    }

    .list_repeat_pushed::before{
       border-top: 1px solid #eee;
       content: '';
       clear: both;
       position: absolute;
       left: 0;
       right: 0;
   }
   .list_repeat_pushed{
       text-align: left;
       position: relative;
       p{
           padding: 10px 0;
       }
       .list_repeat_pushed_item{
           display: flex;

           div{
                margin-right: 10px;
               img{
                   width: 1.2rem;
                   height: 1.2rem;
                   border-radius: 50%;
                   display: block;
                   margin: auto;
               }
               span{
                   margin:6px  auto 10px;
                   width: 100%;
                   text-align: center;
               }
           }
       }
   }
</style>

<template>

<div class="detail">
    <div class="detail_content">
        <div class="detail_top">
            <div class="image_user">
                <img :src="othersImage" alt="">
            </div>
            <div class="name_user">
                <span class="name">{{listData.userName}}</span>
                <span class="type">{{listData.tag}}</span>
            </div>
            <div class="status_user" :class="">
                <span>{{listData.enable}}</span>
            </div>
        </div>
        <div class="detail_middle">
            <p>标题：{{listData.title}}</p>
            <p>地点：{{listData.country}}_{{listData.city}}</p>
            <p>时间：{{listData.startTime}} 至 {{listData.endTime}}</p>
            <p>详细内容：{{listData.description}}</p>
        </div>
        <div class="detail_image_new" v-if="true">
            <div class="detail_content_img" v-for="(items,indexs) in listData.pic">
                <img :src="items+'?x-oss-process=image/resize,m_fixed,h_65,w_65'" alt="" v-if="indexs<3">
            </div>
        </div>

        <div class="list_repeat_pushed" >
            <p>推送名单:</p>
            <div class="list_repeat_pushed_item">
                <div class="">
                    <img src="../assets/images/1.jpeg" alt="">
                    <span>SuperMan</span>
                </div>
                <div class="">
                    <img src="../assets/images/2.jpeg" alt="">
                    <span>泰迪</span>
                </div>
                <div class="">
                    <img src="../assets/images/3.jpg" alt="">
                    <span>毛毛虫</span>
                </div>
            </div>
        </div>
        <div class="list_repeat_pushed">
            <p>提供帮助方:</p>
            <div class="list_repeat_pushed_item">
                <div class="">
                    <img src="../assets/images/1.jpeg" alt="">
                    <span>辛巴</span>
                </div>

            </div>
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
    <div class="detail_message" v-show="userId!=otherUserId">
        <div class="detail_message_chart" >
            <span @click='goChart'>去帮助</span>
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
            show:false,
            country:'',
            detail:{
                'title':'',
                'description':'',
                'createTime':''
            },
            othersImage:'',
            token:'',
            currentUserId:'',
            otherUserId:'',
            listData:{}
        }
    },
    activated(){
        let url=window.location.href;
        this.listData={};
        this.detail={
            'title':'',
            'country':'',
            'description':'',
            'type':''
        };

        this.country='';
        this.show=false;
        this.id=this.$route.query.id;
        this.userId=this.$route.query.userId;
        if(url.indexOf('openId=')>-1){
            this.id=this.$utils.getQueryStringByName('id');
            this.userId=this.$utils.getQueryStringByName('userId');
            window.localStorage.setItem('USERID',this.userId);
        }
        this.otherUserId=this.$route.query.otherUserId;
        this.apiHost=CONFIG[__ENV__].apiHost;
        let _this=this;
        this.getToken(function (token) {
            if(!token){
                token=_this.$route.query.token;
            }
            _this.axios.get(_this.apiHost+'/globalmate/rest/user/getUserByToken'+'?token='+token,{

            }).then((res)=>{
                if(res.data.success){
                    let data=res.data.data;
                    if(!_this.userId){
                        _this.userId=data.id;
                    }
                    _this.country=data.country;
                    _this.loadData(token);

                }

            }).catch((e)=>{
                console.log(e);
            })
        });
    },
    methods:{
        getToken(callback){
            this.apiHost=CONFIG[__ENV__].apiHost;
            let userId=window.localStorage.getItem('USERID');
            let openid=window.localStorage.getItem('OPENID');

            if(userId){
                this.axios.get(this.apiHost+'/globalmate/rest/user/getToken?userId='+userId,{}).then((res)=>{
                    if(res.data.success){
                        this.token=res.data.data;
                        window.localStorage.setItem('TOKEN',res.data.data);
                        callback&&callback(res.data.data)
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            }else if(openid){
                this.axios.get(this.apiHost+'/globalmate/rest/user/getToken?openid='+openid,{}).then((res)=>{
                    if(res.data.success){
                        this.token=res.data.data;
                        window.localStorage.setItem('TOKEN',res.data.data);
                        callback&&callback(res.data.data);
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            }else {
                callback&&callback()
            }
        },
        loadData(token){
            let  list={},_this=this;
            this.apiHost=CONFIG[__ENV__].apiHost;

            this.axios.get(this.apiHost+'/globalmate/rest/need/list/'+this.id+'?token='+token+'&onlyCurrentUser=true',{
                onlyCurrentUser:true
            }).then((res)=>{
                if(res.data.success){
                     let data=res.data.data;
                     this.getOthersInfo(data.need.userId);
                     this.detail=data;
                     this.otherUserId=data.need.userId;
                     setTimeout(()=>{
                         this.show=true;
                     },500)
                     for(var key in data.conceretNeed){
                         if(key=='tag'||key=='city'||key=='country'||key=='startTime'||key=='endTime'||key=='title'||key=='description'||key=='pic'){
                             if(key=='startTime'||key=='endTime'){
                                 list[key]=this.moment(data.conceretNeed[key]).format('YYYY-MM-DD');
                             }else{
                                 if(key=='pic'){
                                     if(data.conceretNeed[key]){
                                         list[key]=data.conceretNeed[key].split(';')
                                     }else{
                                          list[key]=[]
                                     }
                                 }else{
                                     list[key]=data.conceretNeed[key]
                                 }
                             }
                         }
                     }
                     for(var key in data.need){
                         if(key=='enable'||key=='userName'||key=='enable'||key=='id'){
                             if(key=='enable'){
                                 var status=data.need[key]+'';
                                 switch (status) {
                                     case '1':
                                         list[key]='开放中';
                                         break;
                                     case '2':
                                         list[key]='帮助中';
                                         break;
                                     case '0':
                                         list[key]='关闭';
                                         break;
                                     case '3':
                                         list[key]='编辑中';
                                         break;
                                     case '4':
                                         list[key]='洽谈中';
                                         break;
                                     case '5':
                                         list[key]='执行中';
                                         break;
                                     case '6':
                                         list[key]='已完成';
                                         break;
                                     default:
                                 }
                             }else{
                                list[key]=data.need[key];
                             }

                         }
                     }
                     this.getPushItem(list,function (result) {
                         _this.listData=result;
                     })
                }else{

                }
            }).catch((e)=>{
                console.log(e);
            })
        },
         getPushItem(data,callback){
             this.apiHost=CONFIG[__ENV__].apiHost;
             this.axios.get(this.apiHost+'/globalmate/rest/match/'+data.id+'?token='+this.$route.query.token,{

             }).then((res)=>{
                 if(res.data.success){
                     data.pushList=res.data.data;
                     callback&&callback(data)
                 }else{
                     callback&&callback(data)
                 }
             }).catch(()=>{

             })
         },
        goChart(){
            this.$router.push({
                path: 'im',
                query: {
                    'token': this.$route.query.token,
                    'title': this.othersInfo.nikename,
                    'id': this.$route.query.id,
                    'toChartUser':this.othersInfo.nikename,
                    'toChartId':this.othersInfo.id,
                }
            });
        },
        getOthersInfo(userId){
            this.axios.get(this.apiHost+'/globalmate/rest/user/list/'+userId+'?token='+this.$route.query.token,{

            }).then((res)=>{
                this.othersImage=res.data.data.pic||'../assets/images/icon.png';
                this.detail.country=res.data.data.country;
                this.othersInfo=res.data.data
            }).catch((e)=>{
                console.log(e);
            })
        },
    },
    created(){
        if(window.localStorage.getItem('CURRENTUSER')){
            this.currentUserId=JSON.parse(window.localStorage.getItem('CURRENTUSER')).id;
        }else{
            this.currentUserId=this.$route.query.userId;
        }
    }
}

</script>
