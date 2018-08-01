<template>
    <div class="authorization" id='authorization'>
		<div class="application_icon">
			<div class="">
				<img src="../assets/images/2.jpeg" alt="">
			</div>
		</div>
		<div class="authorization_tips">
            <h3>该网页由微信公众号开发，请确认授权一下信息</h3>
            <p>获取您的公开信息（昵称、头像等）</p>
            <button type="button" name="button" @click='authorization'>确认登入</button>
		</div>
        <!-- <Loading></Loading> -->
    </div>
</template>

<script>
import CONFIG from '../config/config.js'
import Loading from '../components/loading'
	export default {
		components:{
            Loading
		},
		data(){
			return{

			}
		},
		methods:{
			authorization(){
                let url='https://13ede50d.ngrok.io/globalmate/rest/wechat/oauth/oauthUrl?redirect=https://13ede50d.ngrok.io/globalmate/index.jsp';
                this.axios.get(url,{}).then((res)=>{
                    window.location.href=res.data.data
                })
			}
		},
        activated(){

        },
		created(){

		}
	}
</script>

<style scoped>
	#authorization{
		width: 7.5rem;
		height: 13.34rem;
		background: #fff;
	}
	#authorization .application_icon{
		padding:50px 0.4rem;
	}
	#authorization .application_icon>div{
		width: 2rem;
		height: 2rem;
		margin: auto;
		vertical-align: middle;
		border-radius: 50%;
	}
	#authorization .application_icon>div>img{
		width: 100%;
		height: 100%;
		display: inline-block;
		border-radius: 50%;
	}

    .authorization_tips{
        width: 80%;
        margin: auto;
        padding-top: .4rem;
        border-top: 1px solid #eee;
    }
    .authorization_tips h3{
        font-size: 15px;
        font-weight: 600;
        text-align: left;
        line-height: 26px;
    }
    .authorization_tips p, .authorization_tips button{
        font-size: 14px;
        color: #999;
        margin-top: 20px;
    }
    .authorization_tips button{
        font-size: 16px;
        width: 5rem;
        height: 36px;
        color: #fff;
        background: #06b906;
        line-height: 36px;
        border-radius: 4px;
        font-weight: 600;
    }
</style>
