<template>
    <div class="feedback" id='feedback'>
		<div class="feedback_title">
			您的意见是我们平台发展最宝贵的助力:
		</div>
		<div class="middle">
			<textarea  placeholder='请输入您的宝贵意见' v-model='textareaVal'></textarea>
		</div>
		<button type="submit" name="button" class="evaluate_submit" @click='evaluateSubmit'>提交</button>
    </div>
</template>

<script>
	export default {
		components:{

		},
		data(){
			return{
				textareaVal:'',
			}
		},
		methods:{

			evaluateSubmit(){
				console.log(this.textareaVal);

			}
		},
		created(){

		}
	}
</script>

<style scoped>
.feedback{
	padding: 20px 0.4rem;
}
.feedback_title{
	font-size: 13px;
	color: #333;
	height: 32px;
	line-height: 32px;
	text-align: left;
}
.middle{
	margin-top: 20px;
}
 .middle textarea{
	font-size: 12px;
	padding: .1rem;
	border: 2px solid #eee;
	width: 100%;
	height: 160px;
	box-sizing: border-box;
}

.evaluate_submit{
	width: 100%;
    font-size: 18px;
    height: 44px;
    background: #007aff;
    color: #fff;
    border-radius: 6px;
}

</style>
