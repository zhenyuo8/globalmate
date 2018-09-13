<style  lang="less">
	.reward{
		height: 44px;
		display: flex;
		font-size: 14px;
		line-height: 44px;
		padding: 0 0.1rem 0 0.3rem;
		.reward_input{
			input{
				text-align: center;
			}
		}
		.reward_type{
			position: absolute;
			right: 0.3rem;
			span{
				display: inline;
				font-size: 13px;
			    color: #f97426;
			    padding: 4px 0.2rem;
			    border: 1px solid #f97426;
			    border-radius: 4px;
				position: relative;
				&:after{
			        content: '';
			        clear: both;
			        position: absolute;
			         width: 0;
			         height: 0;
			         border-bottom: 6px solid #f97426;
			         bottom: 10%;
			         right: .02rem;
			         border-left: 6px solid transparent;
			    }
			}
		}

		.select_out {
		  position: fixed;
		  left: 0;
		  right: 0;
		  bottom: -100%;
		  opacity: 0;
		  -webkit-transition: all 0.3s ease-out;
		  -moz-transition: all 0.3s ease-out;
		  transition: all 0.3s ease-out;
		  background: #eee;
		}
		 .select_in {
		  position: fixed;
		  left: 0;
		  right: 0;
		  bottom: 0;
		  opacity: 1;
		  z-index: 2;
		  -webkit-transition: all 0.3s ease-in;
		  -moz-transition: all 0.3s ease-in;
		  transition: all 0.3s ease-in;

		}
		.gl_mask{
		    position: fixed;
		    top: 0;
		    bottom: 0;
		    left: 0;
		    right: 0;
		    z-index: 1;
		    background: rgba(153, 153, 153, 0.5);
		}
		.mint-cell-title{
	        text-align: left!important;
	    }
	    .mint-radio-core{
	        display: none!important
	    }

		.mint-switch {
		  margin-right: 0.08rem;
		  .mint-switch-core {
		    height: 0.5rem !important;
		    width: 0.76rem !important;
		  }
		  .mint-switch-core::after {
		    width: 0.43rem !important;
		    height: 0.43rem !important;
		    border-radius: 50% !important;
		  }
		  .mint-switch-input:checked + .mint-switch-core::after {
		    transform: translateX(12px) !important;
		  }
		  .mint-switch-core::before {
		    height: 0.46rem !important;
		    width: 0.70rem !important;
		  }
		  .mint-switch-input:checked + .mint-switch-core {
		    background: #66fd66 !important;
		    border-color: #66fd66 !important;
		  }
		  .mint-radio-core {
		    display: none !important;
		  }
		}

	}
</style>

<template>
  <div class="reward" >
	  <mt-switch v-model="values" @change="turn($event,itemRepeat)" v-if="itemRepeat.componentKey==='reward'"></mt-switch>
	  <div class="reard_title">
	  	<span style="color:red" v-if="itemRepeat.isRequire">*</span>
		<span>{{itemRepeat.title}}</span>
	  </div>
	  <div class="reward_input">
		  <input type="number" name="" value="" :placeholder='itemRepeat.text' class="reward_input_fir">
	  </div>
	  <div class="reward_type">
		  <span @click='selectRewardType' class="gl_reward_type">{{itemRepeat.rewardType}}</span>
	  </div>
	  <div class="gl_mask" v-if="selectFlag" @click='selectRewardType'>

      </div>
	  <div :class="selectFlag?'select_in':'select_out'" class="gl_reward_type_warp">
         <mt-radio align="right" v-model="value" :options='list' @change='check'></mt-radio>
      </div>
  </div>
</template>

<script>
import Vue from "vue";
import {Switch ,Radio } from "mint-ui";
import userMix from "../mixins/userInfo";
Vue.component(Switch.name, Switch);
Vue.component(Radio.name, Radio);
export default {
  components: {
  },
  mixins: [userMix],
  data() {
    return {
		values: true,
		selectFlag:false,
		value:'',
		list:[]
    };
  },
  props: {
    itemRepeat: {
      type: Object,
      default: {}
    },
    clickCallBack: {
      type: Function,
      default: function() {}
    },
    getConfig: {
      type: Function,
      default: function() {}
    }
  },
   methods: {
	   changeDate(val){
		   this.clickCallBack(this.itemRepeat,val)
	   },
	   selectRewardType(){
           if(!this.values) return;
           this.selectFlag=!this.selectFlag;
       },
	   check(){
		   this.value=arguments[0];
		   this.itemRepeat.rewardType=arguments[0]
		   this.selectFlag=!this.selectFlag;
	   }
   },
   activated(){
	   this.list=[{
 		    label: this.$t('moneyType.chinaType'),
 		    value: this.$t('moneyType.chinaType')
         },{
   		    label: this.$t('moneyType.USA'),
   		    value: this.$t('moneyType.USA')
         },{
   		    label: this.$t('moneyType.ouyuan'),
   		    value: this.$t('moneyType.ouyuan')
         },{
   		    label: this.$t('moneyType.yingbang'),
   		    value: this.$t('moneyType.yingbang')
         },{
   		    label: this.$t('moneyType.japan'),
   		    value: this.$t('moneyType.japan')
   			}
        ],
        this.value=this.$t('moneyType.currency')
   },
   created(){

   }
};
</script>
