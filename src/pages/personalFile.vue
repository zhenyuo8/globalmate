<template>
    <div class="personalFile">
		<h3>个人资料</h3>
        <form class="personalFile_form" action="" method="post" onsubmit='return false'>
			<div class="name">
				<p>
					<label for="nicknamesignup" class="nickname" data-icon="u">昵称</label>&nbsp:&nbsp&nbsp
					<input id="nicknamesignup" name="nicknamesignup" required="required" type="text" placeholder="昵称" />
				</p>
				<p>
					<label for="truenamesignup" class="truename" data-icon="u">真实姓名</label>&nbsp:&nbsp&nbsp
					<input id="truenamesignup" name="truenamesignup" required="required" type="text" placeholder="真实姓名" />
				</p>
				<p>
					<label for="countrysignup" class="country" data-icon="u">所在国家</label>&nbsp:&nbsp&nbsp
					<input id="countrysignup" name="countrysignup" required="required" type="text" placeholder="国家" />
				</p>
				<p>
					<label for="citysignup" class="city" data-icon="u">所在城市</label>&nbsp:&nbsp&nbsp
					<input id="citysignup" name="citysignup" required="required" type="text" placeholder="城市" />
				</p>
			</div>
			<div class="image">
				<div class="" id="uploader_header">
					<img class="icon-user image_span" src='../assets/images/icon.png' />
					<!-- <span class="icon-user image_span"></span> -->
					<button type="button" name="button">上传头像</button>
				</div>
			</div>
        </form>
		<div class="personalFile_school">
			<div class="personalFile_school_add" @click='fillEducation'>
                <ul>
                    <li v-for="(item,index) in educationValue" @click='showEducationDetail(item)'>
                        <span class="fl">{{item.schoolname}}</span>
                        <span class="fr icon-arrow_right_samll">{{item.schooldate}}</span>
                    </li>
                </ul>
				<!-- <span style="font-size:20px;">+</span> -->
				<span style="color:#26a2ff"> + 教育经历</span>
			</div>
		</div>
		<div class="personalFile_hobby">
			<span class="personalFile_hobby_title">个人特质</span>
			<p>
				<label for="">兴趣爱好:</label>
				<input id="hobbysignup" type="text" name="" value="" placeholder='请输入'>
			</p>
			<p id=''>
				<label for="">愿意提供的帮助:</label>
				<input type="text" name="" :value="selectHelpTypeValue" id="offerhelpsignup" placeholder='请选择' readonly='readonly' @click='selectHelpType' style='text-align:center'>
			</p>
		</div>
		<div class="submitbtn" @click='submit'>
			<button type="button" name="button">提交</button>
		</div>
		<div :class="selectFlag?'select_in':'select_out'">
			<ul class="list_ul">
				<li v-for="(item,index) in list" @click='selectItemType(item,index)'>
					<span class="list_item">{{item}}</span>
					<span class="icon-checkbox"></span>
				</li>
			</ul>
			<div class="buttom_action">
				<span  class="cancel" @click='cancel'>取消</span>
				<span class="confirm" @click='confirm'>确定</span>
			</div>
		</div>
		<div class="fillin_education" :class="educationFlag?'education_in':'education_out'" @click="hideThisModule($event)">
			<form class="" action="" method="post" onsubmit='return false'>
				<p>
					<label for="schoolsignup" class="schoolname" data-icon="u">学校名称</label>&nbsp:&nbsp&nbsp
					<input id="schoolsignup" name="schoolsignup" required="required" type="text" :readonly='showEducationValue' />
				</p>
				<p>
					<label for="schooldatesignup" class="schooldate" data-icon="u">入学年份</label>&nbsp:&nbsp&nbsp
					<input id="schooldatesignup" name="schooldatesignup" required="required" type="text" placeholder="" readonly='readonly' @click='choseSchoolDate'/>
				</p>
				<p>
					<label for="schoolprofessionalsignup" class="professional" data-icon="u">所在专业</label>&nbsp:&nbsp&nbsp
					<input id="schoolprofessionalsignup" name="schoolprofessionalsignup" required="required" type="text" :readonly='showEducationValue' />
				</p>
				<p>
					<label for="schoolgradesignup" class="grade" data-icon="u">所在班级</label>&nbsp:&nbsp&nbsp
					<input id="schoolgradesignup" name="schoolgradesignup" required="required" type="text" :readonly='showEducationValue' />
				</p>
                <p class="confirm_add" v-if="!showEducationValue">
                    <input type="button" value="确定" @click='addOneEducation()' />
                </p>
			</form>
		</div>
    </div>
</template>

<script>
import CONFIG from '../config/config'
export default {
    data(){
        return{
            list:['学习互助','教材','办手续','换汇','就医','帮带','租赁','陪玩','代购','其他'],
            selectFlag:false,
            type_list:[],
            hasSelect_list:[],
            selectHelpTypeValue:'',
            headerImgae:'',
            educationFlag:false,
            educationValue:[],
            showEducationValue:false,
            userId:'',

        }
    },
	methods:{
		selectHelpType(){
			this.selectFlag=true;
		},
		selectItemType(item,index){
			if($($('.list_ul li')[index]).hasClass('select')){
				$($('.list_ul li')[index]).removeClass('select');
			}else{
				$($('.list_ul li')[index]).addClass('select');
			}
			let someType=this.type_list.some(function (itm,inx) {
				return itm===item;
			})
			if(someType){
				for(var i=0;i<this.type_list.length;i++){
					if (this.type_list[i]===item) {
						this.type_list.splice(i,1);
					}
					if (this.hasSelect_list[i]===index) {
						this.hasSelect_list.splice(i,1);
					}
				}
			}else{
				this.type_list.push(item);
				this.hasSelect_list.push(index);
			}
		},
		cancel(){
			this.selectFlag=false;
			if(this.type_list.length>0){
				for(var i=0;i<this.hasSelect_list.length;i++){
					$($('.list_ul li')[this.hasSelect_list[i]]).removeClass('select');
				}
			}
			this.selectHelpTypeValue=''
			this.type_list=[];
		},
		confirm(){
			this.selectHelpTypeValue=this.type_list.join('、');
			this.selectFlag=false;
		},
        fillEducation(){
            this.educationFlag=true;
        },
        addOneEducation(){
            this.educationFlag=false;
            let education={
                'schoolname':this.$el.querySelector('#schoolsignup').value,
                'schooldate':this.$el.querySelector('#schooldatesignup').value,
                'professional':this.$el.querySelector('#schoolprofessionalsignup').value,
                'grade':this.$el.querySelector('#schoolgradesignup').value,
            }
            this.$el.querySelector('#schoolsignup').value='';
            this.$el.querySelector('#schooldatesignup').value='';
            this.$el.querySelector('#schoolprofessionalsignup').value='';
            this.$el.querySelector('#schoolgradesignup').value='';
            this.educationValue.push(education);
        },
        hideThisModule(e){
            if(e.target.className.indexOf('fillin_education')>-1){
                this.educationFlag=false;
                this.showEducationValue=false;
                this.$el.querySelector('#schoolsignup').value='';
                this.$el.querySelector('#schooldatesignup').value='';
                this.$el.querySelector('#schoolprofessionalsignup').value='';
                this.$el.querySelector('#schoolgradesignup').value='';
            }
        },
        showEducationDetail(item){
            this.showEducationValue=item;
            this.$el.querySelector('#schoolsignup').value=item.schoolname;
            this.$el.querySelector('#schooldatesignup').value=item.schooldate;
            this.$el.querySelector('#schoolprofessionalsignup').value=item.professional;
            this.$el.querySelector('#schoolgradesignup').value=item.grade;
        },
        choseSchoolDate(){
            if(!this.calendar2&&!this.showEducationValue){
              this.calendar2 = new datePicker();
              this.calendar2.init({
                'trigger': '#schooldatesignup', /*按钮选择器，用于触发弹出插件*/
                'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                'minDate':'1900-1-1',/*最小日期*/
                'maxDate':'2100-12-31',/*最大日期*/
                'onSubmit':function(){/*确认时触发事件*/
                  var theSelectData=this.value;
                },
                'onClose':function(){/*取消时触发事件*/
                }
              })
            }
        },
		submit(){
            this.apiHost=CONFIG[__ENV__].apiHost;
    	    let postData={
                name:'',
                nikename:'',
                country:'',
                city:'',
                pic:'',
                school:'',
                hobby:'',
                helpAvailable:'',
                id:this.userId
            };
			postData.nickname=this.$el.querySelector('#nicknamesignup').value;
			postData.name=this.$el.querySelector('#truenamesignup').value;
			postData.country=this.$el.querySelector('#countrysignup').value;
			postData.city=this.$el.querySelector('#citysignup').value;
			postData.hobby=this.$el.querySelector('#hobbysignup').value;
			postData.school=JSON.stringify(this.educationValue);
			postData.helpAvailable=this.type_list.join(',');
			postData.pic=this.headerImgae||'';
			this.axios.put(this.apiHost+'/globalmate/rest/user/update/'+'?token='+this.$route.query.token,postData).then((res)=>{
                if(res.data.success){
                    window.history.back(-1);
                }
              }).catch((e)=>{

              })

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
                browse_button : 'uploader_header', //触发文件选择对话框的按钮，为那个元素id
                url : 'http://ncc-ys-prod-oss-xingjjc.oss-cn-beijing.aliyuncs.com/', //服务器端的上传页面地址
                flash_swf_url : '../libs/plupload/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
                silverlight_xap_url : '../libs/plupload/Moxie.xap' //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
            });
            this.fileUploader.bind('FilesAdded',function(uploader,files){
        		 for(var i=0,len=files.length;i<len;i++){
                    var file_name=files[i].name;
                    !function(i){
                        _this.previewImage(files[i],function(imgsrc){
                            // let con=$('<div class="main_decription_uploader_container_img" ><img class="prev_imgae" src="'+imgsrc+'"/></div>');
                            // $('.hide_space').append(con);
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
    components:{

    },
    activated(){
          this.selectFlag=false;
          this.educationFlag=false;
          this.showEducationValue=false;
          document.title=this.$route.query.title;
          this.apiHost=CONFIG[__ENV__].apiHost;
          this.axios.get(this.apiHost+'/globalmate/rest/user/getUserByToken'+'?token='+this.$route.query.token,{

          }).then((res)=>{
              if(res.data.success){
                  let data=res.data.data;
                  this.userId=data.id;
                  if(data.school){
                      this.educationValue=JSON.parse(data.school)
                  }
                  if(data.name){
                      this.$el.querySelector('#truenamesignup').value=data.name;
                  }
                  if(data.country){
                      this.$el.querySelector('#countrysignup').value=data.country;
                  }
                  if(data.city){
                      this.$el.querySelector('#citysignup').value=data.city;
                  }
                  if(data.nickname){
                      this.$el.querySelector('#nicknamesignup').value=data.nickname;
                  }
                  if(data.hobby){
                      this.$el.querySelector('#hobbysignup').value=data.hobby;
                  }
                  if(data.helpAvailable){
                      this.selectHelpTypeValue=data.helpAvailable;
                  }

              }

          }).catch((e)=>{
              console.log(e);
          })
    },
	created(){
        this.selectFlag=false;
        this.educationFlag=false;
        this.showEducationValue=false;
		this.selectFlag=false;
		setTimeout(()=>{
			this.initUploader()
		},500)
	}
}
</script>

<style scoped>
    .personalFile{
    	font-size: 14px;
		background: #eee;
        width:7.5rem;
        height: 13.34rem;
        overflow-y: auto;
    }
	.personalFile h3{
		background: #fff;
		height: 36px;
		line-height: 36px;
	}
	.personalFile_form{
		display: flex;
		background: #fff;
		margin-top: 10px;
		padding: 0 .3rem .2rem;
	}
	.personalFile_form .name{
		margin-right: .4rem;
	}
	.personalFile_form .name p{
		display: flex;
		height: 32px;
		line-height: 32px;
		margin-top: 10px;
	}
	.personalFile_form .name p label{
		width: 1.4rem;
		text-align: justify;
		text-justify:inter-ideograph;
		text-align-last:justify;
		line-height: 32px;
	}
	.personalFile_form .name p input{
		width: 2.4rem;
		border: 1px solid #eee;
		padding: 0 0.2rem;
	}
	 .image_span{
		display: inherit;
	    width: 1.72rem;
	    height: 1.72rem;
	    border: 1px solid #999;
	    border-radius: 50%;
	    line-height: 1.72rem;
	    font-size: 68px;
	    background: #eee;
	}
	#uploader_header{
		margin-top: 50%;
	}
	#uploader_header button{
		margin-top: 10px;
	}
	.personalFile_school, .submitbtn{
		margin-top: 10px;
		height: auto;
		background: #fff;
		/*height: 36px;*/
		line-height: 36px;
	}
	.personalFile_school_add{
		width: 90%;
		margin: auto;
	}
    .personalFile_school_add ul li{
        position: relative;
        height: 36px;
        color: #333;
        border-bottom: 1px solid #eee;

    }
    .icon-arrow_right_samll{
        line-height: 36px;
    }
    .icon-arrow_right_samll::before{
        float: right;
        color: #54698D;
    }
	.personalFile_hobby{
		margin-top: 10px;
		height: auto;
		background: #fff;
		padding: 0 .3rem .2rem;
	}
	.personalFile_hobby p{
		height: 36px;
		line-height: 36px;
		margin-top: 10px;
	}
	.personalFile_hobby p label{
		width: 2.4rem;
		margin-right: .1rem;
		text-align: left;
		text-align: justify;
		text-justify:inter-ideograph;
		text-align-last:justify;
	}
	.personalFile_hobby p input{
		width: 3.8rem;
		height: 34px;
		padding: 0 .2rem;
		border: 1px solid #eee;
		text-align: center;

	}
	.personalFile_hobby .personalFile_hobby_title{
		text-align: left;
		font-size: 14px;
		display: inline-block;
		height: 34px;
		line-height: 34px;
		color: #26a2ff;
		width: 100%;
		border-bottom: 1px solid #26a2ff;
		text-align: center;

	}
	.submitbtn{
		height: 56px;
		line-height: 56px;
	}
	.submitbtn button{
		width: 90%;
		display: inline-block;
		background: #00adff;
		color: #fff;
		height: 36px;
		line-height: 36px;
		border-radius: 4px;
		font-size: 16px;
	}
	.select_out{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 100%;
		-webkit-transition: all .2s ease-out;
        -moz-transition: all .2s ease-out;
       	transition: all .2s ease-out;
	}
	.select_in{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		-webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
		background: #fff;
	}
    .education_out{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 100%;
        display: none;
		-webkit-transition: all .2s ease-out;
        -moz-transition: all .2s ease-out;
       	transition: all .2s ease-out;
	}
	.education_in{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		-webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
		background: rgba(153,153,153,0.8);
	}
    .icon-arrow_right_samll::before{
        font-size: 24px;

    }
    .fillin_education form p{
        height: 36px;
        line-height: 36px;
        margin-top: 10px;
    }
    .fillin_education form p:last-child{

        margin-bottom: 10px;
    }
    .fillin_education form p input{
        height: 36px;
        line-height: 36px;
        box-sizing: border-box;
        border: 1px solid #eee;
        padding: 0 10px;
    }
    .fillin_education form{
        width: 90%;
        background: #fff;
        /*margin: auto;*/
        position: absolute;
        top: 30%;
        left: 5%;
        border-radius: 6px;
    }
    .confirm_add input{
        width: 87%;
        background: #26a2ff;
        color: #fff;
        border: none;
        font-size: 16px;
        border-radius: 5px;
    }
	.list_ul{
		padding: 0 0.2rem;
	}
	.list_ul li{
		height: 36px;
		line-height: 36px;
		border-bottom: 1px solid #eee;
		padding: 0 .2rem;
	}
	.list_ul .select .icon-checkbox{
		color: rgb(41, 182, 246);
	}
	.list_ul li .list_item{
		float: left;
	}
	.list_ul li .icon-checkbox{
		float: right;
		line-height: 36px;
		color: #999;
		font-size: 16px;
	}
	.buttom_action{
		height: 46px;
		background: #fff;
		line-height: 46px;
	}
	.buttom_action span{
		display: inline-block;
		width: 40%;
		height: 36px;
		margin-left: .2rem;
		line-height: 36px;
		border-radius: 5px;
		color: #fff;
	}
	.buttom_action .cancel{
		background: rgb(153, 153, 153);
	}
	.buttom_action .confirm{
		background: rgb(41, 182, 246);
	}
</style>
