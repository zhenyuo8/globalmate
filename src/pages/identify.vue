<style scoped>
  #identify{
      font-size: 14px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
  }
  .identify_body{
      width: 84%;
      margin: 10px auto;
      display: flex;
  }
  .identify_body>div{
      background: #fff;
      border-radius: 4px;
      flex: 1;
      height: 98px;
      border: 1px solid #00adff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      position: relative;
  }
  .identify_warp{
      margin-bottom: 36px;
  }
  .identify_body>div:first-child{
      margin-right: 10px;
  }
  .icon-drivers-license-o{
      font-size: 86px;
      display: inherit;
  }
  .identify_type{
      background: #fff;
      margin-bottom: 10px;
  }
  .identify_type h3{
      font-size: 16px;
      width: 90%;
      margin: auto;
      padding: 15px 0;
      border-bottom: 1px solid #eee;
  }
  .identify_type_select{
      padding: 15px 0;
      width: 90%;
      margin: auto;
      display: flex;
      border-bottom: 1px solid #eee;
  }
  .identify_type_select span {
      font-size: 14px;
      color: #999;
      flex: 1;
  }
  .identify_type_select .icon-checkbox::before{
      margin-right: .2rem;
  }
  .line_separeat{
      border-bottom: 1px dotted #00adff;
      width: 84%;
      margin: auto;
      margin-bottom: 15px;
  }
  .select_class{
      color: #00adff!important;
  }
  #identify .submitbtn{
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      height: 36px;
      font-size: 16px;
      text-align: center;
      width: 100%;
      background: #0095ff;
      color: #fff;
  }
  .identify_face_page, .identify_opposite_page{
      position: relative;
  }
  .identify_face_page img, .identify_opposite_page img{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 11;
      display: none;
      border-radius: 4px;
  }
  .icon-camera2{
      width: 36px;
      margin: auto;
      height: 36px;
      background: #00adff;
      border-radius: 50%;
  }
  .icon-camera2::before{
      font-size: 22px;
      line-height: 36px;
      color: #fff;
  }
  .icon-tips{
      font-size: 12px;
      color: #00adff;
      margin-top: 4px;
      width: 100%;
  }
  p{
      margin-bottom: 10px;
  }
  .gl_totast_p{
      color: red;
      text-align: left;
      font-size: 12px;
      padding: 10px .4rem;
      background: aliceblue
  }

</style>

<template>

<div class="identify" id="identify">
    <div class="identify_type">
        <h3>{{$t('personaPage.selectidentify')}}</h3>
        <div class="identify_type_select">
            <span class="icon-checkbox select_class" @click="selectType($event,'IDCARD')" :key=''>{{$t('personaPage.idcard')}}</span>
            <span class="icon-checkbox" @click="selectType($event,'STUDENTID')" :key=''>{{$t('personaPage.studentcard')}}</span>
            <span class="icon-checkbox" @click="selectType($event,'PASSPORT')" :key=''>{{$t('personaPage.passport')}}</span>
            <!-- <span class="icon-checkbox" @click="selectType($event,'ALIPAYID')" :key=''>支付宝</span> -->
        </div>
    </div>
    <p class="gl_totast_p" v-show="identifyType.length==0">{{$t('personaPage.lessType')}}</p>
    <div class="identify_warp">
        <div class="" v-show="showIDCARD">
            <div class="identify_body IDCARD">
                <div class="identify_face_page" id='id_face' @click="uploaderInit('id_face')">
                    <img src="" alt="">
                    <div class="" style="margin:auto">
                        <span class="icon-camera2"></span>
                        <span class="icon-tips">点击拍照/上传人像面</span>
                    </div>
                </div>
                <div class="identify_opposite_page" id='id_opposite' @click="uploaderInit('id_opposite')">
                    <img src="" alt="">
                    <div class="" style="margin:auto">
                       <span class="icon-camera2"></span>
                       <span class="icon-tips">点击拍照/上传国徽面</span>
                    </div>
                </div>
            </div>
            <p>{{$t('personaPage.idcard')}}</p>
        </div>
        <div class="line_separeat" v-show="showIDCARD">
        </div>
        <div class="" v-show="showSTUDENTID">
            <div class="identify_body STUDENTID">
                <div class="identify_face_page" id='id_student' @click="uploaderInit('id_student')">
                    <img src="" alt="">
                    <div class="" style="margin:auto">
                        <span class="icon-camera2"></span>
                        <span class="icon-tips">点击拍照/上传人像面</span>
                    </div>
                </div>
                <div class="identify_opposite_page" id='id_student_opposite' @click="uploaderInit('id_student_opposite')">
                    <img src="" alt="">
                    <div class="" style="margin:auto">
                       <span class="icon-camera2"></span>
                       <span class="icon-tips">点击拍照/上传文字面</span>
                    </div>
                </div>
            </div>
            <p>{{$t('personaPage.studentcard')}}</p>
        </div>
        <div class="line_separeat" v-show="showSTUDENTID">

        </div>
        <div class="" v-show="showPASSPORT">
            <div class="identify_body PASSPORT">
                <div class="identify_face_page" id='id_passport' @click="uploaderInit('id_passport')">
                    <img src="" alt="">
                    <div class="" style="margin:auto">
                       <span class="icon-camera2"></span>
                       <span class="icon-tips">点击拍照/上传第一页</span>
                    </div>

                </div>
                <div class="identify_opposite_page" id='iid_passport_opposite' @click="uploaderInit('id_passport_opposite')">
                    <img src="" alt="">
                    <div class="" style="margin:auto">
                       <span class="icon-camera2"></span>
                       <span class="icon-tips">点击拍照/上传第二页</span>
                    </div>

                </div>
            </div>
            <p>{{$t('personaPage.passport')}}</p>
        </div>
        <div class="line_separeat" v-show="showPASSPORT">

        </div>
    </div>
    <button type="button" name="button" class='submitbtn' @click='submitData' >{{$t('button.submit')}}</button>
    <tips :showTipsText='showTipsText' v-if="showTipsText"></tips>
</div>

</template>

<script>
import CONFIG from '../config/config'
import tips from '../components/tips.vue'
export default {
    'name': 'mine',
    data() {
        return {
            title:'',
            identifyType:['IDCARD'],
            onloadYet:false,
            showIDCARD:true,
            showSTUDENTID:false,
            showPASSPORT:false,
            showTipsText:''
        }
    },
    components: {
        tips
    },
    computed:{

    },
    methods: {

        clickCallBack(item) {


        },
        goEditMineInfo(){

        },
        loadData(){

        },

        selectType(e,type){
            let _this=this;
            if($(e.target).hasClass('select_class')){
                this.identifyType=this.identifyType.filter((item,index)=>{
                    return item!=type;
                });
                this['show'+type]=false;
                 $(e.target).removeClass('select_class')
            }else{
                this['show'+type]=true;
                this.identifyType.push(type);
                 $(e.target).addClass('select_class')
            }
        },

        uploaderInit(id){
            this.initUploader(id)
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
		initUploader(id){
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
                browse_button : id, //触发文件选择对话框的按钮，为那个元素id
                url : 'http://ncc-ys-prod-oss-xingjjc.oss-cn-beijing.aliyuncs.com/', //服务器端的上传页面地址
                flash_swf_url : '../libs/plupload/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
                silverlight_xap_url : '../libs/plupload/Moxie.xap' //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
            });
            this.fileUploader.bind('FilesAdded',function(uploader,files){
        		 for(var i=0,len=files.length;i<len;i++){
                    var file_name=files[i].name;
                    !function(i){
                        // _this.previewImage(files[i],function(imgsrc){
                        //     let imgEle=document.createElement('img');
                        //     imgEle.src=imgsrc;
                        //
                        // });
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
               _this.headerImgae=ossMap.host+'/'+_this.multipart_params.key;
               $('#'+id).find('img').attr('src',_this.headerImgae);
               $('#'+id).find('img').attr('data-src',_this.headerImgae);
               $('#'+id).find('img').css('display','inline-block');
           });
           this.fileUploader.init();
        },
        submitData(){
            this.apiHost=CONFIG[__ENV__].apiHost;
            let postData=[];
            if(this.identifyType.length==0){
                this.showTipsText='请至少选择一种认证方式！谢谢...';
                setTimeout(()=>{
                    this.showTipsText='';
                },1500);
                return;
            }
            for(var i=0;i<this.identifyType.length;i++){
                var obj={
                    'cetifyType':'',
                    'certifyPhoto':[],
                }
                obj.cetifyType=this.identifyType[i];
                let img=$('.'+this.identifyType[i]).find('img');
                if(img.length!==0){
                    for(var j=0;j<img.length;j++){
                        if(!img[j].getAttribute('data-src')){
                            this.showTipsText='请确认已选认证方式图片是否上传!';
                            setTimeout(()=>{
                                this.showTipsText='';
                            },2000);
                            return
                        }
                        obj.certifyPhoto.push(img[j].src);
                    }
                }
                postData.push(obj);
            }
            if(postData.length==1){
                this.axios.post(this.apiHost+'/globalmate/rest/certify/add'+'?token='+this.$route.query.token,postData[0]).then((res)=>{
                    if(res.data.success){
                        this.showTipsText='感谢您的配合，我们会尽快审核你的认证信息!';
                        window.localStorage.setItem('IDENTIFY_YET_glohelp','true');
                        setTimeout(()=>{
                           this.showTipsText='';
                            window.history.go(-1);
                        },1500);
                    }else{
                        this.showTipsText=e.msg||"";
                     }
                }).catch((e)=>{
                    console.log(e);
                });
            }else{
                console.log(postData);
                this.axios.post(this.apiHost+'/globalmate/rest/certify/addList'+'?token='+this.$route.query.token,postData).then((res)=>{
                    if(res.data.success){
                        this.showTipsText='感谢您的配合，我们会尽快审核你的认证信息!';
                        window.localStorage.setItem('IDENTIFY_YET_glohelp','true');
                        setTimeout(()=>{
                           this.showTipsText='';
                            window.history.go(-1);
                        },1500);
                    }else{
                        this.showTipsText=e.msg||"";
                     }
                }).catch((e)=>{
                    console.log(e);
                });
            }

        }

    },
    activated(){

    },
    watch:{
        'title':function (val,old) {
            document.title=val
        }
    },
    created(){
        setTimeout(()=>{
            this.onloadYet=true;
        },1000);
        this.loadData();
        this.title=this.$route.query.title;
    }
}

</script>
