<style scoped>

.repeat {
    font-size: 14px;
    display: flex;
    color: #4A4A4A;
    position: relative;
    padding: 0 0.1rem 0 0.3rem;
    font-family: 'PingFangSC-Regular'
}

.repeat::before {
    content: '';
    clear: both;
    position: absolute;
    left: 0;
    right: 0;
    border-bottom: 2px solid #F1F1F1;
    color: #e9e9e9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}

.repeat div {
    flex: 1;
    height: 44px;
    line-height: 44px;
}

.repeat .repeat_title {
    text-align: left;
}

.repeat .repeat_content {
    text-align: right;
    position: relative;
}

.repeate_content_text span {
    /*margin-right: .4rem;*/
    color: #9B9B9B;
}

input {
    outline: none;
    border: none;
    height: 80%;
    font-size: 14px;
}

.icon-arrow_right_samll::before {
    font-size: 24px;
    color: #54698D;
}
.repeate_content_text_item{
    width: 84%;
    float: left;
}
.repeate_content_text_item_fixed{
    width: 100%;
}
.repeate_content_text_item_fixed span{
    margin-right: .2rem;
}
.repeate_content_text_image{
    width: .64rem;
    height: .64rem;
    padding: 6px 0;
    margin-left: 2.2rem;

}
.repeate_content_text_image img{
    width: 100%;
    height: 100%;
    border-radius: 50%
}

</style>
<style media="screen">
.mint-switch{
    margin-right: .08rem;
}
    .mint-switch-core{
        height: .50rem!important;
        width: .76rem!important;
    }
    .mint-switch-core::after{
        width: .43rem!important;
        height: .43rem!important;
        border-radius:50%!important
    }
    .mint-switch-input:checked + .mint-switch-core::after{
        transform: translateX(12px)!important;
    }
    .mint-switch-core::before{
        height: .46rem!important;
        width: .72rem!important
    }
    .mint-switch-input:checked + .mint-switch-core{
        background: #66fd66!important;
        border-color: #66fd66!important
    }
  .mint-radio-core{
    display: none!important;
  }
</style>

<template>

<div class="repeat" @click='clickBack(itemRepeat)'>
     <mt-switch v-model="value" @change="turn($event,itemRepeat)" v-if="itemRepeat.componentKey==='rewardAmount'"></mt-switch>
    <div class="repeat_title">
        <span style="color:red" v-if="itemRepeat.isRequire">*</span>
        <span>{{itemRepeat.title}}</span>
    </div>
    <div class="repeat_content" v-if="!itemRepeat.type">
        <div class="repeate_content_text">
            <div class="repeate_content_text_item" v-if="!itemRepeat.mintType" :class="itemRepeat.arrow?'':'repeate_content_text_item_fixed'">
                <span :id='itemRepeat.componentKey' :name='itemRepeat.componentKey'>{{itemRepeat.text}}</span>
            </div>
            <div class="repeate_content_text_item" v-if="itemRepeat.mintType" :class="itemRepeat.arrow?'':'repeate_content_text_item_fixed'">
                <div class="repeate_content_text_image" style="width:32px;height:32px">
                    <img v-if="itemRepeat.url"  :src="itemRepeat.url" alt="">
                    <img v-if="!itemRepeat.url" src="../assets/images/icon.png" alt="">
                </div>
            </div>
            <div class="" v-if="itemRepeat.arrow" :class="itemRepeat.arrow?'icon-arrow_right_samll':''">
            </div>
        </div>
    </div>
    <div class="repeat_content" v-if="itemRepeat.type&&itemRepeat.type=='input'">
         <input :type="itemRepeat.componentKey==='rewardAmount'?'number':'text'" :disabled='itemRepeat.componentKey==="rewardAmount"&& !value' name="" value="" :placeholder='itemRepeat.text' @change='change(itemRepeat,$event)'>
    </div>
</div>

</template>

<script>
import Vue from 'vue'
import {Switch} from 'mint-ui';
import'mint-ui/lib/style.css'
Vue.component(Switch.name, Switch);
export default {
    components:{

    },
    data() {
        return {
            value:true
        }
    },
     props: {
         itemRepeat: {
             type: Object,
             default: {}
         },
         clickCallBack: {
             type: Function,
             default: function() {

             }
         },
         getConfig: {
             type: Function,
             default: function() {

             }
         }
     },
     methods: {
         clickBack(item) {
             if(item.key!=='style'){
                 this.clickCallBack(item)
             }
         },
         change(item,e){
             this.clickCallBack(item,e)
         },
         turn(e,item){
             this.itemRepeat.disabled=this.value;
         }
     }
}

</script>
