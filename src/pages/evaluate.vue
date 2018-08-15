<template>
    <div class="evaluate" id='evaluate'>
        <div class="evaluate_warp">
            <div class="top">
    			<div class="top_img">
    				<img src="../assets/images/icon.png" alt="">
    			</div>
    			<div class="evaluate_score">
    				<div class="evaluate_title">
    					整体评分
    				</div>
    				<div class="evaluate_star" id='evaluate_star'>
    					<span v-for=" i in 5" class="icon-heart2" :index='i' @click='evaluateStar(i)'></span>
    					<span class="evaluate_score_result">{{score}} 分</span>
    				</div>
    			</div>
    		</div>
    		<div class="middle">
    			<textarea  placeholder='对她/他的评价' v-model='textareaVal'></textarea>
    		</div>
    		<button type="submit" name="button" class="evaluate_submit" @click='evaluateSubmit'>提交</button>
        </div>

    </div>
</template>

<script>
import CONFIG from '../config/config.js'
	export default {
		components:{

		},
		data(){
			return{
				textareaVal:'',
				score:0
			}
		},
		methods:{
			evaluateStar(n){
				let span=$('.icon-heart2');
				this.score=20*n;
				for(var i=0;i<span.length;i++){
					if(i<n){
						$(span[i]).addClass('icon-heart2-on')
					}else {
						$(span[i]).removeClass('icon-heart2-on')
					}
				}
			},
			evaluateSubmit(){
                let postData={
                    uEvaluatorId:'',
                    uEvluatorName:'',
                    uTargeterId:'',
                    uTargeterName:'',
                    needId:'',
                    score:this.score%2,
                    content:this.textareaVal||'',
                    evaExt1:'',
                    evaExt2:'',
                    evaExt1:''
                }
                this.apiHost=CONFIG[__ENV__].apiHost;
				this.axios.post(this.apiHost+'/globalmate/rest/evaluate/add',postData).then((res)=>{
                    if(res.data.success){

                    }
                }).catch((e)=>{
                  console.log(e);
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

<style>
#evaluate{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}
.evaluate_warp{
    width: 90%;
    margin: 20px auto;
}
#evaluate .top{
	display: flex;
}
#evaluate .top_img{
	width: 2rem;
	height: 2rem;
}
#evaluate .top_img img{
	width: 100%;
	height: 100%;
	display: inline-block;
}
.evaluate_score{
	padding-left: .4rem;
	height: 32px;
	/*line-height: 32px;*/
}
.evaluate_title{
	font-size: 14px;
	text-align: left;
}
.icon-heart2{
	font-size: 20px;
	margin-right: .2rem;
	color: #eee;
}
.icon-heart2-on{
	color: red!important;
}

#evaluate .middle{
	margin-top: 20px;
}
#evaluate .middle textarea{
	font-size: 12px;
	padding: .1rem;
	border: 2px solid #eee;
	width: 100%;
	height: 120px;
	box-sizing: border-box;
}
.evaluate_star{
	position: relative;
}
.evaluate_submit{
	width: 100%;
    font-size: 18px;
    height: 36px;
    background: #007aff;
    color: #fff;
    border-radius: 6px;
}
.evaluate_score_result{
	font-size: 14px;
	position: absolute;
    right: -1rem;
    top: 20px;
}
</style>
