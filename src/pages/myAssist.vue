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

<template>

<div class="gl_list">
    <div class="list_warp">
        <div class="list_repeat" v-for="(item,index) in myAssistList">
            <div class="list_repeat_content" @click='showDetail(item)'>
                <p>{{$t('formTitle.type')}}: {{item.conceretNeed.tag}}</p>
                <p v-if="item.conceretNeed.country||item.conceretNeed.city">{{$t('formTitle.address')}}: {{item.conceretNeed.country}}_{{item.conceretNeed.city}}</p>
                <p>{{$t('formTitle.head')}}: {{item.conceretNeed.title}}</p>
                <p class="gl_status" :class="'status_'+item.need.enable">{{item.need.status}}</p>
            </div>
            <div class="list_repeat_pushed" v-if="item.need.enable!=0">
                <p>{{$t('formTitle.pushTitle')}}:</p>
                <div class="list_repeat_pushed_item" v-show="item.pushList&&item.pushList.length!=0">
                    <div class="" v-for="items in item.pushList" @click='goChat(item,items)'>
                        <img :src="items.userInfo.pic" v-if="items.userInfo.pic" alt="">
                        <img src="../assets/images/icon.png" v-if="!items.userInfo.pic" alt="">
                        <span>{{items.userInfo.nikename}}</span>
                    </div>
                </div>
            </div>
            <div class="list_repeat_pushed" v-if="item.assistList.length!=0">
                <p>{{$t('formTitle.helpMan')}}:</p>
                <div class="list_repeat_pushed_item" v-show="item.need.enable=='0'">
                    <div class="" v-for="items in item.assistList" @click='goChat(item,items)'>
                        <img :src="items.userInfo.pic" v-if="items.userInfo.pic" alt="">
                        <img src="../assets/images/icon.png" v-if="!items.userInfo.pic" alt="">
                        <span>{{items.userInfo.nikename}}</span>
                    </div>
                </div>
            </div>
            <div class="action_list" v-if="item.conceretNeed.status!='Closed'">
                <span class="re_edit" @click='editForm($event,item)' :class="item.need.enable==1||item.need.enable==3?'can_be_edit':''">{{$t('button.edit')}}</span>
                <span class="done" @click='finished($event,item)' :class="item.need.enable==5||item.need.enable==2?'can_be_done':''">{{$t('button.finished')}}</span>
                <!-- <span class="share" @click='evaluate($event,item)'>分享到</span> -->
                <span class="comment" @click='evaluate($event,item)' :class="item.need.enable==0?'can_be_evalute':''">{{$t('button.evaluate')}}</span>
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
</div>

</template>

<script>
import CONFIG from '../config/config.js'
import loading from '../components/loading.vue'
import { MessageBox,Toast} from 'mint-ui';
export default {
    'name': 'myAssist',
    components: {
        loading
    },
    data() {
        return {
            myAssistList: [],
            nodataFlag:false,
            noDataTips:'',
            loadingShow:true,
            currentUserImgae:'',
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
                        callback&&callback(this.token)
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            }else if(openid){
                this.axios.get(this.apiHost+'/globalmate/rest/user/getToken?openid='+openid,{}).then((res)=>{
                    if(res.data.success){
                        this.token=res.data.data;
                        window.localStorage.setItem('TOKEN',res.data.data);
                        callback&&callback(this.token)
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            }else{
                callback&&callback(this.token)
            }

        },
        editForm(e,item){
            e=e?e:window.event;
            e.preventDefault();
            event.stopPropagation();
            e.cancelBubble=true;
             if(item.need.enable==0){
                 Toast({
                    message: '当前任务已经完成',
                    duration: 2000
                 });
                 return;
             }
             if(item.need.enable!=1&&item.need.enable!=3){
                 Toast({
                    message: '当前任务正在执行中，暂不能编辑!',
                    duration: 2000
                });
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
            e=e?e:window.event;
    		e.preventDefault();
    		event.stopPropagation();
    		e.cancelBubble=true;
            let _this=this;
             if(item.need.enable==0){
                 Toast({
                    message: '当前任务已经完成',
                    duration: 2000
                 });
                 return;
             }
            MessageBox.confirm('',{
                title: '',
                message: '确定当前困难已解决?',
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
                this.axios.get(this.apiHost+'/globalmate/rest/assist/'+item.need.id+'/complete/?token='+this.$route.query.token+'&providerId='+providerId[0].providerId,{
                    'needId':item.need.id,
                    'action':'coplete'
                }).then(res=>{
                    this.loadingShow=true;
                    this.myAssistList=[];
                    this.loadData(this.token);

                }).catch(e=>{
                    console.log(e);
                })
            }else{
                 this.axios.get(this.apiHost+'/globalmate/rest/assist/'+item.need.id+'/complete/?token='+this.$route.query.token,{
                     'needId':item.need.id,
                     'action':'coplete'
                 }).then(res=>{
                     this.loadingShow=true;
                     this.myAssistList=[];
                     this.loadData(this.token);
                 }).catch(e=>{
                     console.log(e);
                 })
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
            if(item.need.enable==6){
                Toast({
                   message: '当前任务已评价！',
                   duration: 2000
                });
                return;
            }
            if(item.need.enable!=0){
                Toast({
                   message: '当前任务还未完成，暂不能评价！',
                   duration: 2000
                });
                return;
            }
            if(item.assistList.length==0){
                Toast({
                   message: '当前困难不是由别人完成',
                   duration: 2000
                });
                return;
            }else{
                let assistMan=item.assistList[0].providerId
                this.$router.push({
                    path: 'evaluate',
                    query: {
                        'token': this.token,
                        'title': this.$t('button.evaluate'),
                        'id': 'evaluate',
                        'evaluateId':assistMan,
                        'businessId':item.need.id,
                        'uNeedId':item.assistList[0].uNeedId,
                        'uNeedName':item.assistList[0].uNeedName
                    }
                });
            }
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
            data.pushList=[];
            data.assistList=[];
            let _this=this;
            this.axios.get(this.apiHost+'/globalmate/rest/match/'+data.need.id+'?token='+this.token,{

            }).then((res)=>{
                if(res.data.success){
                    if(res.data.data&&res.data.data.length!=0){
                        var nowData=res.data.data;
                        for(var i=0;i<nowData.length;i++){
                            let curNowData=nowData[i];
                            (function(curNowData){
                                _this.getPushItemInfo(curNowData,function (result) {
                                    if(result.matchAccept){
                                        data.assistList.push(result);
                                    }
                                    data.pushList.push(result);
                                    callback&&callback(data)
                                });
                            })(curNowData)
                        }

                    }else {
                        callback&&callback(data)
                    }
                }else{
                    callback&&callback(data)
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
                                         data[i].need.status=this.$t('status.open');
                                         break;
                                     case '2':
                                         data[i].need.status=this.$t('status.execute');
                                         break;
                                     case '0':
                                         data[i].need.status=this.$t('status.closed');
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
                                         data[i].need.status=this.$t('status.complete');
                                         break;
                                     default:

                                 }
                                 let curData=data[i];
                                 (function (curData) {
                                     _this.getPushItem(curData,function (result) {
                                         _this.myAssistList.push(result)
                                     })
                                 })(curData);
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
       this.getToken(this.loadData);
   },
   created(){
    //    this.currentUserImgae=JSON.parse(window.localStorage.getItem('CURRENTUSER')).pic;
   }

}

</script>
