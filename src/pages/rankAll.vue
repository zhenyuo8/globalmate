<template>
  <div class="rank_all" id='rank_all'>
      <p class="title">排行榜</p>
      <div class="rank_warp">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
              <div class="rank_repeat" v-for="(item,index) in userList" :key='index'>
                  <div class="rank" :class="'rank_'+index">
                      {{index+1}}
                  </div>
                  <div class="userInfo">
                      <div class="userImage">
                          <img src="../assets/images/icon.png" v-if="!item.pic" alt="">
                          <img :src="item.pic" v-if="item.pic" alt="">
                      </div>
                      <div class="userInfo_name">
                          <span class="name">{{item.nikename}}</span>
                          <span class="age">{{item.country}}</span>
                      </div>
                      <div class="nice">
                          {{item.nice}}
                      </div>
                  </div>
              </div>
          </mt-loadmore>
          <span>已显示所有排名</span>
      </div>
      <div class="defindloadig" v-if="loadingShow">
        <loading></loading>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import userMix from "../mixins/userInfo";
import loading from "../components/loading.vue";
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
export default {
  mixins: [userMix],
  components: {
      loading
  },
  data() {
    return {
        userList:[],
        loadingShow:true,
        allLoaded:true
    };
  },
  methods: {
      loadData(){
          this.axios.get(this.ip+'/globalmate/rest/user/list',{
              params:{
                  token:this.userInfo.token,
                  onlyCurrentUser:false,
              }
          }).then((res)=>{
              if(res.success){
                  let data=res.data;
                  let len = data.length;
　　               let minIndex, temp;
                  for(var i=0;i<len;i++){
                      minIndex = i;
              　　　　 for (var j = i + 1; j < len; j++) {
              　　　　 　　if (data[j].nice> data[minIndex].nice) {
              　　　　　 　　　minIndex = j;
              　　　　　 　}
              　　　　 }
                      temp = data[i];
　　　                   data[i] = data[minIndex];
　　　　                 data[minIndex] = temp;
                  }
                  this.userList=data;
                  this.loadingShow=false;
              }else {
                  this.loadingShow=false;
              }

          }).catch((e)=>{
              this.loadingShow=false;
              console.log(e);
          })
      },
      loadTop() {
          this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
          this.allLoaded = true;
          this.$refs.loadmore.onBottomLoaded();
      }

  },
  activated(){
      this.userList=[];
      if (this.userInfo.token) {
         this.loadData();
      } else {
        this.timer = setInterval(() => {
          if (this.userInfo.token) {
            this.loadData();
            clearInterval(this.timer);
          }
        }, 200);
      }
  },
  deactivated() {
    clearInterval(this.timer);
  },
  created() {}
};
</script>
<style media="screen" lang='less'>
    #rank_all{
        .title{
            font-size: 16px;
            font-weight: 600;
            text-align: left;
            padding: .3rem 0.4rem;
            position: relative;
            &:after{
                content: '';
                clear: both;
                border-bottom: 1px solid #eee;
                height: 1px;
                position: absolute;
                bottom: 0;
                right: 0;
                left: 0;
            }
        }
        font-size: 14px;
        .rank_warp{
            padding:0 0 0 0.4rem;
            &>span{
                padding: 6px 0;
                font-size: 12px;
                color: #999;
            }
            .rank_repeat{
                display: flex;
                div{

                    &.rank{
                        width: 6%;
                        text-align: left;
                        line-height: .72rem;
                        padding: 0rem 0 0.2rem;
                    }
                    &.rank_0{
                        color: red;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    &.rank_1{
                        color: #fb00ff;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    &.rank_2{
                        color: blue;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    &.userInfo{
                        width: 94%;
                        padding: 0.2rem 0 0.2rem;
                        position: relative;
                         .userImage{
                             width: .72rem;
                             float: left;
                             height: .72rem;
                             overflow: hidden;
                             border-radius: 4px;
                             img{
                                 width: 100%;
                                 height: 100%;
                                 display: inline-block;
                             }
                         }
                         &:after{
                             content: '';
                             clear: both;
                             border-bottom: 1px solid #eee;
                             height: 1px;
                             position: absolute;
                             bottom: 0;
                             right: 0;
                             left: 0;
                         }
                        &>.userInfo_name{
                            float: left;
                            font-size: 12px;
                            margin-left: 4%;
                            span{
                                display: block;
                                margin-top: 4px;
                                text-align: left;
                                &.age{
                                    color: #888;
                                }
                            }
                        }
                         &>.nice{
                             float: right;
                             line-height: .72rem;
                             margin-right: 0.4rem;
                         }
                    }
                }
            }
        }
    }
</style>
