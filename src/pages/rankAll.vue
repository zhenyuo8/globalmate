<template>
  <div class="rank_all" id='rank_all'>
      <p class="title">{{$t('formTitle.rankTitle')}}</p>
      <div class="rank_warp">
          <div class="rank_repeat" v-for="(item,index) in userLists" :key='index' @click='goDetail(item)'>
              <div class="rank" :class="'rank_'+index">
                  {{index+1}}
              </div>
              <div class="userInfo">
                  <div class="userImage">
                      <img src="../assets/images/icon.png" v-if="!item.pic" alt="">
                      <img :src="item.pic" v-if="item.pic" alt="">
                       <img :src="item.userTag=='vGold'?vGold:item.userTag=='vSilver'?vSilver:item.userTag=='vCopper'?vCopper:''" v-if="item.userTag" alt="" class="gl_cetifiy_medal">
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
          <span>{{$t('allDataDisplayed')}}</span>
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

export default {
  mixins: [userMix],
  components: {
      loading
  },
  data() {
    return {
        userLists:[],
        loadingShow:true,
        vGold:require('../assets/images/vGold.png'),
        vSilver:require('../assets/images/vSilver.png'),
        vCopper:require('../assets/images/vCopper.png')
    };
  },
  methods: {
      loadData(){
          let list=this.userList;
          list=list.sort(function (a,b) {
              return b.nice-a.nice;
          });
          this.userLists=list
          this.loadingShow=false;
      },
      goDetail(item) {
        this.$router.push({
          path: "mineInformation",
          query: {
            token: this.userInfo.token,
            title: item.nikename,
            otherUserId: item.id,
            id: '',
            currentuser: this.userInfo.userId,
            seeOther: true
          }
        });
      },

  },
  activated(){
      this.userLists=[];
      if (this.userInfo.token&& this.userList && this.userList.length) {
         this.loadData();
      } else {
        this.timer = setInterval(() => {
          if (this.userInfo.token&& this.userList && this.userList.length) {
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
                        line-height: 0;
                        margin: auto;
                        padding: 0.2rem 0 0.2rem;
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
                             border-radius: 4px;
                             position: relative;
                             img{
                                 width: 100%;
                                 height: 100%;
                                 border-radius: 4px;
                                 display: inline-block;
                             }
                             .gl_cetifiy_medal{
                                 position: absolute;
                                 bottom: -4px;
                                 right: -.08rem;
                                 width: 0.35rem;
                                 height: 0.35rem;
                                 box-shadow: -1px 1px 2px #fff;
                                 border-radius: 50%;
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
