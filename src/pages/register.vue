<template>
    <div class="register" id='register'>
		<form  action="" onsubmit='return false'>
				<p>
					<!-- <label for="usernamesignup" class="uname" data-icon="u">姓名</label> -->
					<input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="用户名" />
				</p>
				<p>
					<!-- <label for="emailsignup" class="youmail" data-icon="e" > 邮箱</label> -->
					<input id="emailsignup" name="emailsignup" required="required" type="email" placeholder="请输入邮箱"/>
				</p>
				<p>
					<!-- <label for="passwordsignup" class="youpasswd" data-icon="p">密码 </label> -->
					<input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="输入密码"/>
				</p>
				<p>
					<!-- <label for="phonesignup" class="youphone" data-icon="p">手机 </label> -->
					<input id="phonesignup" name="phonesignup" required="required" type="number" placeholder="输入手机号码"/>
				</p>
				<!-- <p>
					<label for="passwordsignup_confirm" class="youpasswd" data-icon="p">确认密码 </label>
					<input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="eg. X8df!90EO"/>
				</p> -->
				<p class="signin button">
					<input type="button" value="注册" @click='register' />
				</p>
				<p class="change_link">
					已有账号?
					<a href="javascript:;" class="to_register" @click='goLogin'> 登录 </a>
				</p>
			</form>

    </div>
</template>

<script>
import CONFIG from '../config/config.js'
	export default {
		data(){
			return{

			}
		},
		methods:{
			register(){
                this.apiHost=CONFIG[__ENV__].apiHost;
				let postData=this.getRegisterData();
				 this.axios.post(this.apiHost+'/globalmate/rest/user/add',postData).then((res)=>{
				     if(res.data.success){
               this.$router.push({
                 path: 'personalFile',
                 query: {
                   'id':res.data.data.id,
                   'title': '个人资料',
                 }
               });
             }

         }).catch((e)=>{
           console.log(e);
         })
			},
			getRegisterData(){
				let postData={
					name:'',
					nikename:'',
					password:'',
					email:'',
					phone:'',
					idNumber:'',
					pic:'',
					school:'',
					where:'',
					hobby:'',
				};
				postData.name=this.$el.querySelector('#usernamesignup').value;
				postData.email=this.$el.querySelector('#emailsignup').value;
				postData.password=this.$el.querySelector('#passwordsignup').value;
				postData.phone=this.$el.querySelector('#phonesignup').value;
				postData.nikename=postData.name;
				return postData;
			},
			goLogin(){
				this.$router.push({
					path: 'login',
					query: {
						'title': '登入',
					}
				});
			}
		},
        activated(){
            document.title=this.$route.query.title;
        }
	}
</script>

<style scoped>

#register{
	position: absolute;
	top: 0px;
	right: 0;
	left: 0;
	bottom: 0;
	width: 88%;
	height: 320px;
	/*padding: 18px 6% 60px 6%;*/
	margin: auto;
	background: rgb(247, 247, 247);
	border: 1px solid rgba(153, 154, 153,0.1);
	box-shadow:
		0pt 2px 5px rgba(105, 108, 109,  0.7),
		0px 0px 8px 5px rgba(208, 223, 226, 0.1) inset;
	border-radius: 5px;
}
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

</style>
