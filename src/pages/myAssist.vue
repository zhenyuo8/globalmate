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
            overflow: scroll;
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
                        &.created_time{
                            position: absolute;
                            right: 0;
                            color: blue;
                            font-size: 12px;
                            top: 18px;
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
                    margin-top: 6px;
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
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomPullText="bottomPullText">
            <div class="list_repeat" v-for="(item,index) in myAssistList" :key='index'>
                <div class="list_repeat_content" @click='showDetail(item)'>
                    <p>{{$t('formTitle.type')}}: {{item.conceretNeed.tag}}</p>
                    <p>{{$t('formTitle.address')}}: {{item.conceretNeed.country}}_{{item.conceretNeed.city}}</p>
                    <p>{{$t('formTitle.head')}}: {{item.conceretNeed.title}}</p>
                    <p class="gl_status" :class="'status_'+item.need.enable">{{item.need.status}}</p>
                    <p class="created_time" >{{item.need.time}}</p>
                </div>
                <div class="list_repeat_pushed" v-if="!mySolove">
                    <p>{{$t('formTitle.pushTitle')}}</p>
                    <div class="list_repeat_pushed_item" v-show="item.pushList&&item.pushList.length!=0" >
                        <div class="" v-for="(items,indexs) in item.pushList" :key='indexs' @click="goChat(item,items)">
                            <img src="../assets/images/icon.png" v-if="!items.userInfo.pic" alt="">
                            <img :src="items.userInfo.pic" v-if="items.userInfo.pic" alt="">
                            <span>{{items.userInfo.nikename}}</span>
                        </div>
                    </div>
                </div>
                <div class="list_repeat_pushed" v-if="item.assistList&&item.assistList.length!=0&&!mySolove">
                    <p>{{$t('formTitle.helpMan')}}</p>
                    <div class="list_repeat_pushed_item" v-show="item.need.enable!=0">
                        <div class="" v-for="(items,indexs) in item.assistList" :key='indexs' @click="goChat(item,items)">
                            <img src="../assets/images/icon.png" v-if="!items.userInfo.pic" alt="">
                            <img :src="items.userInfo.pic" v-if="items.userInfo.pic" alt="">
                            <span>{{items.userInfo.nikename}}</span>
                        </div>
                    </div>
                </div>
                <div class="action_list" v-if="item.conceretNeed.status!='Closed'&&!mySolove">
                    <span class="re_edit" @click='editForm($event,item)' :class="item.need.enable==1||item.need.enable==3?'can_be_edit':''">{{$t('button.edit')}}</span>
                    <span class="done" @click='finished($event,item)' :class="item.need.enable!=6&&item.need.enable!=0?'can_be_done':''">{{$t('button.finished')}}</span>
                    <span class="comment" @click='evaluate($event,item)' :class="item.need.enable==0?'can_be_evaluate':''">{{$t('button.evaluate')}}</span>
                </div>
            </div>
            <div class="show_all_data" v-show="canNotLoadMore">
                已加载所有数据
            </div>
        </mt-loadmore>

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
import { MessageBox, Toast,Loadmore } from "mint-ui";
Vue.component(Loadmore.name, Loadmore);
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
      currentUserImgae: "",
      mySolove:false,
      allLoaded:false,
      pageNum:1,
      pageSize:5,
      canNotLoadMore:false,
      bottomPullText:'上拉加载'
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
          this.axios.get(this.ip +"/globalmate/rest/assist/" +item.need.id +"/complete",{
                params:{
                    token:this.userInfo.token,
                    needId: item.need.id,
                    action: "coplete",
                    providerId:providerId[0].providerId
                }
              }).then(res => {
                  this.myAssistList=[];
                  this.loadingShow=true;
                  this.loadData(this.userInfo.token);
              }).catch(e => {
              console.log(e);
            });
        }
      } else {
        this.axios.get(this.ip +"/globalmate/rest/assist/" +item.need.id +"/complete",{
            params:{
                token:this.userInfo.token,
                needId: item.need.id,
                action: "coplete",
                providerId:item.need.userId
            }
          }).then(res => {
              this.myAssistList=[];
              this.loadingShow=true;
              this.loadData(this.userInfo.token)
          }).catch(e => {
            console.log(e);
          });
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
                  for(var n=0;n<this.userList.length;n++){
                      if(curNowData.providerId==this.userList[n].id){
                          curNowData.userInfo=this.userList[n];
                          if(curNowData.matchAccept){
                              data.assistList.push(curNowData);
                          }
                          data.pushList.push(curNowData);
                          callback&&callback(data);
                      }
                  }
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
    //下拉加载
    loadTop() {
        this.pageNum=1;
        this.loadTopFlag=true;
        this.$refs.loadmore.onTopLoaded();
        this.loadData(this.userInfo.token);
    },
    loadBottom() {
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        this.pageNum+=1;
        this.loadData(this.userInfo.token);
    },
    loadData(token) {
      let url = "/globalmate/rest/need/list";
      let _this = this;
      if (this.$route.query.id === "solove") {
        url = "/globalmate/rest//assist/listService";
      }
      this.axios.get(this.ip + url, {
          params:{
              token:token,
              onlyCurrentUser:true,
              pageNum:this.pageNum,
              pageSize:this.pageSize,
          }
        }) .then(res => {
          if (res.success) {
            let data = res.data;

            this.listm=[];
            if(data.length>=this.pageSize){
                this.allLoaded=false;
            }
            if(data.length<this.pageSize&&this.myAssistList.leng!=0){
                this.canNotLoadMore=true;
            }
            if(this.loadTopFlag){
                this.myAssistList=[];
            }
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
                            case '6':
                                data[i].need.status=this.$t('status.complete');
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

                            default:

                        }
                        let curData=data[i];
                        curData.need.time=this.moment(curData.need.createTime).format('YYYY/MM/DD HH:mm');
                        if(!_this.mySolove){
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
                        }else{
                            _this.myAssistList.push(curData);
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
                        }

                    }
                }
                this.loadingShow=false;
            }else{
                if(_this.myAssistList.leng==0){
                    setTimeout(()=>{
                        this.nodataFlag=true;
                        this.loadingShow=false;
                    },500)
                    this.noDataTips='暂无相关数据';
                }
            }
          } else {
            setTimeout(() => {
              this.nodataFlag = true;
              this.loadingShow = false;
            }, 500);
            this.noDataTips = "暂无相关数据";
          }
        }).catch(e => {
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
    this.mySolove=this.$route.query.id=='solove'?true:false;
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
