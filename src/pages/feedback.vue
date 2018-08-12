<template>
    <div class="feedback" id='feedback'>
        <div class="feedback_warp">
            <div class="feedback_title">
    			您的意见是我们平台发展最宝贵的助力:
    		</div>
    		<div class="middle">
    			<textarea  placeholder='请输入您的宝贵意见!' v-model='textareaVal'></textarea>
    		</div>
            <div class="defindloadig" v-if="loadingShow">
                <loading></loading>
            </div>
    		<button type="submit" name="button" class="evaluate_submit" @click='feedbackClick'>提交</button>
        </div>

    </div>
</template>

<script>
import CONFIG from '../config/config.js'
import loading from '../components/loading.vue'
	export default {
		components:{
            loading
		},
		data(){
			return{
				textareaVal:'',
                loadingShow:false
			}
		},
		methods:{

			feedbackClick(){
				this.apiHost=CONFIG[__ENV__].apiHost;
                this.loadingShow=true;
        	    let postData={
                    uEvaluatorId:'',
                    uEvluatorName:'',
                    uTargeterId:'',
                    uTargeterName:'',
                    needId:'',
                    score:'',
                    content:this.textareaVal,
                    evaExt1:'',
                    evaExt2:''
                };

    			this.axios.put(this.apiHost+'/globalmate/rest/evaluate/add/sys'+'?token='+this.$route.query.token,postData).then((res)=>{
                    if(res.data.success){
                        setTimeout(()=>{
                            this.loadingShow=false;
                             window.history.back(-1);
                        },1000);
                    }
                  }).catch((e)=>{
                      setTimeout(()=>{
                          this.loadingShow=false;
                           window.history.back(-1);
                      },1000);
                  })

			}
		},
        activated(){
            document.title=this.$route.query.title;
        },
		created(){

		}
	}
</script>

<style scoped>
.feedback{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}
.feedback_warp{
    width: 90%;
    margin: auto;
}
.feedback_title{
	font-size: 14px;
	color: #333;
    padding: 10px 0;
	text-align: left;
}
 .middle textarea{
	font-size: 14px;
	padding: .1rem;
    padding: 8px .16rem;
	border: 2px solid #eee;
	width: 100%;
	height: 160px;
	box-sizing: border-box;
}

.evaluate_submit{
	width: 100%;
    font-size: 16px;
    height: 36px;
    background: #007aff;
    color: #fff;
    border-radius: 4px;
}
.defindloadig{
    position: fixed;
    z-index: 11;
     left: 0;
     top: 0;
     right: 0;
     bottom: 0;
}

</style>
