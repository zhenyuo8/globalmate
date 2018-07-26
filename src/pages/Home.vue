<style scoped>
.header{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background: #fff;
    z-index: 11;
    height: 33px;
}
.home_image {
    height: 186px;
    width: 100%;
    /*margin-top: 33px;*/
}

.home_image img {
    width: 100%;
    height: 100%;
    display: inline-block;
}

.nav,
.nav_sec {
    position: relative;
    display: flex;
    font-size: 14px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #F1F1F1;
    color: #4A4A4A;
}

.nav > div,
.nav_sec > div {
    flex: 1;
    border-left: 1px solid #f1f1f1;
}

.nav_item:first-child {
    border: none;
}

</style>

<template>

<div class="home" id='home'>
    <!-- <div class="header">
        <Header :hearderParas='hearderParas'></Header>
    </div> -->
    <div class="home_image">
        <img src="../assets/images/home.jpg" alt="">
    </div>
    <!-- <div class="nav">
        <div class="nav_item" v-for="item in navData" @click='navRoute(item)'>
            {{item.text}}
        </div>
    </div>
    <div class="nav_sec">
        <div class="nav_item" v-for="item in navSecData" @click='navRoute(item)'>
            {{item.text}}
        </div>
    </div> -->
    <div class="">
        <button type="button" name="button"  id='browse'>选择文件</button>
    </div>
    <tips :showTipsText='showTipsText'></tips>
</div>

</template>

<script>

import Header from '../components/header.vue'
import tips from '../components/tips.vue'
export default {
    data() {
        return {
            hearderParas: {
                title: 'GM公众号',
                right: {
                    text: '',
                    icon: '../assets/logo.png'
                }
            },
            navData: [{
                'text': '帮代',
                'type': 'assist',
                'form':'assist'
            },{
                'text': '帮带',
                'type': 'assist',
                'form':'carryAssist'
            }, {
                'text': '陪伴',
                'type': 'assist',
                'form':'accompany'
            }, {
                'text': '其他',
                'type': 'assist',
                'form':'other'
            }],
            navSecData: [{
                'text': '个人中心',
                'type': 'mine'
            }, {
                'text': '我的求助',
                'type': 'myAssist'
            }, {
                'text': '平台反馈',
                'type': 'other'
            },{
                'text': '注册',
                'type': 'register'
            },{
                'text': '登入',
                'type': 'login'
            }],
            showTipsText:''
        }
    },
    components: {
        Header,tips
    },
     methods: {
         navRoute(item) {
             if(item.type==='register'){
                 this.$router.push({
                     path: item.type,
                     query: {
                         'title': item.text,
                         'type': item.type,
                     }
                 });

                //  this.axios.post('http://10.4.111.31:9090/globalmate/rest/user/add',{
                //      name:'zhenyuo8',
                //      nikename:'zhenyuo8',
                //      password:'123456qwe',
                //      email:'',
                //      phone:'18470186126',
                //      idNumber:'',
                //      pic:'',
                //      school:'',
                //      where:'',
                //      hobby:'',
                //  }).then((res)=>{
                //      console.log(res);
                //  }).catch((e)=>{
                //      console.log(e);
                //  })
             }else if(item.type==='login'){
                  this.$router.push({
                      path: item.type,
                      query: {
                          'title': item.text,
                          'type': item.type,
                      }
                  });

                //  this.axios.get('http://10.4.111.31:9090/globalmate/rest/user/login'+'/18470186126/123456qwe',{
                 //
                //  }).then((res)=>{
                //      this.token=res.data.data;
                //      console.log(res.data.data);
                //      console.log(res);
                //  }).catch((e)=>{
                //      console.log(e);
                //  })
             }else {
                 this.token=window.localStorage.getItem('TOKEN');
                 if(!this.token){
                     this.showTipsText='请选登入...';
                 }else{
                    this.$router.push({
                        path: item.type,
                        query: {
                            'token': this.token,
                            'title': item.text,
                            'type': item.type,
                            'form': item.form,
                        }
                    });
                 }
             }
         }
     },
     created(){
         setTimeout(()=>{
             var uploader = new plupload.Uploader({
                browse_button : 'browse', //触发文件选择对话框的按钮，为那个元素id
                url : 'https://oss.aliyuncs.com', //服务器端的上传页面地址
                flash_swf_url : '../libs/plupload/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
                max_file_size: '2mb',//限制为2MB
                silverlight_xap_url : '../libs/plupload/Moxie.xap' //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
            });
            uploader.init();
         },500)
     }
 }
</script>
