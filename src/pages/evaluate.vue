<template>
    <div class="evaluate" id='evaluate'>
        <div class="evaluate_warp">
            <div class="top">
    			<div class="top_img">
    				<img :src='assistImage' v-if="assistImage" alt="">
    				<img src="../assets/images/icon.png" v-if="!assistImage" alt="">
    			</div>
    			<div class="evaluate_score">
                    <div class="gl_assist_name">
                        {{assistName}}
                    </div>
    				<div class="evaluate_title">
    					{{$t('formTitle.raty')}}
    				</div>
    				<div class="evaluate_star" id='evaluate_star'>
    					<span v-for=" i in 5" class="icon-heart2" :index='i' @click='evaluateStar(i)'></span>
    					<span class="evaluate_score_result">{{score}}</span>
    				</div>
    			</div>
    		</div>
    		<div class="middle">
    			<textarea  :placeholder="$t('formTitle.evaluateTips')" v-model='textareaVal'></textarea>
    		</div>
    		<button type="submit" name="button" class="evaluate_submit" @click='evaluateSubmit'>{{$t('button.submit')}}</button>
        </div>
        <div class="defindloadig" v-if="loadingShow">
            <loading></loading>
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
                assistImage:'',
                assistName:'',
				textareaVal:'',
				score:0,
                loadingShow:true
			}
		},
		methods:{
            loadData(){
                this.apiHost=CONFIG[__ENV__].apiHost;
                this.axios.get(this.apiHost+'/globalmate/rest/user/list/'+this.$route.query.evaluateId+'?token='+this.$route.query.token,{}).then((res)=>{
                    if(res.data.success){
                        this.assistImage=res.data.data.pic;
                        this.assistName=res.data.data.nikename;
                        this.loadingShow=false;
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            },
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
                    uEvaluatorId:this.$route.query.uNeedId,
                    uEvluatorName:this.$route.query.uNeedName,
                    uTargeterId:this.$route.query.evaluateId,
                    uTargeterName:this.assistName,
                    needId:this.$route.query.businessId,
                    score:this.score/20,
                    content:this.textareaVal||'',
                    evaExt1:'',
                    evaExt2:'',
                    evaExt1:''
                }
                this.loadingShow=true;
                this.apiHost=CONFIG[__ENV__].apiHost;
				this.axios.post(this.apiHost+'/globalmate/rest/evaluate/add'+'?token='+this.$route.query.token,postData).then((res)=>{
                    if(res.data.success){
                        window.history.back(-1);
                    }
                    this.loadingShow=false;
                }).catch((e)=>{
                    this.loadingShow=false;
                  console.log(e);
                })
			}
		},
        activated(){
            this.loadData()
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
.gl_assist_name{
    text-align: left;
    font-size: 16px;
    margin-top: 10px;
    font-weight: 500;

}
.evaluate_score{
	padding-left: .4rem;

}
.evaluate_title{
	font-size: 14px;
    margin-top: 10px;
	text-align: left;
    color: blue
}
.icon-heart2{
	font-size: 18px;
	margin-right: .2rem;
	color: #aaa;
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
    font-size: 0;
    margin-top: 10px;
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
	font-size: 20px;
}
</style>
