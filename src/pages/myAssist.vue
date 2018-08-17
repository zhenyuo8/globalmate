<style scoped lang='less'>
    .gl_list{
        font-size: 14px;
        margin: 0;
        padding: 0;
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
                                /*margin-top: 10px;*/
                                margin:6px  auto 10px;
                                width: 100%;
                                text-align: center;
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
                <p>事物标签: {{item.conceretNeed.tag}}</p>
                <p v-if="item.conceretNeed.country||item.conceretNeed.city">事物地点: {{item.conceretNeed.country}}_{{item.conceretNeed.city}}</p>
                <p>事物内容: {{item.conceretNeed.title}}</p>
                <p class="gl_status">{{item.need.status}}</p>
            </div>
            <div class="list_repeat_pushed" v-if="item.need.status!='关闭'">
                <p>推送名单:</p>
                <div class="list_repeat_pushed_item" v-show="item.pushList&&item.pushList.length!=0">
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
            <div class="list_repeat_pushed" v-if="item.need.status!='关闭'">
                <p>提供帮助方:</p>
                <div class="list_repeat_pushed_item" v-show="item.need.enable=='0'">
                    <div class="">
                        <img src="../assets/images/1.jpeg" alt="">
                        <span>辛巴</span>
                    </div>

                </div>
            </div>
            <div class="action_list" v-if="item.conceretNeed.status!='Closed'">
                <span class="re_edit" @click='editForm($event,item)' :class="item.need.enable==1||item.need.enable==3?'can_be_edit':''">重新编辑</span>
                <span class="done" @click='finished($event,item)' :class="item.need.enable==5||item.need.enable==2?'can_be_done':''">完成</span>
                <span class="share" @click='evaluate($event,item)'>分享到</span>
                <span class="comment" @click='evaluate($event,item)' :class="item.need.enable==6?'can_be_evalute':''">评价</span>
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
export default {
    'name': 'myAssist',
    components: {
        loading,tips
    },
    data() {
        return {
            myAssistList: [],
            imagesList:[
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg'
          ],
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
            this.apiHost=CONFIG[__ENV__].apiHost;
            	e=e?e:window.event;
    			e.preventDefault();
    			event.stopPropagation();
    			e.cancelBubble=true;
            if(item.need.enable2=6&&item.need.enable!=5){
                this.showTipsText='当前任务还未找到帮助者，暂不能完成！';
                setTimeout(()=>{
                    this.showTipsText=''
                },2000);
                return;
            }
            this.axios.get(this.apiHost+'/globalmate/rest/assist/'+item.need.id+'/complete/?token='+this.$route.query.token,{
                'needId':item.need.id,
                'action':'coplete'
            }).then(res=>{
            }).catch(e=>{
                console.log(e);
            })

        },
        evaluate(e,item){
            	e=e?e:window.event;
    			e.preventDefault();
    			event.stopPropagation();
    			e.cancelBubble=true;
            if(item.need.enable!=6){
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
        getPushItem(data,callback){
            this.apiHost=CONFIG[__ENV__].apiHost;
            this.axios.get(this.apiHost+'/globalmate/rest/match/'+data.need.id+'?token='+this.$route.query.token,{

            }).then((res)=>{
                if(res.data.success){
                    data.pushList=res.data.data;
                    callback&&callback(data)
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
                                 data[i].conceretNeed.url=this.imagesList[i]
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
                                 console.log(data[i]);
                                 this.getPushItem(data[i],function (result) {
                                      _this.myAssistList.push(result)
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
    //    this.loadData();
   },
   created(){
       this.currentUserImgae=JSON.parse(window.localStorage.getItem('CURRENTUSER')).pic;

   }

}

</script>
