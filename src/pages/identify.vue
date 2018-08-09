<style scoped>
  #identify{
      font-size: 14px;
      width: 6.7rem;
      height: 13.34rem;
      background: #eee;
      padding: 0.4rem;
  }
  .identify_body{
      width: 80%;
      margin: auto;
  }
  .identify_body>div{
      height: 120px;
      /*line-height: 140px;*/
      background: #fff;
      margin-top: 20px;
      border-radius: 4px;
      padding: 10px 0;
      border: 2px solid #02b2bb;
      border-radius: 4px;
  }
  .icon-drivers-license-o{
      font-size: 86px;
      display: inherit;
  }
  .identify_type{
      /*height: 36px;*/
      padding: 10px 0;
      /*background: #fff;*/
  }
  .identify_type_select{
      margin-top: 10px;
  }
  .identify_type_select span {
      font-size: 14px;
      margin-right: 10px;
      color: #999;
  }
  .identify_type_select .icon-checkbox::before{
      margin-right: .04rem;
      /*font-size: px;*/

  }
  .select_class{
      color: blue!important;
  }

</style>

<template>

<div class="identify" id="identify">
    <div class="identify_type">
        <h3>请选择认证方式</h3>
        <div class="identify_type_select">
            <span class="icon-checkbox" @click='selectType($event)' :key=''>身份证</span>
            <span class="icon-checkbox" @click='selectType($event)' :key=''>学生证</span>
            <span class="icon-checkbox" @click='selectType($event)' :key=''>护照</span>
            <span class="icon-checkbox" @click='selectType($event)' :key=''>身份证</span>
        </div>
    </div>
    <div class="identify_body">
        <div class="identify_face_page" id='id_face'>
            <span class=""></span>
            <span>身份证正面</span>
        </div>
        <div class="identify_opposite_page">
          身份证反面
        </div>
    </div>
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
                browse_button : 'id_face', //触发文件选择对话框的按钮，为那个元素id
                url : 'http://ncc-ys-prod-oss-xingjjc.oss-cn-beijing.aliyuncs.com/', //服务器端的上传页面地址
                flash_swf_url : '../libs/plupload/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
                silverlight_xap_url : '../libs/plupload/Moxie.xap' //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
            });
            this.fileUploader.bind('FilesAdded',function(uploader,files){
        		 for(var i=0,len=files.length;i<len;i++){
                    var file_name=files[i].name;
                    !function(i){
                        _this.previewImage(files[i],function(imgsrc){
                            $('#uploader_header').find('img').attr('src',imgsrc);
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
			this.initUploader()
		},500)
        this.title=this.$route.query.title;
    }
}

</script>
