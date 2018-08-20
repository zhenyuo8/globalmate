<style scoped lang='less'>
    .gl_list{
        font-size: 14px;
        margin: 0;
        padding: 0;
        position: absolute;
        overflow: hidden;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: #eee;
        overflow-y: auto;
        .list_warp{
            background: #f7f5f3;
            .list_repeat{
                background: #fff;
                margin-bottom: 10px;
                padding: 10px .4rem;
                position: relative;
                .list_repeat_content{
                    text-align: left;
                    position: relative;
                    p{
                        padding: 10px 0;
                        &.gl_status{
                            position: absolute;
                            right: 0;
                            top: 0;
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
                        overflow: hidden;
                        div{
                            float: left;
                            width: 20%;
                            img{
                                width: 1rem;
                                height: 1rem;
                                border-radius: 50%;
                                display: block;
                                margin: auto;
                            }
                            span{
                                margin:6px  auto 10px;
                                width: 100%;
                                text-align: center;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                font-size: 12px;
                            }
                        }
                    }

                }
                .action_list{
                    display: flex;
                    margin-top: 10px;
                    span{
                        padding: 8px .18rem;
                        flex: 1;
                        background: #eee;
                        margin-right: .2rem;
                        border-radius: 4px;
                        white-space: nowrap;
                        /*background: #bbb;*/
                        opacity: 0.6;
                        text-overflow: ellipsis;
                        &:last-child{
                             margin-right: 0;
                        }
                        &.share{
                            opacity: 1;
                        }
                        &.can_be_edit{
                           opacity: 1;
                        }
                        &.can_be_done{
                            opacity: 1;
                        }
                        &.can_be_evalute{
                            opacity: 1;
                        }
                    }
                }
                .action_list_done{
                    position: absolute;
                    right: 0.4rem;
                    bottom: 10px;
                }
            }
        }


    }
</style>
<style media="screen" lang="less">
    .yy_nodata_class{
        text-align: center;
        color: #999;
        font-size: 13px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        .yy_icon_img{
            position: absolute;
            width: 80px;height: 80px;margin:auto;
            top: 35%;
            left: 0;
            right: 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .yy_nodata_text{
            width: 80px;
            margin-top: 10px;
            display: inline-block;
            max-height: 200px;
            overflow: hidden;
            overflow-y: auto;
        }
    }
    .defindloadig{
       position: fixed;
       z-index: 11;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }

</style>

<template>

<div class="gl_list">
    <div class="list_warp">
        <div class="list_repeat" v-for="(item,index) in myAssistList">
            <div class="list_repeat_content" @click='showDetail(item)'>
                <p>{{$t('formTitle.type')}}: {{item.conceretNeed.tag}}</p>
                <p v-if="item.conceretNeed.country||item.conceretNeed.city">事物地点: {{item.conceretNeed.country}}_{{item.conceretNeed.city}}</p>
                <p>{{$t('formTitle.head')}}: {{item.conceretNeed.title}}</p>
                <p class="gl_status">{{item.need.status}}</p>
            </div>
            <div class="list_repeat_pushed" v-if="item.need.status!='关闭'">
                <p>{{$t('formTitle.pushTitle')}}:</p>
                <div class="list_repeat_pushed_item" v-show="item.pushList&&item.pushList.length!=0">
                    <div class="" v-for="items in item.pushList" @click='goChat(item,items)'>
                        <img :src="items.userInfo.pic" alt="">
                        <span>{{items.userInfo.nikename}}</span>
                    </div>
                </div>
            </div>
            <div class="list_repeat_pushed" v-if="item.need.status!='关闭'">
                <p>{{$t('formTitle.helpMan')}}:</p>
                <div class="list_repeat_pushed_item" v-show="item.need.enable=='0'">
                    <div class="">
                        <img src="../assets/images/1.jpeg" alt="">
                        <span>辛巴</span>
                    </div>

                </div>
            </div>
            <div class="action_list" v-if="item.conceretNeed.status!='Closed'">
                <span class="re_edit" @click='editForm($event,item)' :class="item.need.enable==1||item.need.enable==3?'can_be_edit':''">{{$t('button.edit')}}</span>
                <span class="done" @click='finished($event,item)' :class="item.need.enable==5||item.need.enable==2?'can_be_done':''">{{$t('button.finished')}}</span>
                <!-- <span class="share" @click='evaluate($event,item)'>分享到</span> -->
                <span class="comment" @click='evaluate($event,item)' :class="item.need.enable==6||item.need.enable==0?'can_be_evalute':''">{{$t('button.evaluate')}}</span>
            </div>
            <div class="action_list action_list_done" v-if="item.conceretNeed.status=='Closed'">
                <span>追加评论</span>
            </div>
        </div>
    </div>

    <div v-if="nodataFlag" class="yy_nodata_class" style="">
        <div class="yy_icon_img">
            <img src="../assets/images/business_nodata.png" alt="">
            <span class="yy_nodata_text">{{noDataTips}}</span>
        </div>
   </div>
   <div class="defindloadig" v-if="loadingShow">
       <loading></loading>
   </div>
   <tips :showTipsText='showTipsText' v-if="showTipsText"></tips>
</div>

</template>

<script>
import CONFIG from '../config/config.js'
import loading from '../components/loading.vue'
import tips from '../components/tips.vue'
import { MessageBox } from 'mint-ui';
export default {
    'name': 'myAssist',
    components: {
        loading,tips
    },
    data() {
        return {
            myAssistList: [],
            nodataFlag:false,
            noDataTips:'',
            loadingShow:true,
            currentUserImgae:'',
            showTipsText:''
        }
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
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            }else if(openid){
                this.axios.get(this.apiHost+'/globalmate/rest/user/getToken?openid='+openid,{}).then((res)=>{
                    if(res.data.success){
                        this.token=res.data.data;
                        window.localStorage.setItem('TOKEN',res.data.data);
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            }
            callback&&callback(this.token)
        },
        editForm(e,item){
            e=e?e:window.event;
            e.preventDefault();
            event.stopPropagation();
            e.cancelBubble=true;
            if(item.need.enable!=1&&item.need.enable!=3){
                this.showTipsText='当前任务正在执行中，暂不能编辑！';
                setTimeout(()=>{
                    this.showTipsText=''
                },2000);
                return;
            }
            this.$router.push({
                path: 'assist',
                query: {
                    'token': this.$route.query.token,
                    'title': item.conceretNeed.tag,
                    'id': item.need.id,
                    'mode':'MODIFY'
                }
            });
        },
        finished(e,item){
            console.log(item);
            e=e?e:window.event;
    		e.preventDefault();
    		event.stopPropagation();
    		e.cancelBubble=true;
            let _this=this;
            MessageBox.confirm('',{
                title: '',
                message: '确定当前求助已完成?',
                confirmButtonText:this.$t('button.confirm'),
                cancelButtonText:this.$t('button.cancel'),
                showCancelButton: true
            }).then(action => {
                _this.confirmFinished(item);
            }).catch(cancel=>{

            });
        },
        confirmFinished(item){

            this.apiHost=CONFIG[__ENV__].apiHost;
            let providerId;
            if(item&&item.pushList.length!=0){
                 providerId=item.pushList.filter((item,index)=>{
                    return item.matchAccept
                })
            }
            if(providerId&&providerId.length!=0){
                if(item.need.enable==2||item.need.enable==5){
                    this.axios.get(this.apiHost+'/globalmate/rest/assist/'+item.need.id+'/complete/?token='+this.$route.query.token+'&providerId='+providerId[0].providerId,{
                        'needId':item.need.id,
                        'action':'coplete'
                    }).then(res=>{

                    }).catch(e=>{
                        console.log(e);
                    })
                }else{
                    this.showTipsText='当前任务还未找到帮助者，暂不能完成！';
                    setTimeout(()=>{
                        this.showTipsText=''
                    },2000);
                    return;
                }
            }else{
                 if(item.need.enable==2||item.need.enable==5){
                     this.axios.get(this.apiHost+'/globalmate/rest/assist/'+item.need.id+'/complete/?token='+this.$route.query.token+'&providerId='+'',{
                         'needId':item.need.id,
                         'action':'coplete'
                     }).then(res=>{

                     }).catch(e=>{
                         console.log(e);
                     })
                 }else{
                     this.showTipsText='当前任务还未找到帮助者，暂不能完成！';
                     setTimeout(()=>{
                         this.showTipsText=''
                     },2000);
                     return;
                 }
            }
        },
        goChat(item,items){
            this.$router.push({
                path: 'im',
                query: {
                    'token': this.$route.query.token,
                    'title': items.userInfo.nikename,
                    'id': item.need.id,
                    'toChartUser':items.userInfo.id,
                    'toChartId':items.userInfo.id,
                }
            });
        },
        evaluate(e,item){
            e=e?e:window.event;
            e.preventDefault();
            event.stopPropagation();
            e.cancelBubble=true;
            if(item.need.enable!=6&&item.need.enable!=0){
                this.showTipsText='当前任务还未完成，暂不能评价！';
                setTimeout(()=>{
                    this.showTipsText=''
                },2000);
                return;
            }
            this.$router.push({
                path: 'evaluate',
                query: {
                    'token': this.token,
                    'title': '评价',
                    'id': 'evaluate',
                }
            });
        },
        showDetail(item){
            this.$router.push({
                path: 'detail',
                query: {
                    'token': this.$route.query.token,
                    'title': item.conceretNeed.title,
                    'id': item.need.id,
                    'userId':this.$route.query.userId
                }
            });
        },

        getPushItemInfo(data,callback){
            this.apiHost=CONFIG[__ENV__].apiHost;
            this.axios.get(this.apiHost+'/globalmate/rest/user/list/'+data.providerId+'?token='+this.$route.query.token,{}).then((res)=>{
                if(res.data.success){
                    data.userInfo=res.data.data;
                    callback&&callback(data);
                }else{
                    callback&&callback(data);
                }
            }).catch(()=>{
                callback&&callback(data);
            })
        },
        getPushItem(data,callback){
            this.apiHost=CONFIG[__ENV__].apiHost;
            data.pushList=[]
            this.axios.get(this.apiHost+'/globalmate/rest/match/'+data.need.id+'?token='+this.$route.query.token,{

            }).then((res)=>{
                if(res.data.success){
                    if(res.data.data&&res.data.data.length!=0){
                        var nowData=res.data.data;
                        for(var i=0;i<nowData.length;i++){
                            this.getPushItemInfo(nowData[i],function (result) {
                                data.pushList.push(result);
                            });
                        }
                        callback&&callback(data)
                    }else {
                        callback&&callback(data)
                    }
                }else{

                }
            }).catch(()=>{
                callback&&callback(data)
            })
        },

        loadData(token){
            this.apiHost=CONFIG[__ENV__].apiHost;
            let url='/globalmate/rest/need/list';
            let _this=this;
            if(this.$route.query.id==='solove'){
                 url='/globalmate/rest//assist/listService'
            }
            this.axios.get(this.apiHost+url+'?token='+token+'&onlyCurrentUser=true',{
                onlyCurrentUser:true
            }).then((res)=>{
                if(res.data.success){
                     let data=res.data.data;
                     this.listm=[];
                     if(data.length!=0){
                         for(var i=0;i<data.length;i++){
                             if(data[i].conceretNeed&&data[i].conceretNeed.title){
                                 if(data[i].conceretNeed.pic){
                                     data[i].conceretNeed.pic=data[i].conceretNeed.pic.split(';')[0];
                                 }
                                 var status=data[i].need.enable+'';
                                 switch (status) {
                                     case '1':
                                         data[i].need.status='开放中';
                                         break;
                                     case '2':
                                         data[i].need.status='帮助中';
                                         break;
                                     case '0':
                                         data[i].need.status='关闭';
                                         break;
                                     case '3':
                                         data[i].need.status='编辑中';
                                         break;
                                     case '4':
                                         data[i].need.status='洽谈中';
                                         break;
                                     case '5':
                                         data[i].need.status='执行中';
                                         break;
                                     case '6':
                                         data[i].need.status='已完成';
                                         break;
                                     default:

                                 }
                                 this.getPushItem(data[i],function (result) {
                                      _this.myAssistList.push(result);
                                 })
                             }
                         }
                         this.loadingShow=false;
                     }else{
                         setTimeout(()=>{
                             this.nodataFlag=true;
                             this.loadingShow=false;
                         },500)
                         this.noDataTips='暂无相关数据';
                     }
                }else{
                    setTimeout(()=>{
                        this.nodataFlag=true;
                        this.loadingShow=false;
                    },500)
                    this.noDataTips='暂无相关数据';
                }
            }).catch((e)=>{
                setTimeout(()=>{
                    this.nodataFlag=true;
                    this.loadingShow=false;
                },500)
                this.noDataTips='暂无相关数据';
            })
        }
    },
   activated(){
       document.title=this.$route.query.title||'我发布的';
       this.myAssistList=[];
       this.nodataFlag=false;
       this.noDataTips='';
       this.token=this.$route.query.token;
       let url=window.location.href;
       if(url.indexOf('openId=')>-1){
           this.userId=this.$utils.getQueryStringByName('userId');
           this.openId=this.$utils.getQueryStringByName('openId');
           window.localStorage.setItem('USERID',this.userId);
           window.localStorage.setItem('OPENID',this.openId);
       }
       this.getToken(this.loadData);
   },
   created(){
       this.currentUserImgae=JSON.parse(window.localStorage.getItem('CURRENTUSER')).pic;
   }

}

</script>
