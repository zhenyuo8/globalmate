<style scoped>
@import '../assets/css/list.css';
.myAssist{
    margin-top: 0;
    width:7.5rem;
    height: 13.34rem;
    overflow-y: auto;
}
.myAssist .select_out{
    position: fixed;
    left: 1rem;
    right: 0;
    bottom: 0;
    top: 100%;
    /*display: none;*/
    -webkit-transition: all .2s ease-out;
    -moz-transition: all .2s ease-out;
    transition: all .2s ease-out;
    background: #eee;
}
 .myAssist .select_in{
    position: fixed;
    left: 1rem;
    right: 0;
    bottom: 0;
    top: 44px;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
    background: #eee;
}
.myAssist .list_ul{
    padding: 0 0.2rem;
    background: #fff;
}
.myAssist .list_ul li{
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #eee;
    padding: 0 .2rem;
}
.myAssist .list_ul li:last-child{
    border: none;
}
.myAssist .list_ul .select .icon-checkbox{
    color: rgb(41, 182, 246);
}
.myAssist .list_ul li .list_item{
    float: left;
}
.myAssist .list_ul li .icon-checkbox{
    float: right;
    line-height: 36px;
    color: #999;
    font-size: 16px;
}
.myAssist .buttom_action{
    height: 46px;
    background: #fff;
    line-height: 46px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}
.myAssist .buttom_action span{
    display: inline-block;
    width: 40%;
    height: 36px;
    margin-left: .2rem;
    line-height: 36px;
    border-radius: 5px;
    color: #fff;
}
.myAssist .buttom_action .cancel{
    background: rgb(153, 153, 153);
}
.myAssist .buttom_action .confirm{
    background: rgb(41, 182, 246);
}
</style>
<style  lang="less">
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
    .slide_in{
        position: fixed;
        right:0;
        top:44px;
        bottom:0;
        width:6.5rem;
        background:#f5f5f5;
       -webkit-transition: all .2s ease-in;
       -moz-transition: all .2s ease-in;
       transition: all .2s ease-in;
       background:#eee;
    }
    .slide_out{
        position: fixed;
        right: -6.5rem;
         top:44px;
         bottom:0;
        width:6.5rem;
         background:#fff;
        -webkit-transition: all .2s ease-out;
        -moz-transition: all .2s ease-out;
        transition: all .2s ease-out;
    }
    .mask{
        position:absolute;
        left:0;
        right:0;
        top:44px;
        bottom:0;
        background:rgba(153,153,153,0.9)
    }
    	.rightIn_form{
    		display: flex;
    		background: #fff;
    		margin-top: 10px;
    		padding: 0 .3rem .2rem;
    	}
    	.rightIn_form .name{
    		margin-right: .4rem;
    	}
    	 .rightIn_form .name p{
    		display: flex;
    		height: 32px;
    		line-height: 32px;
    		margin-top: 10px;
    	}
    	 .rightIn_form .name p label{
    		width: 1rem;
    		text-align: justify;
    		text-justify:inter-ideograph;
    		text-align-last:justify;
    		line-height: 32px;
    	}
        .rightIn_form .name p input{
    		width: 4rem;
    		border: 1px solid #eee;
    		padding: 0 0.2rem;
        }
        .myAssist .slide_in .action{
            position: absolute;
            bottom: 0;
            display: flex;
            width: 100%;
            height: 46px;
            line-height: 46px;
        }
        .myAssist .slide_in .action span{
            flex:1;
            text-align:center;
            font-size:16px;

        }
       .myAssist .cancel{
            background:#ddd;
            color:#333;
        }
       .myAssist .confirm{
            background:#007aff;
            color:#fff;
        }

</style>
<template>

<div class="myAssist">
    <!--搜索框-->
        <searchInput :searchCallBack="searchCallBack" :childMsg='msg' :keyWordsSearch="keyWordsSearch" :searchVal="searchVal"></searchInput>
    <div class="repeat_assist" v-for="(item,index) in myAssistList" @click='showDetail(item)'>
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
                <p class="middle_decription">{{item.conceretNeed.descrition||item.conceretNeed.description}}</p>
                <p class="middle_from">来自 {{item.conceretNeed.country}}</p>
            </div>
            <div class="middle_right">
                <img v-if="item.conceretNeed.pic" :src='item.conceretNeed.pic' alt="">
                <img v-if="!item.conceretNeed.pic" :src='imagesList[index%3]' alt="">
                <!-- <img :src='imagesList[index%3]' alt=""> -->
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
   <div class="mask" v-show="rightIn" @click="hideMask">

   </div>
   <div :class="rightIn?'slide_in':'slide_out'">
        <form class="rightIn_form" action="" method="post" onsubmit='return false'>
			<div class="name">
				<p>
					<label for="countrysearch" class="country" data-icon="u">国家</label>&nbsp:&nbsp&nbsp
					<input id="countrysearch" name="countrysearch" required="required" type="text" placeholder="国家" />
				</p>
				<p>
					<label for="citysearch" class="city" data-icon="u">城市</label>&nbsp:&nbsp&nbsp
					<input id="citysearch" name="citysearch" required="required" type="text" placeholder="城市" />
				</p>
                <p @click='selectHelpType'>
                    <label for="typesearch" class="type" data-icon="u">类型</label>&nbsp:&nbsp&nbsp
					<input id="typesearch" name="typesearch" required="required" type="text"  placeholder='请选择' readonly='readonly' disabled='disabled'  :value="selectHelpTypeValue" />
                </p>
			</div>
        </form>
        <div class="action">
            <span class="cancel" @click='hideMask'>取消</span>
            <span class="confirm" @click='confirmSearch'>确认</span>
        </div>
        <div :class="selectFlag?'select_in':'select_out'">
			<ul class="list_ul">
				<li v-for="(item,index) in list" @click='selectItemType(item,index)'>
					<span class="list_item">{{item}}</span>
					<span class="icon-checkbox"></span>
				</li>
			</ul>
			<div class="buttom_action" v-show="selectFlag">
				<span  class="cancel" @click='cancel'>取消</span>
				<span class="confirm" @click='confirm1'>确定</span>
			</div>
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
          noDataTips:'',
          rightIn:false,
          selectFlag:false,
          selectHelpTypeValue:'',
          type_list:[],
          hasSelect_list:[],
          list:['学习互助','教材','办手续','换汇','就医','帮带','租赁','陪玩','代购','其他'],
          searchContent:{
              type:'',
              where:'',
          }

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
            this.rightIn=!this.rightIn;
        },
        hideMask(){
            this.rightIn=!this.rightIn;
            this.selectFlag=false;
        },
        confirmSearch(){
            this.rightIn=!this.rightIn;
            this.searchContent={};
            this.searchContent['type']=this.$el.querySelector('#typesearch').value
            this.searchContent['where']=this.$el.querySelector('#countrysearch').value+'_'+this.$el.querySelector('#citysearch').value;
            this.myAssistList=[];
            this.loadData();
            console.log(this.searchContent);


        },
        selectHelpType(){
            this.selectFlag=true;
        },
        selectItemType(item,index){
			if($($('.list_ul li')[index]).hasClass('select')){
				$($('.list_ul li')[index]).removeClass('select');
			}else{
				$($('.list_ul li')[index]).addClass('select');
			}
			let someType=this.type_list.some(function (itm,inx) {
				return itm===item;
			})
			if(someType){
				for(var i=0;i<this.type_list.length;i++){
					if (this.type_list[i]===item) {
						this.type_list.splice(i,1);
					}
					if (this.hasSelect_list[i]===index) {
						this.hasSelect_list.splice(i,1);
					}
				}
			}else{
				this.type_list.push(item);
				this.hasSelect_list.push(index);
			}
		},
        cancel(){
			this.selectFlag=false;
			if(this.type_list.length>0){
				for(var i=0;i<this.hasSelect_list.length;i++){
					$($('.list_ul li')[this.hasSelect_list[i]]).removeClass('select');
				}
			}
			this.selectHelpTypeValue=''
			this.type_list=[];
		},
		confirm1(){
			this.selectHelpTypeValue=this.type_list.join('、');
			this.selectFlag=false;
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
            let url='/globalmate/rest/assist/listSOS';
            let postData={
                onlyCurrentUser:''
            }
            if(this.$route.query.id==='offer'){
                url='/globalmate/rest/need/query';
                postData['type']=this.searchContent.type||''
                postData['where']=this.searchContent.where||''
            }
            this.axios.get(this.apiHost+url+'?token='+this.$route.query.token+'&type='+this.searchContent.type+'&where='+this.searchContent.where,JSON.stringify(postData)).then((res)=>{
                if(res.data.success){
                     let data=res.data.data;
                     this.listm=[];
                     if(data){
                         for(var i=0;i<data.length;i++){
                             if(data[i].conceretNeed&&data[i].conceretNeed.title){
                                 data[i].conceretNeed.url=this.imagesList[i];
                                 if(data[i].conceretNeed.pic){
                                     data[i].conceretNeed.pic=data[i].conceretNeed.pic.split(';')[0];
                                 }
                                 this.myAssistList.push(data[i])
                             }
                         }
                     }else{
                         if(this.myAssistList.length===0){
                             setTimeout(()=>{
                                 this.nodataFlag=true;
                             },500)
                             this.noDataTips='暂无相关数据';
                         }
                     }


                }else{
                    if(this.myAssistList.length===0){
                        setTimeout(()=>{
                            this.nodataFlag=true;
                        },500)
                        this.noDataTips='暂无相关数据';
                    }
                }
            }).catch((e)=>{
                if(this.myAssistList.length===0){
                    setTimeout(()=>{
                        this.nodataFlag=true;
                    },500)
                    this.noDataTips='暂无相关数据';
                }
                console.log(e);
            })
        },
    },
    activated(){
        this.rightIn=false;
        this.selectFlag=false;
    },
    created(){
        this.rightIn=false;
        this.selectFlag=false;
        this.token=this.$route.query.token;
        this.loadData();
    }

}

</script>
