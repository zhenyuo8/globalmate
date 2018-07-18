<template>
    <div class="register" id='register'>
		<form  action="" onsubmit='return false'>
				<p>
					<label for="phonesignup" class="youphone" data-icon="p">手机 </label>
					<input id="phonesignup" name="phonesignup" required="required" type="number" placeholder="输入手机号码"/>
				</p>
				<p>
					<label for="passwordsignup" class="youpasswd" data-icon="p">密码 </label>
					<input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="输入密码"/>
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
		data(){
			return{

			}
		},
		methods:{
			login(){
				let postData=this.getRegisterData();
				let url='http://10.4.111.31:9090/globalmate/rest/user/login/'+postData.phone+'/'+postData.password;
				 this.axios.get(url,{

                 }).then((res)=>{
					 window.localStorage.setItem('TOKEN',res.data.data);
                     this.token=res.data.data;
					 setTimeout(()=>{
						//  this.$router.push({
		                //      path: 'Home',
		                //      query: {
		                //          'token': this.token,
		                //      }
		                //  });
						 window.history.go(-1);
					 },1000);
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
			}
		},
		created(){
			console.log(CONFIG);
		}
	}
</script>

<style>
@import "../assets/css/login.css";
#register{
	position: absolute;
	top: 0px;
	right: 0;
	left: 0;
	bottom: 0;
	width: 88%;
	height: 230px;
	/*padding: 18px 6% 60px 6%;*/
	margin: auto;
	background: rgb(247, 247, 247);
	border: 1px solid rgba(147, 184, 189,0.8);
	box-shadow:
		0pt 2px 5px rgba(105, 108, 109,  0.7),
		0px 0px 8px 5px rgba(208, 223, 226, 0.4) inset;
	border-radius: 5px;
}
</style>
