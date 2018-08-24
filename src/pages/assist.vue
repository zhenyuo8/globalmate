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
       overflow: scroll;
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
            <List :itemRepeat='myReward' :clickCallBack='clickCallBack'></List>
        </div>
        <div class="main_decription">
            <div class="main_decription_title">
                <List :itemRepeat='title' :clickCallBack='clickCallBack'></List>
            </div>
            <div class="main_decription_area">
                <textarea name="name" :placeholder="$t('formTitle.descriptionTips')" style='width:100%'></textarea>
            </div>
            <div class="main_decription_uploader" >
                <div class="hide_space">

                </div>
                <div class="main_decription_uploader_container" >
                    <span class="icon-add" id='uploader'></span>
                </div>
            </div>
        </div>
    </div>
    <div class="assist_bottom" @click='publish' v-show="!isEditType">
        {{$t('button.publish')}}
    </div>
    <div class="assist_bottom" @click='publish' v-show="isEditType">
        {{$t('button.submit')}}
    </div>
     <div class="defindloadig" v-if="loadingShow">
         <loading></loading>
     </div>
     <indexList :class="show?'list_show':'list_hide'" :selectItem='selectItem' :countrySityCallBack='countrySityCallBack' :listType='listType'></indexList>
     <mt-datetime-picker
        ref="picker"
        type="date"
        :startDate="startDate"
        :endDate="endDate"
        :cancelText="$t('button.cancel')"
        :confirmText="$t('button.confirm')"
        @confirm="handleConfirm"
        v-model="pickerValue">
      </mt-datetime-picker>
</div>

</template>

<script>

import List from '../components/list.vue'
import selectList from '../components/selectList.vue'
import indexList from '../components/indexList.vue'
let pinyin=require('pinyin')
import CONFIG from '../config/config'
import loading from '../components/loading.vue'
import { Toast,DatetimePicker } from 'mint-ui';
export default {
    'name': 'assist',
    data() {
        return {
            listRepeat: [],
            myReward: {
                title: this.$t('formTitle.reward'),
                text: this.$t('formTitle.inputPlace'),
                type: 'input',
                arrow: false,
                key:'reward',
                isRequire:false,
                isPlacehold:true,
                componentKey:'rewardAmount'
            },
            title: {
                title: this.$t('formTitle.head'),
                text: this.$t('formTitle.headerTips'),
                type: 'input',
                arrow: false,
                key:'title',
                isRequire:true,
                isPlacehold:true,
                componentKey:'title'
            },
            publishData:[],
            show:false,
            selectItem:[],
            filesHasUpload:[],
            formTitle:this.$route.query.title,
            listType:'',
            country:'',
            loadingShow:true,
            isEditType:false,
            startDate: new Date('1970/01/01'),
            endDate: new Date('2100/12/31'),
            pickerValue:this.moment(new Date).format('YYYY-MM-DD')
        }

    },
    components: {
        List,selectList,indexList,loading,DatetimePicker
    },
    methods:{
        openPicker(item) {
            this['datePick']=item;
            this.$refs.picker.open();
        },
        handleConfirm(value){
            value=this.moment(value).format('YYYY-MM-DD');
            this.selectCallBack(value,this['datePick'])
        },
        // 点击发布按钮逻辑
        publish(){
           let postData=this.getListData();
           switch (this.$route.query.key) {
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
               case 'carry':
                    this.submitUrl='/globalmate/rest/need/carry/add';
                    break;
               case 'other':
                    this.submitUrl='/globalmate/rest/need/other/add';
                    break;
               default:
                    this.submitUrl='/globalmate/rest/need/other/add';
                    break;
           }
           this.apiHost=CONFIG[__ENV__].apiHost;
           if(postData){
               this.loadingShow=true;
               this.axios.post(this.apiHost+this.submitUrl+'?token='+this.$route.query.token,postData).then((res)=>{
                   if(res.data.success){
                       setTimeout(()=>{
                           this.loadingShow=true;
                           window.history.go(-1);
                       },1500);
                   }else{
                       Toast({
         					message: '发布失败',
         					duration: 2000
       				   });
                   }
               }).catch((e)=>{
                   console.log(e);
               });
           }else{

           }

        },
        clickCallBack(item,e) {
            let _this=this;
            if(!item.type){
                if(item.key==='date'){
                    this.openPicker(item);
                }else{
                    this.getSelectItem(item.key)
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
        countrySityCallBack(items,value){
            this.show=false;
            this.selectItem=[];
            let _this=this;
            if(value){
                if(items=='country'){
                    this.country=value;
                    this.listRepeat.forEach(function (item,index) {
                        if(item.componentKey=='city'){
                            item.text=_this.$t('formTitle.selectPlace');
                            item.isPlacehold=true;
                        }else if(item.componentKey==items) {
                            item.text=value;
                            item.isPlacehold=false;
                        }
                    })
                }else{
                   this.listRepeat.forEach(function (item,index) {
                       if(item.componentKey==items){
                           item.text=value;
                           item.isPlacehold=false;
                       }
                   })
                }

            }
        },
        getSelectItem(key){
            let lang = navigator.language || 'zh-CN';
            let isEN = /^zh/.test(lang) ? false : /^en/.test(lang) ? true : /^es/.test(lang) ? true : true;
            this.apiHost=CONFIG[__ENV__].apiHost;
            let url='',_this=this,postData={};
            if(key=='city'&&this.country){
                url='/globalmate/rest/user/city';
                this.axios.get(this.apiHost+url+'?token='+this.$route.query.token+'&countryregion='+this.country+'&isEN='+isEN,{

                }).then(res=>{
                    if(res.data.success){
                        let result=res.data.data,resultArr=[];
                        if(this.country=='中国'||this.country=='China'){
                            resultArr=[this.$t('cityName.beijing'),this.$t('cityName.tianjin'),this.$t('cityName.shanghai'),this.$t('cityName.chongqing')];
                        }
                        result.forEach(function (item,index) {
                            resultArr.push(item.city);
                        });
                        _this.buildItem(resultArr,key);
                    }
                }).catch(e=>{
                    Toast({
                         message: e.msg,
                         duration: 2000
                    });
                })
            }else if(key=='country'){
                url='/globalmate/rest/user/country';
                this.axios.get(this.apiHost+url+'?token='+this.$route.query.token+'&isEN='+isEN,{
                    isEN:true
                }).then(res=>{
                    if(res.data.success){
                        _this.buildItem(res.data.data,key);
                    }
                }).catch(e=>{
                    Toast({
                         message: e.msg,
                         duration: 2000
                    });
                })
            }else{
                Toast({
                     message: '请先选择国家！',
                     duration: 2000
                });
            }

        },
        buildItem(data,key){
            let letter=this.buildLetter();
            let _this = this;
            for (let i = 0; i < 26; i++) {
              letter[i].citylist = []
            }
            for (let i = 0; i < data.length; i++) {
              let _index = Number(_this.getFirstLetter(data[i]).charCodeAt() - 65)
              if (_index >= 0 && _index < 26) {
                letter[_index].citylist.push(data[i])
              }
            }
            let showCity = letter.filter(function (value) {
              let len = value.citylist.length
              return len > 0
            });
            this.show=true;
            this.listType=key;
            this.selectItem=showCity;
            window.localStorage.setItem('LIST',JSON.stringify(this.selectItem))
        },
        buildLetter(){
            let letter = [];
            for (let i = 0; i < 26; i++) {
              let obj = {}
              obj.letter = String.fromCharCode((65 + i))
              obj.citylist = []
              letter.push(obj)
            }
            return letter;
        },
        getFirstLetter(str){
            return pinyin(str)[0][0].charAt(0).toUpperCase()
        },
        // 获取发布所需要的数据
        getListData(){
            let listRepeat=this.listRepeat;
            let postData={},hasParaRequired=false;
            for(var i=0;i<listRepeat.length;i++){
                if(listRepeat[i].isPlacehold&&listRepeat[i].isRequire){
                    postData[listRepeat[i].componentKey]='';
                    hasParaRequired=true;
                     Toast({
                          message: listRepeat[i].title+'为必填项',
                          duration: 2000
                     });
                    return false;
                }else if(!listRepeat[i].isPlacehold){
                    postData[listRepeat[i].componentKey]=listRepeat[i].text;
                }
            }
            if(!this.myReward.isPlacehold){
                 postData[this.myReward.componentKey]=this.myReward.text;
            }else{
                hasParaRequired=true;
            }
            if(!this.title.isPlacehold){
                 postData[this.title.componentKey]=this.title.text;

            }else{
                Toast({
                     message: this.title.title+'为必填项',
                     duration: 2000
                });
                return false;
            }
            if(this.$el.querySelector('.main_decription_area textarea')){
                postData['descrition']=this.$el.querySelector('.main_decription_area textarea').value;
            }
            if(this.filesHasUpload.length!==0){
                postData['pic']=this.filesHasUpload.join(';')
            }
            return postData;
        },
        // 发布页面显示字段根据form显示不同字段
        listRepeatProcess(){
            let form=this.$route.query.form;
            this.myReward={
                title: this.$t('formTitle.reward'),
                text: this.$t('formTitle.inputPlace'),
                type: 'input',
                arrow: false,
                key:'reward',
                isRequire:false,
                isPlacehold:true,
                componentKey:'rewardAmount'
            };
            this.title={
                title: this.$t('formTitle.head'),
                text: this.$t('formTitle.headerTips'),
                type: 'input',
                arrow: false,
                key:'title',
                isRequire:true,
                isPlacehold:true,
                componentKey:'title'
            }
            this.listRepeat=[{
                title: this.$t('formTitle.type'),
                text: this.$route.query.title,
                arrow: false,
                key:'style',
                isRequire:false,
                isPlacehold:false,
                componentKey:'businessType'
            },{
                title: this.$t('formTitle.starttime'),
                text: this.$t('formTitle.selectPlace'),
                arrow: true,
                key:'date',
                isRequire:true,
                isPlacehold:true,
                componentKey:'startTime'
            },{
                title: this.$t('formTitle.endtime'),
                text: this.$t('formTitle.selectPlace'),
                arrow: true,
                key:'date',
                isRequire:true,
                isPlacehold:true,
                componentKey:'endTime'
            }, {
                title: this.$t('formTitle.country'),
                text: this.$t('formTitle.selectPlace'),
                arrow: true,
                key:'country',
                isRequire:true,
                isPlacehold:true,
                componentKey:'country'
            },{
                title: this.$t('formTitle.city'),
                text: this.$t('formTitle.selectPlace'),
                arrow: true,
                key:'city',
                isRequire:true,
                isPlacehold:true,
                componentKey:'city'
            }];
        },
        //获取编辑表单数据
        loadDataEdit(id){
            let _this=this;
            this.apiHost=CONFIG[__ENV__].apiHost;
            this.listRepeat=[];
            this.axios.get(this.apiHost+'/globalmate/rest/need/list/'+id+'?token='+this.$route.query.token+'&onlyCurrentUser=true',{
                onlyCurrentUser:true
            }).then((res)=>{
                if(res.data.success){
                    let data=res.data.data;

                    this.listRepeatProcess();
                    this.myReward.text=data.conceretNeed.rewardAmount;
                    this.title.text=data.conceretNeed.title;
                    this.listRepeat.forEach(function (item,index) {
                        if(item.componentKey=='country'&&data.conceretNeed.country){
                            item.text=data.conceretNeed.country;
                            _this.country=data.conceretNeed.country;
                        }
                        if(item.componentKey=='city'&&data.conceretNeed.city){
                            item.text=data.conceretNeed.city;
                        }
                        if(item.componentKey=='startTime'&&data.conceretNeed.startTime){
                            item.text=_this.moment(data.conceretNeed.startTime).format('YYYY-MM-DD');
                        }
                        if(item.componentKey=='endTime'&&data.conceretNeed.endTime){
                            item.text=_this.moment(data.conceretNeed.endTime).format('YYYY-MM-DD');
                        }
                        if(data.conceretNeed.description){
                            _this.$el.querySelector('.main_decription_area textarea').value=data.conceretNeed.description;
                        }
                    })
                }else{

                }
            }).catch((e)=>{
                console.log(e);
            })
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
        // this.formTitle='请描述'+this.$route.query.title+'细节！';
        document.title=this.$route.query.title;
        $('.repeat_content input').val('');
        $('.main_decription_area textarea').val('');
        if(this.$route.query.mode&&this.$route.query.mode=='MODIFY'){
            this.isEditType=true;
            this.loadDataEdit(this.$route.query.id);
        }else{
             this.listRepeatProcess();
        }
        setTimeout(()=>{
            this.loadingShow=false;
        },500)
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
