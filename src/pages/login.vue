<template>
    <div class="login" id='login'>
		<form  action="" onsubmit='return false'>
			<p>
				<!-- <label for="phonesignup" class="youphone" data-icon="p">手机 </label> -->
				<input id="phonesignup" name="phonesignup" required="required" type="number" placeholder="账号"/>
			</p>
			<p>
				<!-- <label for="passwordsignup" class="youpasswd" data-icon="p">密码 </label> -->
				<input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="密码"/>
			</p>
			<p class="signin button">
				<input type="button" value="登入" @click='login' />
			</p>
			<p class="change_link">
				还未注册账号?
				<a href="javascript:;" class="to_register" @click='goRegister'> 注册 </a>
			</p>
		</form>
    </div>
</template>

<script>
	import CONFIG from '../config/config'
	export default {
		components:{

		},
		data(){
			return{
			}
		},
		methods:{
			login(){
				let postData=this.getRegisterData();
                this.apiHost=CONFIG[__ENV__].apiHost;
				let url=this.apiHost+'/globalmate/rest/user/login/'+postData.phone+'/'+postData.password;
				 this.axios.get(url,{}).then((res)=>{
                       if(res.data.success){
                          window.localStorage.setItem('TOKEN',res.data.data);
                          window.localStorage.setItem('USERPHONE',postData.phone);
                          this.token=res.data.data;
                          this.getUserByToken(res.data.data);
                            setTimeout(()=>{
                                window.history.go(-1);
                            },1000);
                        }else {
                        }
                    }).catch((e)=>{
                 })
			},
            getUserByToken(token){
                this.apiHost=CONFIG[__ENV__].apiHost;
    			this.axios.get(this.apiHost+'/globalmate/rest/user/getUserByToken'+'?token='+token,{}).then((res)=>{
    				if(res.data.success){
    					this.CURRENTUSER=res.data.data;
    					window.localStorage.setItem('gl_CURRENTUSER',JSON.stringify(res.data.data));
    				}
    			}).catch((e)=>{
    				console.log(e);
    			})
            },
			getRegisterData(){
				let postData={
					password:'',
					phone:'',
				};
				postData.password=this.$el.querySelector('#passwordsignup').value;
				postData.phone=this.$el.querySelector('#phonesignup').value;
				return postData;
			},
			goRegister(){
				this.$router.push({
					path: 'register',
					query: {
						'title': '注册',
					}
				});
			},

		},
        activated(){
            document.title=this.$route.query.title;
        },
		created(){
		}
	}
</script>

<style scoped>
h1{
	font-size: 18px;
	height: 54px;
	line-height: 54px;
}
form p{
	font-size: 14px;
	height: 40px;
	line-height: 40px;
	color: #9B9B9B;
	margin-top: 12px;
	width: 70%;
	margin: 12px auto 0;
}
form {
	padding: 10px;
}
form label{
	margin-right: .2rem;
	color: #333!important;
}
form p input{
	font-size: 14px;
	height: 76%;
	padding: 2px 4px;
	color: #ff4a5a;
	width: 100%;
	border: 1px solid #eee;
	border-radius: 4px;
	background: #fff
}
.signin input{
	width: 104%;
	height: 100%!important;
	color: #fff!important;
	background: #ff4a5a;
	outline: none;
	border: none;
	font-size: 16px!important
}
input {
	outline: none;
	-webkit-appearance: none;
	border-radius: 0;
	border: none
}
input:focus{ outline:none; }

#login{
	position: absolute;
	top: 0px;
	right: 0;
	left: 0;
	bottom: 0;
	width: 88%;
	height: 230px;
	margin: auto;
	background: rgb(247, 247, 247);
	border: 1px solid rgba(153, 153, 153,0.1);
	box-shadow:
		0pt 2px 5px rgba(105, 108, 109,  0.7),
		0px 0px 8px 5px rgba(208, 223, 226, 0.1) inset;
	border-radius: 5px;
}
</style>
