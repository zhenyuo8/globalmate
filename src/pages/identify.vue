<style scoped>
  #identify{
      font-size: 14px;
  }
  .identify_body{
      width: 84%;
      margin: 10px auto;
      display: flex;
  }
  .identify_body>div{
      background: #fff;
      border-radius: 4px;
      /*padding: 10px 0;*/
      flex: 1;
      height: 80px;
      border: 1px solid #00adff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      position: relative;
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

</style>

<template>

<div class="identify" id="identify">
    <div class="identify_type">
        <h3>请选择认证方式</h3>
        <div class="identify_type_select">
            <span class="icon-checkbox select_class" @click='selectType($event)' :key=''>身份证</span>
            <span class="icon-checkbox" @click='selectType($event)' :key=''>学生证</span>
            <span class="icon-checkbox" @click='selectType($event)' :key=''>护照</span>
        </div>
    </div>
    <div class="identify_warp">
        <div class="">
            <div class="identify_body">
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
            <p>身份证</p>
        </div>
        <div class="line_separeat">
        </div>
        <div class="">
            <div class="identify_body">
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
            <p>学生证</p>
        </div>
        <div class="line_separeat">

        </div>
        <div class="">
            <div class="identify_body">
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
            <p>护照</p>
        </div>
        <div class="line_separeat">

        </div>

    </div>

    <button type="button" name="button" class='submitbtn'>提交</button>
</div>

</template>

<script>
import CONFIG from '../config/config'
export default {
    'name': 'mine',
    data() {
        return {
            title:'',
            identifyType:[]
        }
    },
    components: {

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

        selectType(e){
            if($(e.target).hasClass('select_class')){
                 $(e.target).removeClass('select_class')
            }else{
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
                        _this.previewImage(files[i],function(imgsrc){
                            let imgEle=document.createElement('img');
                            imgEle.src=imgsrc;
                            $('#'+id).find('img').attr('src',imgsrc);
                            $('#'+id).find('img').css('display','inline-block');
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
               _this.headerImgae=ossMap.host+'/'+_this.multipart_params.key;
           });
           this.fileUploader.init();
        },

    },
    activated(){

    },
    watch:{
        'title':function (val,old) {
            document.title=val
        }
    },
    created(){
        this.loadData();
        setTimeout(()=>{
			// this.initUploader()
		},500)
        this.title=this.$route.query.title;
    }
}

</script>
