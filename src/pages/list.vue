<style scoped lang='less'>
    .gl_list{
        font-size: 14px;
        margin: 0;
        padding: 0;
        .list_warp{
            background: #f7f5f3;
            .list_repeat{
                background: #fff;
                margin-bottom: 10px;
                padding: 10px .4rem;
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
                        display: flex;

                        div{
                             margin-right: 10px;
                            img{
                                width: 1.2rem;
                                height: 1.2rem;
                                border-radius: 50%;
                                display: block;
                                margin: auto;
                            }
                            span{
                                margin-top: 10px;
                                margin:6px  auto 10px;
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
                        text-overflow: ellipsis;
                        &:last-child{
                             margin-right: 0;
                        }
                    }
                }
            }
        }
    }
</style>
<style media="screen" lang="less">
    .yy_nodata_class{
        text-align: center;
        color: #999;
        font-size: 13px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
    .defindloadig{
       position: fixed;
       z-index: 11;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }

</style>

<template>

<div class="gl_list">
    <div class="list_warp">
        <div class="list_repeat" v-for="(item,index) in myAssistList">
            <div class="list_repeat_content" @click='showDetail(item)'>
                <p>事物标签: {{item.conceretNeed.tag}}</p>
                <p>事物地点: {{item.conceretNeed.country}}</p>
                <p>事物内容: {{item.conceretNeed.title}}</p>
                <p class="gl_status">求助中</p>
            </div>
            <div class="list_repeat_pushed">
                <p>推送名单:</p>
                <div class="list_repeat_pushed_item">
                    <div class="">
                        <img src="../assets/images/1.jpeg" alt="">
                        <span>zhenyu</span>
                    </div>
                    <div class="">
                        <img src="../assets/images/2.jpeg" alt="">
                        <span>zhenyuo8</span>
                    </div>
                    <div class="">
                        <img src="../assets/images/3.jpg" alt="">
                        <span>zhenyuo8</span>
                    </div>
                </div>
            </div>
            <div class="list_repeat_pushed">
                <p>推送名单:</p>
                <div class="list_repeat_pushed_item">
                    <div class="">
                        <img src="../assets/images/1.jpeg" alt="">
                        <span>zhenyu</span>
                    </div>

                </div>
            </div>
            <div class="action_list">
                <span class="re_edit" @click='editForm($event,item)'>重新编辑</span>
                <span class="done" @click='finished($event,item)'>完成</span>
                <span class="share" @click='evaluate($event,item)'>分享到</span>
                <span class="comment" @click='evaluate($event,item)'>评价</span>
            </div>
        </div>
    </div>

    <div v-if="nodataFlag" class="yy_nodata_class" style="">
        <div class="yy_icon_img">
            <img src="../assets/images/business_nodata.png" alt="">
            <span class="yy_nodata_text">{{noDataTips}}</span>
        </div>
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
    'name': 'myAssist',
    components: {
        loading
    },
    data() {
        return {
            myAssistList: [],
            imagesList:[
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg'
          ],
          nodataFlag:false,
          noDataTips:'',
          loadingShow:true,
          currentUserImgae:'',
        }
    },
    methods:{
        editForm(e,item){
            e.preventDefault();
            e.cancelBubble=true;
            this.$router.push({
                path: 'assist',
                query: {
                    'token': this.$route.query.token,
                    'title': item.conceretNeed.tag,
                    'id': item.need.id,
                    'mode':'MODIFY'
                }
            });
        },
        finished(e,item){
            this.apiHost=CONFIG[__ENV__].apiHost;
            e.preventDefault();
            e.cancelBubble=true;
            this.axios.get(this.apiHost+'/globalmate/rest/assist/'+item.need.id+'/complete/?token='+this.$route.query.token,{
                'needId':item.need.id,
                'action':'coplete'
            }).then(res=>{
            }).catch(e=>{
                console.log(e);
            })

        },
        evaluate(e,item){
            e.preventDefault();
            e.cancelBubble=true;
            this.$router.push({
                path: 'evaluate',
                query: {
                    'token': this.token,
                    'title': '评价',
                    'id': 'evaluate',
                }
            });
        },
        showDetail(item){
            this.$router.push({
                path: 'detail',
                query: {
                    'token': this.$route.query.token,
                    'title': item.conceretNeed.title,
                    'id': item.need.id,
                }
            });
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
            let url='/globalmate/rest/need/list'
            if(this.$route.query.id==='solove'){
                 url='/globalmate/rest//assist/listService'
            }
            this.axios.get(this.apiHost+url+'?token='+this.$route.query.token+'&onlyCurrentUser=true',{
                onlyCurrentUser:true
            }).then((res)=>{
                if(res.data.success){
                     let data=res.data.data;
                     this.listm=[];
                     if(data){
                         for(var i=0;i<data.length;i++){
                             if(data[i].conceretNeed&&data[i].conceretNeed.title){
                                 data[i].conceretNeed.url=this.imagesList[i]
                                 if(data[i].conceretNeed.pic){
                                     data[i].conceretNeed.pic=data[i].conceretNeed.pic.split(';')[0];
                                 }
                                 this.myAssistList.push(data[i])
                             }
                         }
                         console.log(this.myAssistList);
                         this.loadingShow=false;
                     }else{
                         setTimeout(()=>{
                             this.nodataFlag=true;
                             this.loadingShow=false;
                         },500)
                         this.noDataTips='暂无相关数据';
                     }
                }else{
                    setTimeout(()=>{
                        this.nodataFlag=true;
                        this.loadingShow=false;
                    },500)
                    this.noDataTips='暂无相关数据';
                }
            }).catch((e)=>{
                setTimeout(()=>{
                    this.nodataFlag=true;
                    this.loadingShow=false;
                },500)
                this.noDataTips='暂无相关数据';
            })
        }
    },
   activated(){
       document.title=this.$route.query.title;
       this.myAssistList=[];
       this.nodataFlag=false;
       this.noDataTips='';
       this.loadData();
   },
   created(){
       this.currentUserImgae=JSON.parse(window.localStorage.getItem('CURRENTUSER')).pic;

   }

}

</script>
