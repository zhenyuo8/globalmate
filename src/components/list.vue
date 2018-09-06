<style scoped lang="less">
.repeat {
  font-size: 14px;
  display: flex;
  color: #4a4a4a;
  position: relative;
  padding: 0 0.1rem 0 0.3rem;
  font-family: "PingFangSC-Regular";
}

.repeat::before {
  content: "";
  clear: both;
  position: absolute;
  left: 0;
  right: 0;
  border-bottom: 2px solid #f1f1f1;
  color: #e9e9e9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.repeat .repeat_common {
  flex: 1;
  height: 44px;
  line-height: 44px;
}
.repeat .repeat_common div{
    line-height: 44px;
}

.repeat .repeat_title {
  text-align: left;
}

.repeat .repeat_content {
  text-align: right;
  position: relative;
}
.repeat_content input {
  text-align: right;
  padding-right: 0.2rem;
  line-height: 44px;
}
.repeate_content_text span {
  /*margin-right: .4rem;*/
  color: #9b9b9b;
}

input {
  outline: none;
  border: none;
  /*height: 80%;*/
  font-size: 14px;
}

.icon-arrow_right_samll::before {
  font-size: 24px;
  color: #54698d;
}
.repeate_content_text_item {
  width: 84%;
  float: left;
  overflow: hidden;
}

.repeate_content_text_item_fixed {
  width: 100%;
}
.repeate_content_text_item_fixed span {
  margin-right: 0.2rem;
}
.repeate_content_text_image {
  width: 0.64rem;
  height: 0.64rem;
  padding: 6px 0;
  margin-left: 2.2rem;
}
.repeate_content_text_image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.gl_reward{
    width: 58%;
    padding-right: 0!important;
}
.gl_reward_type{
    font-size: 14px;
    padding-right: 0.2rem;
    // overflow: hidden;
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
.select_out {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 100%;
  opacity: 0;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
  background: #eee;
}
 .select_in {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 57%;
  opacity: 1;
  z-index: 2;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;

}


</style>
<style media="screen" lang="less">
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

.gl_reward_type_warp{
    .mint-cell-title{
        text-align: left!important;
    }
    .mint-radio-core{
        display: none!important
    }
}
</style>

<template>

  <div class="repeat" @click='clickBack(itemRepeat)'>
    <mt-switch v-model="values" @change="turn($event,itemRepeat)" v-if="itemRepeat.componentKey==='reward'"></mt-switch>
    <div class="repeat_title repeat_common">
      <span style="color:red" v-if="itemRepeat.isRequire">*</span>
      <span>{{itemRepeat.title}}</span>
    </div>
    <div class="repeat_content repeat_common" v-if="!itemRepeat.type">
      <div class="repeate_content_text">
        <div class="repeate_content_text_item" v-if="!itemRepeat.mintType" :class="itemRepeat.arrow?'':'repeate_content_text_item_fixed'">
          <span :id='itemRepeat.componentKey' :name='itemRepeat.componentKey'>{{itemRepeat.text}}</span>
        </div>
        <div class="repeate_content_text_item" v-if="itemRepeat.mintType" :class="itemRepeat.arrow?'':'repeate_content_text_item_fixed'">
          <div class="repeate_content_text_image" style="width:32px;height:32px">
            <img v-if="itemRepeat.url" :src="itemRepeat.url" alt="">
            <img v-if="!itemRepeat.url" src="../assets/images/icon.png" alt="">
          </div>
        </div>
        <div class="" v-if="itemRepeat.arrow" :class="itemRepeat.arrow?'icon-arrow_right_samll':''">
        </div>
      </div>
    </div>
    <div class="repeat_content repeat_common" v-if="itemRepeat.type&&itemRepeat.type=='input'">
      <input :type="itemRepeat.componentKey==='reward'?'number':'text'" :disabled='itemRepeat.componentKey==="reward"&& !values' :class="itemRepeat.componentKey=='reward'?'gl_reward':''" name="" value="" :placeholder='itemRepeat.text' @change='change(itemRepeat,$event)'>
      <span v-show="itemRepeat.componentKey=='reward'" class="gl_reward_type" @click='selectRewardType'>{{itemRepeat.rewardType}}</span>
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
  components: {},
  mixins: [userMix],
  data() {
    return {
      values: true,
      selectFlag:false,
      list:[{
		    label: '人民币',
		    value: '人民币'
        },{
  		    label: '美元',
  		    value: '美元'
        },{
  		    label: '欧元',
  		    value: '欧元'
        },{
  		    label: '英镑',
  		    value: '英镑'
        },{
  		    label: '日元',
  		    value: '日元'
  			}
        ],
      value:'人民币'
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
    clickBack(item) {
      if (item.key !== "style") {
        this.clickCallBack(item);
      }
    },
    change(item, e) {
      this.clickCallBack(item, e);
    },
    turn(e, item) {
      this.itemRepeat.disabled = this.value;
    },
    selectRewardType(){
        if(!this.values) return;
        this.selectFlag=!this.selectFlag;
    },
    selectItemType(item,index){
        this.type=item;
        this.selectFlag=!this.selectFlag;
    },
    check(){
        this.value=arguments[0];
        this.itemRepeat.rewardType=arguments[0]
        this.selectFlag=!this.selectFlag;
    }
   },
   created(){
       this.value=this.itemRepeat.rewardType;
   }
};
</script>
