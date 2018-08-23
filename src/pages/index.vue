YY<template>
    <div class="index" id='index'>
        <div class="header">
            <div class="min right">
                <div class="icon-global-im" @click='toMessage()'>
                    <i class="message_tips"></i>
                </div>
                <div class="icon-user" @click='goPersonalCenter()' :class="token?'login_yes':'login_no'">

                </div>
            </div>
        </div>
        <div class="swpier_container" >
            <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
                <swiper-slide class="swiper-item" v-for="(item,index) in slides" :key='index'><img :src='item' alt=""></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="">
            <p class="index_notice icon-exclamation">{{$t('formTitle.indexnotice')}}</p>
             <ul class="mainmenu">
                 <li v-for="(item,index) in mainmenu" ><a href="javascript:;" ><b :class="item.icon" @click='publish(item)'></b><span>{{item.title}}</span></a></li>
             </ul>
        </div>

        <div class="rank service_star">
            <div class="rank_title service_star_title">
                <div class="left">
                    {{$t('button.stars')}}
                </div>
                <div class="right icon-arrow_right_samll" @click='goRankAll("service")'>
                    {{$t('button.more')}}
                </div>
            </div>
            <ul>
                <li><a href="javascript:;"><img src="../assets/images/icon.png" alt=""></a></li>
                <li><a href="javascript:;"><img src="../assets/images/icon.png" alt=""></a></li>
                <li><a href="javascript:;"><img src="../assets/images/icon.png" alt=""></a></li>
            </ul>
        </div>
        <div class="buttom_action">
            <ul>
                <li class="need_help" @click="seekHelp">{{$t('button.myPublished')}}</li>
                <li @click='offer'>{{$t('button.OthersPublished')}}</li>
            </ul>
        </div>
        <div class="defindloadig" v-if="loadingShow">
            <loading></loading>
        </div>
    </div>
</template>

<script>
    import { swipe, SwipeItem } from 'vue-awesome-swiper'
    import loading from '../components/loading.vue'
    import CONFIG from '../config/config.js'
    import { MessageBox,Toast} from 'mint-ui';
    require('swiper/dist/css/swiper.css')
	export default {
        'name':'index',
        components:{
            swipe, SwipeItem,loading
        },
		data(){
			return{
                slides: [
                  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg',
                  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg',
                  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg'
                ],
                swiperOption: {
                    notNextTick: true,
                    pagination: '.swiper-pagination',
                    observer:true,
                    observeParents:true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    loop:true,
                    onSlideChangeEnd: swiper => {
                        //这个位置放swiper的回调方法
                        this.page = swiper.realIndex + 1;
                        this.index = swiper.realIndex;
                    },
                },
                mainmenu:[],
                token:'',
                code:'',
                hasReceiveMessage:false,
                messageList:[],
                loadingShow:true,
			}
		},
        computed: {
            swiper() {
              return this.$refs.mySwiper.swiper;
            }
        },
        mounted () {
            this.swiper.slideTo(0, 0, false);
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
            getCurrentUser(token){
                this.apiHost=CONFIG[__ENV__].apiHost;
                if(!token){
                    token=window.localStorage.getItem('TOKEN');
                }
                this.axios.get(this.apiHost+'/globalmate/rest/user/getUserByToken'+'?token='+token,{}).then((res)=>{
                    if(res.data.success){
                        window.localStorage.setItem('gl_CURRENTUSER',JSON.stringify(res.data.data))
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            },
            publish(item){
                 this.token=window.localStorage.getItem('TOKEN');
                 var isIdentify=window.localStorage.getItem('IDENTIFY_YET_glohelp');
                 if(!isIdentify){
                     Toast({
       					message: '请您先完成身份认证',
       					duration: 2000
     				});
                     return;
                 }
                 if(item.key=='carry'){
                     Toast({
       					message: '对不起，该功能暂未上线，敬请关注...',
       					duration: 2000
     				 });
                 }else{
                     this.loadingShow=true;
                     if(!this.token) {
                         Toast({
           					message: '请先登入...',
           					duration: 2000
         				 });
                     }else {
                         setTimeout(()=>{
                             this.loadingShow=false;
                             this.$router.push({
                                 path: item.type,
                                 query: {
                                     'token': this.token,
                                     'title': item.title,
                                     'type': item.type,
                                     'form': item.form,
                                     'key':item.key
                                 }
                             });
                         },500)
                     }
                 }
            },
            /**
             * [getServiceRank 服务之星数据获取]
             * @return {[type]} [description]
             */
            getServiceRank(){
                this.apiHost=CONFIG[__ENV__].apiHost;

            },
            goPersonalCenter(){
                 this.token=window.localStorage.getItem('TOKEN');
                if(!this.token){
                    Toast({
                       message: '请先登入...',
                       duration: 2000
                    });
                }else{
                    this.$router.push({
                        path: 'mine',
                        query: {
                          'token': this.token,
                          'title': '个人中心',
                        }
                    });
                }
            },
            offer(){
                 this.token=window.localStorage.getItem('TOKEN');
                 this.userId=window.localStorage.getItem('USERID')
                 if(window.localStorage.getItem('gl_CURRENTUSER')){
                     this.userId=JSON.parse(window.localStorage.getItem('gl_CURRENTUSER')).id;
                 }
                 if(!this.token) {
                     Toast({
                        message: '请先登入...',
                        duration: 2000
                     });
                 }else{
                     this.$router.push({
                         path: 'seekHelpList',
                         query: {
                           'token':this.token,
                           'title': '求助列表',
                           'id':'offer',
                           'userId':this.userId
                         }
                     });
                 }
            },
            seekHelp(){
              this.token=window.localStorage.getItem('TOKEN');
                if(!this.token) {
                    Toast({
      					message: '请先登入...',
      					duration: 2000
    				});
                }else{
                    this.$router.push({
                        path: 'myAssist',
                        query: {
                          'token':this.token,
                          'title': '求助列表',
                          'id':'seek',
                          'userId':this.userId
                        }
                    });
                }
            },
            toMessage(){
                window.localStorage.setItem('MESSAGELIST',JSON.stringify(this.messageList));
                $('.message_tips').text('');
                this.$router.push({
                    path: 'messageList',
                    query: {
                        'token': this.token,
                        'title': '消息列表',
                        'id': 'message',

                    }
                });
            },
            goRankAll(key){
                 this.token=window.localStorage.getItem('TOKEN');
                if(!this.token) {
                    Toast({
      					message: '请先登入...',
      					duration: 2000
    				});
                }else{
                    this.$router.push({
                        path: 'rankAll',
                        query: {
                          'token': this.token,
                          'title': '榜单',
                          'type': key,
                        }
                    });
                }
            },
		},
        activated(){
            document.title='Glohelp';
            this.getToken(this.getCurrentUser);

            setTimeout(()=>{
                this.loadingShow=false;
            },1500);
            setTimeout(()=>{
                this.mainmenu=[
                    {
                        'title':this.$t('formName.study'),
                        'key':'learnco',
                        'type':'assist',
                        'form':'assist',
                        'icon':'icon-pen'
                    },{
                        'title': this.$t('formName.textbook'),
                        'key': 'other',
                        'type': 'assist',
                        'form':'other',
                        'icon':'icon-book'
                    },{
                        'title': this.$t('formName.formality'),
                        'key': 'other',
                        'type': 'assist',
                        'form':'other',
                         'icon':'icon-Document_2_yinzhang'
                    },{
                        'title': this.$t('formName.exchange'),
                        'key': 'other',
                        'type': 'assist',
                        'form':'other',
                         'icon':'icon-coin-yen'
                    },{
                        'title': this.$t('formName.medical'),
                        'key': 'other',
                        'type': 'assist',
                        'form':'other',
                         'icon':'icon-local_hospital'
                    },{
                        'title': this.$t('formName.carry'),
                        'key': 'carry',
                        'type': 'assist',
                        'form':'carryAssist',
                         'icon':'icon-flight_takeoff'
                    },{
                        'title': this.$t('formName.rent'),
                        'key': 'other',
                        'type': 'assist',
                        'form':'other',
                         'icon':'icon-office'
                    }, {
                        'title': this.$t('formName.accompany'),
                        'key': 'accompany',
                        'type': 'assist',
                        'form':'accompany',
                         'icon':'icon-pacman'
                    },{
                        'title': this.$t('formName.daigou'),
                        'key': 'buy',
                        'type': 'assist',
                        'form':'aassist',
                         'icon':'icon-icon-announce'
                    }, {
                        'title': this.$t('formName.other'),
                        'key': 'assist',
                        'type': 'assist',
                        'form':'other',
                         'icon':'icon-more-horizontal'
                    }
                ]
            },500);
        },

        created(){

        }
	}
</script>

<style>
    #index{
        background: #efefef;
        overflow: hidden;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow-y: scroll;
        padding-bottom: 44px;
    }
    .header{
        font-size: 14px;
        overflow: hidden;
        position: fixed;
        z-index: 111;
        left: 0;
        right: 0;
        top: 0;
        background: rgba(250,250,250,0.8);
    }
    .swpier_container{
        margin-top: 36px;
    }
    .header > div{
        color: #bfbfbf;
    }
    .header .right{
        float: right;
        display: flex;
    }
    .icon-global-im{
        width: .76rem;
        position: relative;
    }
    .message_tips{
        background: red;
        padding: 0 .04rem;
        border-radius: 5px;
        color: #fff;
        position: absolute;
        top: 1px;
        font-size: 11px;
        display: none;
        right: -0.1rem;
    }
    .icon-global-im::before{
        color: #bfbfbf;
        font-size: 32px;
        line-height: 36px;
    }
    .icon-user::before{
        font-size: 26px;
        line-height: 36px;
    }

    .icon-user{
        position: relative;
        font-size:20px;
        color:#9f9f9f;
        margin-right: .1rem;
        width: .88rem;
    }
    .login_yes{
        color:#007aff!important;
    }
    .login_no{
        color:#bfbfbf!important;
    }
    .swiper-item{
        height: 177px!important;
    }
    .swiper-item img{
        height: 100%;
        width: 100%;
        display: inline-block;
    }
    img { border:0; }
    ul { list-style: none outside none; margin:0; padding: 0; }
     .mainmenu:after { clear: both; content: " "; display: block; }
     .mainmenu{
         background: #fff;
         padding: 10px .06rem;
         font-size: 12px;
     }
     .mainmenu li{
        float:left;
        width: 20%;
        margin-top: 2.5%;
        border-radius:3px;
        overflow:hidden;
    }

     .mainmenu li a{ display:block;  color:#FFF;   text-align:center;text-decoration:none}
     .mainmenu li a b{
         width: 1rem;
         height: 1rem;
         margin: auto;
         display:block;
         border-radius: 50%;
         font-size: 28px;
         line-height: 1rem;
    }
     .mainmenu li a img{
        margin: 15px auto 15px;
    }

     .mainmenu li a span{
         display:block;
         line-height: 30px;
         background-color:#FFF;
         color: #999;
         font-size:12px;
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
      }

     .mainmenu li:nth-child(8n+1) b{
          background: -webkit-linear-gradient(94.5deg,rgba(251,110,109,1),rgba(212,79,64,1)); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(94.5deg,rgba(251,110,109,1),rgba(212,79,64,1)); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(94.5deg,rgba(251,110,109,1),rgba(212,79,64,1)); /* Firefox 3.6 - 15 */
          background: linear-gradient(94.5deg,rgba(251,110,109,1),rgba(212,79,64,1)); /* 标准的语法 */
     }
     .mainmenu li:nth-child(8n+2) b{
         background: -webkit-linear-gradient(105.1deg,rgba(255,92,102,1),rgba(194,44,45,1)); /* Safari 5.1 - 6.0 */
         background: -o-linear-gradient(107.7deg,rgba(88,205,246,1),rgba(66,157,222,1)); /* Opera 11.1 - 12.0 */
         background: -moz-linear-gradient(107.7deg,rgba(88,205,246,1),rgba(66,157,222,1)); /* Firefox 3.6 - 15 */
         background: linear-gradient(107.7deg,rgba(88,205,246,1),rgba(66,157,222,1)); /* 标准的语法 */
     }
     .mainmenu li:nth-child(8n+3) b{
         background: -webkit-linear-gradient(99.3deg,rgba(185,101,255,1),rgba(113,44,189,1)); /* Safari 5.1 - 6.0 */
         background: -o-linear-gradient(99.3deg,rgba(185,101,255,1),rgba(113,44,189,1)); /* Opera 11.1 - 12.0 */
         background: -moz-linear-gradient(99.3deg,rgba(185,101,255,1),rgba(113,44,189,1)); /* Firefox 3.6 - 15 */
         background: linear-gradient(99.3deg,rgba(185,101,255,1),rgba(113,44,189,1)); /* 标准的语法 */
     }
     .mainmenu li:nth-child(8n+4) b{
         background: -webkit-linear-gradient(107.5deg,rgba(255,134,63,1),rgba(244,88,21,1)); /* Safari 5.1 - 6.0 */
         background: -o-linear-gradient(107.5deg,rgba(255,134,63,1),rgba(244,88,21,1)); /* Opera 11.1 - 12.0 */
         background: -moz-linear-gradient(107.5deg,rgba(255,134,63,1),rgba(244,88,21,1)); /* Firefox 3.6 - 15 */
         background: linear-gradient(107.5deg,rgba(255,134,63,1),rgba(244,88,21,1)); /* 标准的语法 */
     }
     .mainmenu li:nth-child(8n+5) b{
         background: -webkit-linear-gradient(103.8deg,rgba(97,216,60,1),rgba(60,182,95,1)); /* Safari 5.1 - 6.0 */
         background: -o-linear-gradient(103.8deg,rgba(97,216,60,1),rgba(60,182,95,1)); /* Opera 11.1 - 12.0 */
         background: -moz-linear-gradient(103.8deg,rgba(97,216,60,1),rgba(60,182,95,1)); /* Firefox 3.6 - 15 */
         background: linear-gradient(103.8deg,rgba(97,216,60,1),rgba(60,182,95,1)); /* 标准的语法 */
     }
     .mainmenu li:nth-child(8n+6) b{
         background: -webkit-linear-gradient(103.1deg,rgba(251,141,22,1),rgba(235,122,52,1)); /* Safari 5.1 - 6.0 */
         background: -o-linear-gradient(103.1deg,rgba(251,141,22,1),rgba(235,122,52,1)); /* Opera 11.1 - 12.0 */
         background: -moz-linear-gradient(103.1deg,rgba(251,141,22,1),rgba(235,122,52,1)); /* Firefox 3.6 - 15 */
         background: linear-gradient(103.1deg,rgba(251,141,22,1),rgba(235,122,52,1)); /* 标准的语法 */
     }
     .mainmenu li:nth-child(8n+7) b{
         background: -webkit-linear-gradient(103deg,rgba(254,201,73,1),rgba(235,152,38,1)); /* Safari 5.1 - 6.0 */
         background: -o-linear-gradient(103deg,rgba(254,201,73,1),rgba(235,152,38,1)); /* Opera 11.1 - 12.0 */
         background: -moz-linear-gradient(103deg,rgba(254,201,73,1),rgba(235,152,38,1)); /* Firefox 3.6 - 15 */
         background: linear-gradient(103deg,rgba(254,201,73,1),rgba(235,152,38,1)); /* 标准的语法 */
     }
     .mainmenu li:nth-child(8n+8) b{
         background: -webkit-linear-gradient(99.5deg,rgba(255,85,125,1),rgba(215,43,85,1)); /* Safari 5.1 - 6.0 */
         background: -o-linear-gradient(99.5deg,rgba(255,85,125,1),rgba(215,43,85,1)); /* Opera 11.1 - 12.0 */
         background: -moz-linear-gradient(99.5deg,rgba(255,85,125,1),rgba(215,43,85,1)); /* Firefox 3.6 - 15 */
         background: linear-gradient(99.5deg,rgba(255,85,125,1),rgba(215,43,85,1)); /* 标准的语法 */
     }


     .rank{
         margin-top: 7px;
         background:rgba(255,255,255,0.6);
         /*height: 116px;*/
         font-size: 14px;
         color: #999;
     }
     .rank ul{
         padding:6px .6rem 16px;
     }
     .rank ul li{
         display: inline-block;
         width: 1.4rem;
         height: 1.4rem;
         background: #fff;
         border-radius: 50%;
         margin-right: .94rem;
         overflow: hidden;
     }
     .rank ul li img{
         width: 100%;
         height: 100%;
         display: inline-block;
     }
     .rank_title {
         padding: 7px .22rem;
         /*text-align: left;*/
         display: flex;
     }
     .school_star_title>div, .service_star_title>div {
         flex: 1
     }
     .school_star_title .left, .service_star_title .left{
         text-align: left;
     }
     .school_star_title .right, .service_star_title .right{
         text-align: right;
     }
     .rank ul li:last-child{
         margin: 0;
         /*margin: 0 1.02rem;*/
     }
     .school_star{
         margin-bottom: 46px;
     }
     .school_star ul li a, .service_star ul li a{
       width: 1.4rem;
       height: 1.4rem;
     }

    #index .buttom_action{
         position: fixed;
         bottom: -1px;
         left: 0;
         right: 0;
         background:rgba(250,250,250,0.9);
         box-shadow:0px 1px 0px 0px rgba(178,178,178,1);
     }
    #index .buttom_action ul{
         height: 24px;
         padding: 10px 0;
     }
     #index .buttom_action ul li{
         display: inline-block;
         width: 50%;
         font-size: 16px;
         font-weight: 500;
         float: left;
         height: 24px;
         line-height: 24px;
         color: #007aff;
     }
     .need_help{
         box-sizing: border-box;
         border-right: 2px solid #979797;

     }
      #index .icon-arrow_right_samll{
          font-size: 12px;
          color: #54698D;
      }
     #index .icon-arrow_right_samll::before{
         float: right;
         font-size: 14px;
     }
     #index .index_notice{
         color: #f59d0b;
         padding: 6px 0;
         text-align: left;
         background: #f9f8f4;
         padding-left: 20px;
         font-size: 12px;
     }
     #index .icon-exclamation::before{
         margin-right: .04rem
     }
</style>
