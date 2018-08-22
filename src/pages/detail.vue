<style scoped lang='less'>

    .detail {
        box-sizing: border-box;
        font-size: 14px;
        color: #9B9B9B;
        padding: 20px .4rem;
        padding-bottom: 54px;
        position: relative;
         position: absolute;
         left: 0;
         right: 0;
         bottom: 0;
         top: 0;
         overflow-y: scroll;

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
        &.gl_disabled{
            span{
                background: #b3b3b3;
            }
        }
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
                <span>{{listData.status}}</span>
            </div>
        </div>
        <div class="detail_middle">
            <p>标题：{{listData.title}}</p>
            <p>地点：{{listData.country}}<i v-if="listData.city">_</i> {{listData.city}}</p>
            <p>时间：{{listData.startTime}} <i v-if="listData.endTime">至</i> {{listData.endTime}}</p>
            <p>悬赏金额(￥)：<i style="color:red">{{listData.rewardAmount}}</i></p>
            <p>详细内容：{{listData.description}}</p>
        </div>
        <div class="detail_image_new" v-if="listData.pic&&listData.pic.length!=0">
            <div class="detail_content_img" v-for="(items,indexs) in listData.pic">
                <img :src="items+'?x-oss-process=image/resize,m_fixed,h_65,w_65'" alt="" v-if="indexs<3">
            </div>
        </div>

        <div class="list_repeat_pushed" >
            <p>推送名单:</p>
            <div class="list_repeat_pushed_item" v-if="pushList.length!=0">
                <div class="" v-for="item in pushList">
                    <img :src="item.userInfo.pic" alt="">
                    <span>{{item.userInfo.nikename}}</span>
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
    <div class="detail_message" v-show="userId!=otherUserId">
        <div class="detail_message_chart" :class="listData.enable!=1?'gl_disabled':''">
            <span @click='goChart'>去帮助</span>
        </div>
    </div>
    <tips :showTipsText='showTipsText' v-if="showTipsText"></tips>
</div>

</template>

<script>
import CONFIG from '../config/config.js'
import tips from '../components/tips.vue'
export default {
    'name': 'detail',
    components: {
        tips
    },
    data() {
        return {
            id:'',
            userId:'',
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
            listData:{},
            pushList:[],
            showTipsText:''
        }
    },
    activated(){
        let url=window.location.href;
        this.listData={};
        this.pushList=[];
        this.detail={
            'title':'',
            'country':'',
            'description':'',
            'type':''
        };

        this.country='';
        this.id=this.$route.query.id;
        this.userId=this.$route.query.userId;
        if(url.indexOf('openId=')>-1){
            this.id=this.$utils.getQueryStringByName('id');
            this.userId=this.$utils.getQueryStringByName('userId');
            window.localStorage.setItem('USERID',this.userId);
            this.initIM(this.userId);
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
                callback&&callback(this.token);
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

                     for(var key in data.conceretNeed){
                         if(key=='tag'||key=='city'||key=='country'||key=='startTime'||key=='endTime'||key=='title'||key=='description'||key=='pic'||key=='rewardAmount'){
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
                                 list[key]=status;
                                 switch (status) {
                                     case '1':
                                         list['status']='开放中';
                                         break;
                                     case '2':
                                         list['status']='帮助中';
                                         break;
                                     case '0':
                                         list['status']='关闭';
                                         break;
                                     case '3':
                                         list['status']='编辑中';
                                         break;
                                     case '4':
                                         list['status']='洽谈中';
                                         break;
                                     case '5':
                                         list['status']='执行中';
                                         break;
                                     case '6':
                                         list['status']='已完成';
                                         break;
                                     default:
                                 }
                             }else{
                                list[key]=data.need[key];
                             }

                         }
                     }
                     _this.listData=list;
                     this.getPushItem(data.need.id)
                }else{

                }
            }).catch((e)=>{
                console.log(e);
            })
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
        getPushItem(id){
            let _this=this;
            this.apiHost=CONFIG[__ENV__].apiHost;
            this.axios.get(this.apiHost+'/globalmate/rest/match/'+id+'?token='+this.$route.query.token,{

            }).then((res)=>{
                if(res.data.success){
                   if(res.data.data&&res.data.data.length!=0){
                       var nowData=res.data.data;
                       for(var i=0;i<nowData.length;i++){
                           this.getPushItemInfo(nowData[i],function (result) {
                               _this.pushList.push(result);
                           });
                       }
                   }
                }
            }).catch((e)=>{
                console.log(e);
            })
        },
        goChart(){
            if(this.listData.enable!=1){
                 this.showTipsText='当前任务已完成或者正在执行中';
                 setTimeout(()=>{
                     this.showTipsText='';
                 },1500)
                 return
            }

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
        initIM(username){
            let _this=this;
            YYIMChat.initSDK({
                  app: 'globalmate_test', //appId应用id
                  etp: 'zxy_test', //etpId企业id
                  wsurl: 'stellar.yyuap.com', //websocket Url
                  wsport: 5227, //websocket port 5227/5222/5225
                  servlet: 'https://im.yyuap.com/', //rest Url
                  hbport: 7075, //httpbind  port 7075/7070
                  flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
                  logEnable: true, //client log
                  clientMark: 'web', //client mark 'web' or 'pc'
                  apiKey: '',
                });
            YYIMChat.init({
              onOpened: function() {
                // 登录成功
                YYIMChat.getVCard({
                  success:function(res){

                  }
                })
              },
              onExpiration: function(callback) {
                //自动更新token
                //callback(token, expiration);
              },
              onClosed: function(arg) {
                //连接关闭
              },
              onConflicted: function(arg) {
                //登陆冲突
              },
              onClientKickout: function(arg) {
                //被他端踢掉
              },
              onUpdatePassword: function(arg) {
                //更改密码，被踢掉
              },
              onAuthError: function(arg) {
                //登陆认证失败
              },
              onConnectError: function(arg) {
                //连接失败
              },
              onReceipts: function(arg) {
                //消息回执
              },
              onSubscribe: function(arg) {
                //发生订阅
              },
              onRosterFavorited: function(arg) {
                //被收藏
              },
              onRosterUpdateded: function(arg) {
                //好友信息更改
              },
              onMessage: function(arg) {
                // _this.dealMessage(arg)
                //收到消息,包括收到他人给自己发的消息和所有的群消息
              },
              onGroupUpdate: function(arg) {
                //群组更新
              },
              onKickedOutGroup: function(arg) {
                //群成员被群主提出
              },
              onTransferGroupOwner: function(arg){
                //群主转让
              },
              onPresence: function(arg) {
                //好友presence改变
              },
              onRosterDeleted: function(arg) {
                //好友被删除
              },
              onPubaccountUpdate: function(pubaccounts) {
                //公共号信息更新
              },
              onTransparentMessage: function(arg) {
                //透传业务消息
              },
            });
            this.loginIM(username);
            YYIMChat.onMessage();
        },
        loginIM(username){

            if(!username) return;
             $.ajax({
                url: 'https://im.yyuap.com/sysadmin/rest/zxy_test/globalmate_test/token',
                type: 'POST',
                dataType: 'json',
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify({
                    "username":username,
                    "clientId":"44a18837b5acf71f0017772df15e1542",
                    "clientSecret":"959E5086D0544F36C915F91B624EA8DE"
                }),
                success: function (result) {
                    let clientIdentify = "pc" + String(new Date().getTime());
                    //登陆YYIMSDK
                    YYIMChat.login({
                        "username": username,
                        "token": result.token,
                        "expiration": result.expiration,
                        "appType": 4,
                        "identify": clientIdentify
                    });
                },
                error: function (arg) {
                    console.log(arg);
                }
            });
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
