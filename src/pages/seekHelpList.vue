<style scoped>
@import '../assets/css/list.css';
.myAssist{
    margin-top: 0
}
</style>
<style media="screen" lang="less">
    .yy_nodata_class{
        text-align: center;
        color: #999;
        font-size: 13px;
        position: fixed;
        top: 46px;
        left: 0;
        right: 0;
        bottom: 46px;
        background: #fff;
        .yy_icon_img{
            position: absolute;
            width: 80px;height: 80px;margin:auto;
            top: 35%;
            left: 0;
            right: 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .yy_nodata_text{
            width: 80px;
            margin-top: 10px;
            display: inline-block;
            max-height: 200px;
            overflow: hidden;
            overflow-y: auto;
        }
    }

</style>
<template>

<div class="myAssist">
    <!--搜索框-->
        <searchInput :searchCallBack="searchCallBack" :childMsg='msg' :keyWordsSearch="keyWordsSearch" :searchVal="searchVal"></searchInput>
    <div class="repeat_assist" v-for="(item,index) in myAssistList" @click='showDetail'>
        <div class="top">
            <span class="top_left">
                        {{item.conceretNeed.title}}
                    </span>
            <span class="top_right">
                        {{item.conceretNeed.type}}
                    </span>
        </div>
        <div class="middle">
            <div class="middle_left">
                <p class="middle_decription">{{item.conceretNeed.descrition}}</p>
                <p class="middle_from">来自 {{item.conceretNeed.country}}</p>
            </div>
            <div class="middle_right">
                <img :src='imagesList[index%3]' alt="">
            </div>
        </div>
        <div class="action_list_help">
            <div class="go_help">
                <span @click='goHelp($event,item)'>去帮助</span>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom_left">
                <img :src='imagesList[index%3]' alt="" class="bottom_left_userimage">
                <span class="bottom_left_username">{{item.need.userName}}</span>
                <span class="bottom_left_time">{{timestampToTime(item.need.createTime)}}</span>
            </div>
            <div class="bottom_right">
                {{item.conceretNeed.rewardAmount}}
            </div>
        </div>
    </div>
    <div v-if="nodataFlag" class="yy_nodata_class" style="">
        <div class="yy_icon_img">
            <img src="../assets/images/business_nodata.png" alt="">
            <span class="yy_nodata_text">{{noDataTips}}</span>
        </div>
   </div>
</div>

</template>

<script>
import searchInput from '../components/searchInput.vue'
import CONFIG from '../config/config'
export default {
    'name': 'myAssist',
    components: {
        searchInput
    },
    data() {
        return {
            myAssistList: [],
            imagesList:[
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg'
          ],
          searchVal:'',
          msg:false,
          nodataFlag:false,
          noDataTips:''

        }
    },
    methods:{
        finished(e,item){
            e.preventDefault();
            e.cancelBubble=true;
            this.apiHost=CONFIG[__ENV__].apiHost;
            this.axios.get(this.apiHost+'/globalmate/rest/assist/'+item.need.id+'/complete/?token='+this.$route.query.token,{
                'needId':item.need.id,
                'action':'coplete'
            }).then(res=>{
                console.log(res);
            }).catch(e=>{
                console.log(e);
            })
        },
        showDetail(){
            this.$router.push({
                path: 'detail',
                query: {
                    'token': '22223',
                    'title': '哈哈',
                    'id': 'fffff',
                }
            });
        },
        goHelp(e,item){
            e.preventDefault;
            e.cancelBubble=true;
            let _this=this;
            this.getUserInfo(item.need.userId,function(data){
                _this.$router.push({
                    path: 'im',
                    query: {
                        'token': _this.token,
                        'title': data.nikename,
                        'id': 'fffff',
                        'toChartUser':data.nikename,
                        'toChartId':data.phone
                    }
                });
            })

        },
        getUserInfo(userId,callback){
          this.apiHost=CONFIG[__ENV__].apiHost;
          let url='';
          if(this.$route.query.id==='sos'){
              url='/globalmate/rest/assist/listSOS'
          }else{
              url='/globalmate/rest/user/list/'+userId
          }
          this.axios.get(this.apiHost+url+'/?token='+this.$route.query.token,{}).then(res=>{
              if(res.data&&res.data.success){
                  callback(res.data.data);
              }
          }).catch(e=>{

          })
        },
        searchCallBack(data){
            this.msg=!this.msg;
        },
        keyWordsSearch(keywords){
                this.searchVal=keywords;
                if(!keywords){
                    this.listData=this.loadData();
                }else{
                    var advancedSearchData=[],obj={};
                    obj['pageNo']=1;
                    obj['pageSize']=10000;
                    obj['searchText']=keywords;
                    obj['advancedSearchData']=advancedSearchData;
                    this.listData=this.loadData(obj);
                }
            },
        timestampToTime(time){
            let date = new Date(time);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + '';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y+M+D;
        },
        loadData(){
            this.apiHost=CONFIG[__ENV__].apiHost;
            this.axios.get(this.apiHost+'/globalmate/rest/assist/listSOS'+'?token='+this.$route.query.token,{
                onlyCurrentUser:''
            }).then((res)=>{
                if(res.data.success){
                     let data=res.data.data;
                     this.listm=[];
                     for(var i=0;i<data.length;i++){
                         if(data[i].conceretNeed&&data[i].conceretNeed.title){
                             data[i].conceretNeed.url=this.imagesList[i]
                             this.myAssistList.push(data[i])
                         }
                     }
                     if(this.myAssistList.length===0){
                         setTimeout(()=>{
                             this.nodataFlag=true;
                         },500)
                         this.noDataTips='暂无相关内容';
                     }
                }else{

                }
            }).catch((e)=>{
                console.log(e);
            })
        },
    },
    activated(){
      console.log(11111111)
    },
    created(){
        this.token=this.$route.query.token;
        this.loadData();
    }

}

</script>
