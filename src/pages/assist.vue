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

<div class="assist" @click='removeFile($event)'>
    <div class="body">
        <div class="main_view">
            <div class="main_view_repeat" v-for="item in listRepeat">
                <List :itemRepeat='item' :clickCallBack='clickCallBack'></List>
            </div>
        </div>
        <div class="main_style">
            <List :itemRepeat='payStyle' :clickCallBack='clickCallBack' v-if="payStyle"></List>
            <List :itemRepeat='myReward' :clickCallBack='clickCallBack'></List>
            <!-- <div class="add_label_container" @click=''>
                <span>添加标签</span>
            </div>
            <div class="add_content_container">
                <span class="add_content_title">添加内容</span>
                <span class="add_cotent_icon">+</span>
            </div> -->
        </div>
        <div class="main_decription">
            <div class="main_decription_title">
                <List :itemRepeat='title' :clickCallBack='clickCallBack'></List>
            </div>
            <div class="main_decription_area">
                <textarea name="name" placeholder='描述一下求助细节 时间 航班 人数 地点 偏好的景点等等' style='width:100%'></textarea>
            </div>
            <div class="main_decription_uploader" >
                <div class="hide_space">

                </div>
                <div class="main_decription_uploader_container" >
                    <span class="icon-add" id='uploader'></span>
                    <!-- <input type="file" name="" value="+" @change="uploadImg($event)"> -->
                </div>
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
import CONFIG from '../config/config'

import { Toast} from 'mint-ui';
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
            filesHasUpload:[]
        }

    },
    components: {
        List,selectList,Toast
    },
    methods:{
        // 点击发布按钮逻辑
        publish(){
           let postData=this.getListData();
           switch (this.key) {
               case 'buy':
                   this.submitUrl='/globalmate/rest/need/buy/add';
                   break;
               case 'accompany':
                    this.submitUrl='/globalmate/rest/need/accompany/add';
                    break;
               case 'carryAssist':
                    this.submitUrl='/globalmate/rest/need/carry/add';
                    break;
               case 'learnco':
                    this.submitUrl='/globalmate/rest/need/learnco/add';
                    break;
               case 'other':
                    this.submitUrl='/globalmate/rest/need/carry/add';
                    break;
               default:
                    this.submitUrl='/globalmate/rest/need/other/add';
                    break;
           }
           this.apiHost=CONFIG[__ENV__].apiHost;
           this.axios.post(this.apiHost+this.submitUrl+'?token='+this.$route.query.token,postData).then((res)=>{
               if(res.data.success){
                   window.history.go(-1);
               }else{
                   alert('请确认后再提交')
               }

           }).catch((e)=>{
               console.log(e);
           });
        },
        clickCallBack(item,e) {
            let _this=this;
            if(!item.type){
                if(item.key==='date'){
                    console.log(item)
                  if(item.componentKey==='endTime'){
                    if(!this.calendar1){
                      this.calendar1 = new datePicker();
                      this.calendar1.init({
                        'trigger': '#'+item.componentKey, /*按钮选择器，用于触发弹出插件*/
                        'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                        'minDate':'1900-1-1',/*最小日期*/
                        'maxDate':'2100-12-31',/*最大日期*/
                        'onSubmit':function(){/*确认时触发事件*/
                          var theSelectData=this.value;
                          _this.selectCallBack(theSelectData,item);
                        },
                        'onClose':function(){/*取消时触发事件*/
                        }
                      })
                    }
                  }else{
                    if(!this.calendar){
                      this.calendar = new datePicker();
                      this.calendar.init({
                        'trigger': '#'+item.componentKey, /*按钮选择器，用于触发弹出插件*/
                        'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                        'minDate':'1900-1-1',/*最小日期*/
                        'maxDate':'2100-12-31',/*最大日期*/
                        'onSubmit':function(){/*确认时触发事件*/
                          var theSelectData=this.value;
                          _this.selectCallBack(theSelectData,item);
                        },
                        'onClose':function(){/*取消时触发事件*/
                        }
                      })
                    }
                  }


                }else{
                   this.show=true;
                   this.selectItem=item;
                }

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
                        if(item.key==='date'){
                            if(item.key===selectItem.key&&item.componentKey===selectItem.componentKey){
                                item.text=value;
                                item.isPlacehold=false;
                            }
                        }else{
                            if(item.key===selectItem.key){
                                item.text=value;
                                item.isPlacehold=false;
                            }
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
            if(this.filesHasUpload.length!==0){
                postData['pic']=this.filesHasUpload.join(';')
            }
            return postData;
        },
        // 发布页面显示字段根据form显示不同字段
        listRepeatProcess(){
            let form=this.$route.query.form;
            switch (form) {
                case 'assist':
                    this.listRepeat=[{
                        title: '方式',
                        text: this.$route.query.title,
                        arrow: true,
                        key:'style',
                        isRequire:false,
                        isPlacehold:false,
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
                        text: this.$route.query.title,
                        arrow: true,
                        key:'style',
                        isRequire:false,
                        isPlacehold:false,
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
                    },{
                        title: '开始时间',
                        text: '请选择',
                        arrow: true,
                        key:'date',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'startTime'
                    },{
                        title: '结束时间',
                        text: '请选择',
                        arrow: true,
                        key:'date',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'endTime'
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
                        text: this.$route.query.title,
                        arrow: true,
                        key:'style',
                        isRequire:false,
                        isPlacehold:false,
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
                        title: '到达时间',
                        text: '请选择',
                        arrow: true,
                        key:'date',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'arrive'
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
                    },{
                        title: '日期',
                        text: '请选择',
                        arrow: true,
                        key:'date',
                        isRequire:false,
                        isPlacehold:true,
                        componentKey:'date'
                    }];
                    this.payStyle=false;
                    break;
            }
        },
        removeFile(e){
            if(e.target.className==='prev_imgae'){
                $(e.target.parentNode).remove();
                this.filesHasUpload.splice($(e.target.parentNode).index(),1);
            }
        },
        previewImage(file,callback){
            if(!file || !/image\//.test(file.type)) return;
        if(file.type=='image/gif'){
            var fr = new mOxie.FileReader();
            fr.onload = function(){
                callback(fr.result);
                fr.destroy();
                fr = null;
            }
            fr.readAsDataURL(file.getSource());
        }else{
            var preloader = new mOxie.Image();
            preloader.onload = function() {
                preloader.downsize( 100, 100 );
                var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL();
                callback && callback(imgsrc);
                preloader.destroy();
                preloader = null;
            };
            preloader.load( file.getSource() );
        }
        },
        initUploader(){
            let _this=this;
            this.apiHost=CONFIG[__ENV__].apiHost;
            let ossMap={};
            this.filesHasUpload=[];
            this.multipart_params={
                'key':'',
                'policy':'',
                'OSSAccessKeyId':'',
                'success_action_status':'',
                'signature':''
            }
            this.axios.get(this.apiHost+'/globalmate/rest/file/ossPolicy'+'?token='+this.$route.query.token,'').then(res=>{
                if(res.data.success){
                    ossMap.accessid=res.data.data.accessid;
                    ossMap.policy=res.data.data.policy;
                    ossMap.signature=res.data.data.signature;
                    ossMap.key=res.data.data.dir;
                    ossMap.host=res.data.data.host;
                    ossMap.success_action_status=200;
                }
            }).catch(e=>{

            })
            this.fileUploader=new plupload.Uploader({
                runtimes : 'html5,flash,silverlight,html4',
                browse_button : 'uploader', //触发文件选择对话框的按钮，为那个元素id
                url : 'http://ncc-ys-prod-oss-xingjjc.oss-cn-beijing.aliyuncs.com/', //服务器端的上传页面地址
                flash_swf_url : '../libs/plupload/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
                silverlight_xap_url : '../libs/plupload/Moxie.xap' //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
            });
            this.fileUploader.bind('FilesAdded',function(uploader,files){
        		 for(var i=0,len=files.length;i<len;i++){
                    var file_name=files[i].name;
                    !function(i){
                        _this.previewImage(files[i],function(imgsrc){
                            let con=$('<div class="main_decription_uploader_container_img" ><img class="prev_imgae" src="'+imgsrc+'"/></div>');
                            $('.hide_space').append(con);
                        });
                    }(i);
                }
                _this.fileUploader.start();
	       });
           this.fileUploader.bind('BeforeUpload',function(up,file){
               file.name=new Date().getTime()+'_'+file.name;
               _this.multipart_params={
                   'key':ossMap.key+'_'+file.name,
                   'policy':ossMap.policy,
                   'OSSAccessKeyId':ossMap.accessid,
                   'success_action_status':'200',
                   'signature':ossMap.signature
               }
               up.setOption({
                   'url':ossMap.host,
                   'multipart_params':_this.multipart_params,
               })
           });
           this.fileUploader.bind('FileUploaded',function(up,file,info){
               _this.filesHasUpload.push(ossMap.host+'/'+_this.multipart_params.key);
           });
           this.fileUploader.init();
        },

    },
    activated(){
        this.show=false;
        document.title=this.$route.query.title;
        this.listRepeatProcess();
    },
    computed:{
        form: function() {
            return this.$route.query.form || "";
        },
        key: function() {
            return this.$route.query.key || "";
        },
    },
    watch:{
        'form':function (newvalue,old) {
            if(newvalue&&old){
                this.listRepeatProcess();
            }
        },
        'key':function (newvalue,old) {
            if(newvalue&&old){
                this.type=this.$route.query.newvalue;
            }
        }
    },
    created(){
        this.listRepeatProcess();
        setTimeout(()=>{
           this.initUploader();
       },1000);
    }
}

</script>
