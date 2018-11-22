<style scoped lang="less">
.repeat {
  font-size: 14px;
  display: flex;
  color: #4a4a4a;
  position: relative;
  padding: 0 0.1rem 0 0.3rem;
  font-family: "PingFangSC-Regular";
}
.icon-arrow_right_samll{
    line-height: 44px;
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
.repeat .repeat_common>div{
    line-height: 44px;
}

.repeat .repeat_title {
  text-align: left;
}
.repeat_title{
  span{
    &.receive{
      padding-left: 35px;
      background-size: 25px!important;
      background: url('../assets/images/receive-icon.png') no-repeat left;
    }
    &.service{
      padding-left: 35px;
      background-size: 25px!important;
      background: url('../assets/images/service-icon.png') no-repeat left;
    }
    &.post{
      padding-left: 35px;
      background-size: 25px!important;
      background: url('../assets/images/post-icon.png') no-repeat left;
    }
    &.identify{
      padding-left: 35px;
      background-size: 25px!important;
      background: url('../assets/images/identify-icon.png') no-repeat left;
    }
    &.friends{
      padding-left: 35px;
      background-size: 25px!important;
      background: url('../assets/images/friends-icon.png') no-repeat left;
    }
    &.feedback{
      padding-left: 35px;
      background-size: 25px!important;
      background: url('../assets/images/feedback-icon.png') no-repeat left;
    }
    &.aboutus{
      padding-left: 35px;
      background-size: 25px!important;
      background: url('../assets/images/aboutus-icon.png') no-repeat left;
    }
  }
}
.repeat .repeat_content {
  text-align: right;
  position: relative;
}
.repeat_content input {
  text-align: right;
  padding-right: 0.2rem;
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
    color: #f97426;
    position: relative;
    display: inline;
    padding: 2px 0.1rem 2px 0.1rem;
    border: 1px solid #f97426;
    border-radius: 4px;
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


</style>


<template>

  <div class="repeat" @click='clickBack(itemRepeat)'>
    <div class="repeat_title repeat_common" :class="itemRepeat.componentKey=='reward'?'gl_reward_title':''">
      <span style="color:red" v-if="itemRepeat.isRequire">*</span>
      <span :class="itemRepeat.className?itemRepeat.className:''">{{itemRepeat.title}}</span>
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
    <div class="repeat_content repeat_common" v-if="itemRepeat.type&&itemRepeat.type=='input'" >
        <input type="text" name="" value="" :placeholder="itemRepeat.text" @change="change(itemRepeat,$event)" maxlength="50" >
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import userMix from "../mixins/userInfo";
export default {
  components: {
  },
  mixins: [userMix],
  data() {
    return {


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
        this.curItem=item;
        if (item.key!=='date') {
            this.clickCallBack(item);
        }
    },
    change(item,e){
        this.clickCallBack(item,e);
    }
   },
   activated(){

   },
   created(){

   }
};
</script>
