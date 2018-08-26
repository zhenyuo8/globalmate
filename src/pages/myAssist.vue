<style scoped lang='less'>
    .gl_list{
        font-size: 14px;
        margin: 0;
        padding: 0;
        position: absolute;
        overflow: hidden;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: #eee;
        overflow-y: auto;
        .list_warp{
            background: #f7f5f3;
            .list_repeat{
                background: #fff;
                margin-bottom: 10px;
                padding: 10px .4rem;
                position: relative;
                .list_repeat_content{
                    text-align: left;
                    position: relative;
                    p{
                        padding: 10px 0;
                        &.gl_status{
                            position: absolute;
                            right: 0;
                            top: 0;
                        }
                    }
                }
                 .list_repeat_pushed::before{
                    border-top: 1px solid #eee;
                    content: '';
                    clear: both;
                    position: absolute;
                    left: 0;
                    right: 0;
                }
                .list_repeat_pushed{
                    text-align: left;
                    position: relative;
                    p{
                        padding: 10px 0;
                    }
                    .list_repeat_pushed_item{
                        overflow: hidden;
                        div{
                            float: left;
                            width: 20%;
                            img{
                                width: 1rem;
                                height: 1rem;
                                border-radius: 50%;
                                display: block;
                                margin: auto;
                            }
                            span{
                                margin:6px  auto 10px;
                                width: 100%;
                                text-align: center;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                font-size: 12px;
                            }
                        }
                    }

                }
                .action_list{
                    display: flex;
                    margin-top: 10px;
                    span{
                        padding: 8px .18rem;
                        flex: 1;
                        background: #eee;
                        margin-right: .2rem;
                        border-radius: 4px;
                        white-space: nowrap;
                        /*background: #bbb;*/
                        opacity: 0.6;
                        text-overflow: ellipsis;
                        &:last-child{
                             margin-right: 0;
                        }
                        &.share{
                            opacity: 1;
                        }
                        &.can_be_edit{
                           opacity: 1;
                        }
                        &.can_be_done{
                            opacity: 1;
                        }
                        &.can_be_evalute{
                            opacity: 1;
                        }
                    }
                }
                .action_list_done{
                    position: absolute;
                    right: 0.4rem;
                    bottom: 10px;
                }
            }
        }
    }
</style>


<template>
  <div class="gl_list">
    <div class="list_warp">
        <div class="list_repeat" v-for="(item,index) in myAssistList" :key='index'>
            <div class="list_repeat_content" @click='showDetail(item)'>
                <p>{{$t('formTitle.type')}}: {{item.conceretNeed.tag}}</p>
                <p>{{$t('formTitle.address')}}: {{item.conceretNeed.country}}_{{item.conceretNeed.city}}</p>
                <p>{{$t('formTitle.head')}}: {{item.conceretNeed.title}}</p>
                <p class="gl_status" :class="'status_'+item.need.enable">{{item.need.status}}</p>
            </div>
            <div class="list_repeat_pushed">
                <p>{{$t('formTitle.pushTitle')}}</p>
                <div class="list_repeat_pushed_item" v-show="item.pushList&&item.pushList.length!=0">
                    <div class="" v-for="(items,indexs) in item.pushList" :key='indexs'>
                        <img src="../assets/images/icon.png" v-if="!items.userInfo.pic" alt="">
                        <img :src="items.userInfo.pic" v-if="items.userInfo.pic" alt="">
                        <span>{{items.userInfo.nikename}}</span>
                    </div>
                </div>
            </div>
            <div class="list_repeat_pushed" v-if="item.assistList&&item.assistList.length!=0">
                <p>{{$t('formTitle.helpMan')}}</p>
                <div class="list_repeat_pushed_item" v-show="item.need.enable!=0">
                    <div class="" v-for="(items,indexs) in item.assistList" :key='indexs'>
                        <img src="../assets/images/icon.png" v-if="!items.userInfo.pic" alt="">
                        <img :src="items.userInfo.pic" v-if="items.userInfo.pic" alt="">
                        <span>{{items.userInfo.nikename}}</span>
                    </div>
                </div>
            </div>
            <div class="action_list" v-if="item.conceretNeed.status!='Closed'">
                <span class="re_edit" @click='editForm($event,item)' :class="item.need.enable==1||item.need.enable==3?'can_be_edit':''">{{$t('button.edit')}}</span>
                <span class="done" @click='finished($event,item)' :class="item.need.enable==5||item.need.enable==2?'can_be_done':''">{{$t('button.finished')}}</span>
                <span class="comment" @click='evaluate($event,item)' :class="item.need.enable==0?'can_be_evaluate':''">{{$t('button.evaluate')}}</span>
            </div>

        </div>
        <div v-if="nodataFlag" class="yy_nodata_class" style="">
          <div class="yy_icon_img">
            <img src="../assets/images/business_nodata.png" alt="">
            <span class="yy_nodata_text">{{noDataTips}}</span>
          </div>
        </div>
        <div class="defindloading" v-if='loadingShow'>
            <loading></loading>
        </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import loading from "../components/loading.vue";
import { MessageBox, Toast } from "mint-ui";
Vue.component(Toast.name, Toast);
Vue.component(MessageBox.name, MessageBox);
import userMix from "../mixins/userInfo";
export default {
  name: "myAssist",
  mixins: [userMix],
  components: {
    loading
  },
  data() {
    return {
      myAssistList: [],
      nodataFlag: false,
      noDataTips: "",
      loadingShow: true,
      currentUserImgae: ""
    };
  },
  methods: {
    editForm(e, item) {
      e = e ? e : window.event;
      e.preventDefault();
      event.stopPropagation();
      e.cancelBubble = true;
      if(item.need.enable==0||item.need.enable==6){
          Toast({
             message: '当前任务已经完成',
             duration: 2000
          });
          return;
      }
      if (item.need.enable != 1 && item.need.enable != 3) {
        Toast({
          message: "当前任务正在执行中，暂不能编辑!",
          duration: 2000
        });
        return;
      }
      this.$router.push({
        path: "assist",
        query: {
          token: this.userInfo.token,
          title: item.conceretNeed.tag,
          id: item.need.id,
          mode: "MODIFY"
        }
      });
    },
    finished(e, item) {
      e = e ? e : window.event;
      e.preventDefault();
      event.stopPropagation();
      e.cancelBubble = true;
      let _this = this;
      if(item.need.enable==0||item.need.enable==6){
          Toast({
             message: '当前任务已经完成',
             duration: 2000
          });
          return;
      }
      MessageBox.confirm("", {
        title: "",
        message: "确定当前求助已完成?",
        confirmButtonText: this.$t("button.confirm"),
        cancelButtonText: this.$t("button.cancel"),
        showCancelButton: true
      })
        .then(action => {
          _this.confirmFinished(item);
        })
        .catch(cancel => {});
    },
    confirmFinished(item) {
      let providerId;
      if (item && item.pushList.length != 0) {
        providerId = item.pushList.filter((item, index) => {
          return item.matchAccept;
        });
      }
      if (providerId && providerId.length != 0) {
        if (item.need.enable == 2 || item.need.enable == 5) {
          this.axios
            .get(
              this.ip +
                "/globalmate/rest/assist/" +
                item.need.id +
                "/complete/?token=" +
                this.userInfo.token +
                "&providerId=" +
                providerId[0].providerId,
              {
                needId: item.need.id,
                action: "coplete"
              }
            )
            .then(res => {})
            .catch(e => {
              console.log(e);
            });
        } else {
          Toast({
            message: "当前任务还未找到帮助者，暂不能完成！",
            duration: 2000
          });
          return;
        }
      } else {
        if (item.need.enable == 2 || item.need.enable == 5) {
          this.axios
            .get(
              this.ip +
                "/globalmate/rest/assist/" +
                item.need.id +
                "/complete/?token=" +
                this.userInfo.token +
                "&providerId=" +
                "",
              {
                needId: item.need.id,
                action: "coplete"
              }
            )
            .then(res => {})
            .catch(e => {
              console.log(e);
            });
        } else {
          Toast({
            message: "当前任务还未找到帮助者，暂不能完成！",
            duration: 2000
          });
          return;
        }
      }
    },
    goChat(item, items) {
      this.$router.push({
        path: "im",
        query: {
          token: this.userInfo.token,
          title: items.userInfo.nikename,
          id: item.need.id,
          toChartUser: items.userInfo.id,
          toChartId: items.userInfo.id
        }
      });
    },
    evaluate(e,item){
        e=e?e:window.event;
        e.preventDefault();
        event.stopPropagation();
        e.cancelBubble=true;
        if(item.need.enable==6){
            Toast({
               message: '当前任务已评价！',
               duration: 2000
            });
            return;
        }
        if(item.need.enable!=0){
            Toast({
               message: '当前任务还未完成，暂不能评价！',
               duration: 2000
            });
            return;
        }
        if(item.assistList.length==0){
            Toast({
               message: '当前困难不是由别人完成',
               duration: 2000
            });
            return;
        }else{
            let assistMan=item.assistList[0].providerId
            this.$router.push({
                path: 'evaluate',
                query: {
                    'token': this.userInfo.token,
                    'title': this.$t('button.evaluate'),
                    'id': 'evaluate',
                    'evaluateId':assistMan,
                    'businessId':item.need.id,
                    'uNeedId':item.assistList[0].uNeedId,
                    'uNeedName':item.assistList[0].uNeedName
                }
            });
        }
    },
    showDetail(item) {
      this.$router.push({
        path: "detail",
        query: {
          token: this.userInfo.token,
          title: item.conceretNeed.title,
          id: item.need.id,
          userId: this.userInfo.userId
        }
      });
    },

    getPushItemInfo(data, callback) {
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/user/list/" +
            data.providerId +
            "?token=" +
            this.userInfo.token,
          {}
        )
        .then(res => {
          if (res.success) {
            data.userInfo = res.data;
            callback && callback(data);
          } else {
            callback && callback(data);
          }
        })
        .catch(() => {
          callback && callback(data);
        });
    },
    getPushItem(data, callback) {
      data.pushList = [];
      data.assistList=[];
      let _this=this;
      this.axios
        .get(
          this.ip +
            "/globalmate/rest/match/" +
            data.need.id +
            "?token=" +
            this.userInfo.token,
          {}
        )
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length != 0) {
              var nowData=res.data;
              for(var i=0;i<nowData.length;i++){
                  let curNowData=nowData[i];
                  (function(curNowData){
                      _this.getPushItemInfo(curNowData,function (result) {
                          if(result.matchAccept){
                              data.assistList.push(result);
                          }
                          data.pushList.push(result);
                          callback&&callback(data)
                      });
                  })(curNowData)
              }
            } else {
              callback && callback(data);
            }
          } else {
          }
        })
        .catch(() => {
          callback && callback(data);
        });
    },

    loadData(token) {
      let url = "/globalmate/rest/need/list";
      let _this = this;
      if (this.$route.query.id === "solove") {
        url = "/globalmate/rest//assist/listService";
      }
      this.axios
        .get(this.ip + url + "?token=" + token + "&onlyCurrentUser=true", {
          onlyCurrentUser: true
        })
        .then(res => {
          if (res.success) {
            let data = res.data;
            this.listm=[];
            if(data.length!=0){
                for(var i=0;i<data.length;i++){
                    if(data[i].conceretNeed&&data[i].conceretNeed.title){
                        if(data[i].conceretNeed.pic){
                            data[i].conceretNeed.pic=data[i].conceretNeed.pic.split(';')[0];
                        }
                        var status=data[i].need.enable+'';
                        switch (status) {
                            case '1':
                                data[i].need.status=this.$t('status.open');
                                break;
                            case '2':
                                data[i].need.status=this.$t('status.execute');
                                break;
                            case '0':
                                data[i].need.status=this.$t('status.closed');
                                break;
                            case '3':
                                data[i].need.status='编辑中';
                                break;
                            case '4':
                                data[i].need.status='洽谈中';
                                break;
                            case '5':
                                data[i].need.status='执行中';
                                break;
                            case '6':
                                data[i].need.status=this.$t('status.complete');
                                break;
                            default:

                        }
                        let curData=data[i];
                        (function (curData) {
                            _this.getPushItem(curData,function (result) {
                                _this.myAssistList.push(result);
                                let len = _this.myAssistList.length;
            　　                 let minIndex, temp;
                                for(var i=0;i<len;i++){
                                    minIndex = i;
                            　　　　 for (var j = i + 1; j < len; j++) {
                            　　　　 　　if (_this.myAssistList[j].need.createTime> _this.myAssistList[minIndex].need.createTime) {
                            　　　　　 　　　minIndex = j;
                            　　　　　 　}
                            　　　　 }
                                    temp = _this.myAssistList[i];
            　　　                   _this.myAssistList[i] = _this.myAssistList[minIndex];
            　　　　                 _this.myAssistList[minIndex] = temp;
                                }
                            })
                        })(curData);
                    }
                }
                this.loadingShow=false;
            }else{
                setTimeout(()=>{
                    this.nodataFlag=true;
                    this.loadingShow=false;
                },500)
                this.noDataTips='暂无相关数据';
            }
          } else {
            setTimeout(() => {
              this.nodataFlag = true;
              this.loadingShow = false;
            }, 500);
            this.noDataTips = "暂无相关数据";
          }
        })
        .catch(e => {
          setTimeout(() => {
            this.nodataFlag = true;
            this.loadingShow = false;
          }, 500);
          this.noDataTips = "暂无相关数据";
        });
    }
  },
  activated() {
    this.myAssistList=[];
    this.nodataFlag=false;
    this.noDataTips='';
    if (this.userInfo && this.userInfo.token) {
      this.loadData(this.userInfo.token)
    } else {
      this.timer = setInterval(() => {
        if (this.userInfo && this.userInfo.token) {
          clearInterval(this.timer)
          this.loadData(this.userInfo.token)
        }
      })
    }
    // this.getToken(this.loadData);
  },
  deactivated () {
    clearInterval(this.timer)
  },
  created() {
  }
};
</script>
