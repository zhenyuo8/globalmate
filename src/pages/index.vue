<template>
    <div class="index" id='index'>
        <div class="header">
            <div class="location left">
                <div class="icon-map-location"></div>
                <div class="name">北京</div>
            </div>
            <div class="min right">
                <div class="sos">
                    <i>sos</i>
                </div>
                <div class="icon-Document_im" @click='toMessage()'>

                </div>
                <div class="icon-user" @click='showPersonalInf()' :class="token?'login_yes':'login_no'">

                </div>
            </div>
            <div class="user_wrap" v-show="showPersonal">
                <span @click='goPersonalCenter'>个人中心</span>
                <span @click='login'>登入</span>
                <span @click='register'>注册</span>
            </div>
        </div>
        <div class="swpier_container" >
            <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
                <swiper-slide class="swiper-item" v-for="(item,index) in slides" :key='index'><img :src='item' alt=""></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <ul class="mainmenu">
            <li v-for="(item,index) in mainmenu" ><a href="javascript:;" ><b :class="item.icon" @click='publish(item)'></b><span>{{item.title}}</span></a></li>
            <!-- <li><a href="/#/assist" ><b><img src="images/tb01.png" /></b><span>学习互助</span></a></li>
            <li><a href="/#/assist" ><b><img src="images/tb02.png" /></b><span>教材</span></a></li>
            <li><a href="/#/assist" ><b><img src="images/tb03.png" /></b><span>办手续</span></a></li>
            <li><a href="/#/assist" ><b><img src="images/tb04.png" /></b><span>换汇</span></a></li>
            <li><a href="/#/assist" ><b><img src="images/tb05.png" /></b><span>就医</span></a></li>
            <li><a href="/#/assist" ><b><img src="images/tb06.png" /></b><span>帮带</span></a></li>
            <li><a href="/#/assist" ><b><img src="images/tb06.png" /></b><span>租赁</span></a></li>
            <li><a href="/#/accompany" ><b><img src="images/tb07.png" /></b><span>陪玩</span></a></li>
            <li><a href="/#/assist" ><b><img src="images/tb08.png" /></b><span>代购</span></a></li>
            <li><a href="/#/other" ><b><img src="images/tb08.png" /></b><span>其他</span></a></li> -->
        </ul>
        <div class="rank service_star">
            <div class="rank_title service_star_title">
                服务之星榜单
            </div>
            <ul>
                <li><a href="javascript:;"><img src="../assets/images/1.jpeg" alt=""></a></li>
                <li><a href="javascript:;"><img src="../assets/images/2.jpeg" alt=""></a></li>
                <li><a href="javascript:;"><img src="../assets/images/3.jpg" alt=""></a></li>
            </ul>
        </div>
        <div class="rank school_star">
            <div class="rank_title school_star_title">
                校园龙虎榜
            </div>
            <ul>
                <li><a href="javascript:;"><img src="../assets/images/11.jpeg" alt=""></a></li>
                <li><a href="javascript:;"><img src="../assets/images/12.jpeg" alt=""></a></li>
                <li><a href="javascript:;"><img src="../assets/images/13.jpeg" alt=""></a></li>
            </ul>
        </div>
        <div class="buttom_action">
            <ul>
                <li class="need_help">寻求帮助</li>
                <li @click='offer'>提供帮助</li>
            </ul>
        </div>
        <tips :showTipsText='showTipsText'></tips>
    </div>
</template>

<script>
    import { swipe, SwipeItem } from 'vue-awesome-swiper'
    import tips from '../components/tips.vue'
    require('swiper/dist/css/swiper.css')
	export default {
        'name':'index',
        components:{
            swipe, SwipeItem,tips
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
                mainmenu:[
                    {
                        'title':'学习互助',
                        'key':'learnco',
                        'type':'assist',
                        'form':'assist',
                        'icon':'icon-pen'
                    },{
                        'title': '教材',
                        'key': 'assist',
                        'type': 'assist',
                        'form':'other',
                        'icon':'icon-book'
                    },{
                        'title': '办手续',
                        'key': 'assist',
                        'type': 'assist',
                        'form':'other',
                         'icon':'icon-Document_2_yinzhang'
                    },{
                        'title': '换汇',
                        'key': 'assist',
                        'type': 'assist',
                        'form':'other',
                         'icon':'icon-coin-yen'
                    },{
                        'title': '就医',
                        'key': 'assist',
                        'type': 'assist',
                        'form':'other',
                         'icon':'icon-local_hospital'
                    },{
                        'title': '帮带',
                        'key': 'assist',
                        'type': 'assist',
                        'form':'carryAssist',
                         'icon':'icon-flight_takeoff'
                    },{
                        'title': '租赁',
                        'key': 'assist',
                        'type': 'assist',
                        'form':'other',
                         'icon':'icon-office'
                    }, {
                        'title': '陪伴',
                        'key': 'assist',
                        'type': 'assist',
                        'form':'accompany',
                         'icon':'icon-pacman'
                    },{
                        'title': '代购',
                        'key': 'assist',
                        'type': 'assist',
                        'form':'aassist',
                         'icon':'icon-icon-announce'
                    }, {
                        'title': '其他',
                        'key': 'assist',
                        'type': 'assist',
                        'form':'other',
                         'icon':'icon-more-horizontal'
                    }
                ],
                showPersonal:false,
                showTipsText:'',
                token:''
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
            publish(item){
                console.log(item);
                this.token=window.localStorage.getItem('TOKEN');
                this.$router.push({
                    path: item.type,
                    query: {
                        'token': this.token,
                        'title': item.text,
                        'type': item.type,
                        'form': item.form,
                    }
                });
            },
            showPersonalInf(){
                this.showPersonal=!this.showPersonal;
            },
            goPersonalCenter(){
                this.token=window.localStorage.getItem('TOKEN');
                if(!this.token){
                    alert('请先登入..')
                    // this.showTipsText='请先登入...';
                    return
                }
                this.showPersonal=!this.showPersonal;
                this.$router.push({
                    path: 'mine',
                    query: {
                        'token': this.token,
                        'title': '个人中心',
                    }
                });
            },
            login(){
                this.showPersonal=!this.showPersonal;
                this.$router.push({
                    path: 'login',
                    query: {
                        'title': '登陆',
                    }
                });
            },
            register(){
                this.showPersonal=!this.showPersonal;
                this.$router.push({
                    path: 'register',
                    query: {
                        'title': '注册',
                    }
                });
            },
            offer(){
                this.$router.push({
                    path: 'seekHelpList',
                    query: {
                        'title': '求助列表',
                    }
                });
            },
            toMessage(){
                alert('消息列表')
            }
		},
        created(){
            let _this=this;
            $('body').on('click',function (e) {
                if(e.target.className.indexOf('icon-user')===-1&&_this.showPersonal){
                    _this.showPersonal=false;
                }
            })
        }
	}
</script>

<style>
    #index{
        background: #efefef;
        overflow: hidden;
    }
    .header{
        height: 44px;
        font-size: 14px;
        /*padding: 0 .4rem;*/
        overflow: hidden;
    }
    .header > div{
        /*line-height: 44px;*/
        color: #bfbfbf;
    }
    .location > div {
        float: left;
    }
    .header .location .name{
        line-height: 44px;
        color: #333;
        /*margin-left: .2rem*/
    }
    .icon-map-location::before{
        font-size: 26px;
        line-height: 44px;
    }
    .header .left{
        float: left;
    }
    .header .right{
        float: right;
        display: flex;
       /*width: 50%*/
    }
    .icon-Document_im{
        width: .76rem;
    }
    .icon-Document_im::after{
        width: .1rem;
        height: .1rem;
        background: red;
        border-radius: 50%;
    }
    .icon-Document_im::before{
        color: #bfbfbf;
        font-size: 32px;
        line-height: 44px;
    }
    .sos{
        line-height: 44px;
    }
    .sos i{
        padding: 1px;
        font-weight: 500;
        border: 1px solid #bfbfbf;
        border-radius: 50%;
        display: inline-block;
        height: .5rem;
        width: .5rem;
        line-height: .5rem;
    }
    .icon-user::before{
        /*color: #bfbfbf;*/
        font-size: 26px;
        line-height: 44px;
    }
    .icon-map-location{
        width: 0.88rem;
    }
    .icon-user{
        position: relative;
        font-size:20px;
        color:#9f9f9f;
        margin-left: .2rem;
        width: .88rem;
    }
    .login_yes{
        color:#9f9f9f;
    }
    .login_no{
        color:#007aff!important;
    }
    .user_wrap{
        position: absolute;
        z-index: 11;
        right: .12rem;
        top: 50px;
        font-size: 14px;
        color: #333!important;
        display: flex;
        flex-direction: column;
        background: rgba(255,255,255,0.9);
        border-radius: 4px;
    }
    .user_wrap::after{
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            right: 8px;
            background: rgba(255,255,255,0.8);
            border-color: #89a8e0 #89a8e0 transparent transparent;
            -webkit-border-radius: 3px;
            border-radius: 3px;
        position: absolute;
        top: -5px;
        content: '';
        height: 10px;
        width: 10px;
        /*border: 1px solid;*/
    }
    .user_wrap > span{
        display: inline-block;
        height: 36px;
        padding: 0 .3rem;
        line-height: 36px;
        box-sizing: border-box;
        border-bottom: 1px solid #e6e6e6;
    }
    .user_wrap > span:last-child{
        border: none;
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
         padding: 0 .06rem;
         font-size: 12px;
     }
     .mainmenu li{
        float:left;
        margin-left: .4rem;
        margin-top: 2.5%;
        width: 1rem;
        border-radius:3px;
        overflow:hidden;
    }

     .mainmenu li a{ display:block;  color:#FFF;   text-align:center;text-decoration:none}
     .mainmenu li a b{
        display:block;
        border-radius: 50%;
        height:1rem;
        font-size: 28px;
        line-height: 1rem;
    }
     .mainmenu li a img{
        margin: 15px auto 15px;
    }

     .mainmenu li a span{ display:block; height:30px; line-height:30px;background-color:#FFF; color: #999; font-size:12px; }

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
         padding:0 .6rem 16px;
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
         text-align: left;
     }
     .rank ul li:last-child{
         margin: 0;
         /*margin: 0 1.02rem;*/
     }
     .school_star{
         margin-bottom: 46px;
     }
     .buttom_action{
         position: fixed;
         bottom: -1px;
         left: 0;
         right: 0;
         background:rgba(250,250,250,0.9);
         box-shadow:0px 1px 0px 0px rgba(178,178,178,1);
     }
     .buttom_action ul{
         height: 24px;
         padding: 10px 0;
     }
     .buttom_action ul li{
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
</style>
