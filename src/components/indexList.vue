<template>
    <div class="">
        <searchInput :searchCallBack="searchCallBack" :childMsg='msg' :keyWordsSearch="keyWordsSearch" :searchVal="searchVal"></searchInput>
        <mt-index-list>
            <mt-index-section :index="item.letter" v-for="(item,index) in selectItem " :key='index'>
                <mt-cell :title="items" v-for="(items,indexs) in item.citylist" :key='indexs' @click.native='pickCountry($event,items)'></mt-cell>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {IndexSection ,IndexList} from 'mint-ui';
    import searchInput from '../components/searchInput.vue'

    Vue.component(IndexList.name, IndexList);
    Vue.component(IndexSection.name, IndexSection);

	export default {
		components:{
            searchInput
		},
		data(){
			return{
                msg:false,
                searchVal:'',
                select:false,
                list:[]
			}
		},
        props: {
    		selectItem:{
    			type:Array,
    			default:function(){

                }
    		},
            countrySityCallBack:{
                type:Function,
                default:function () {

                }
            },
            listType:{
    			type:String,
    			default:''
    		}
    	},
		methods:{
            searchCallBack(data){
                this.msg=!this.msg;
            },
             keyWordsSearch(keywords){
                 if(keywords){
                     keywords=keywords.toUpperCase()
                     let list=JSON.parse(window.localStorage.getItem('LIST'))
                     this.selectItem=list.filter(function (item) {
                         return item.letter==keywords
                     })
                 }else {
                     this.selectItem=JSON.parse(window.localStorage.getItem('LIST'));
                 }
             },
             pickCountry(e,item){
                 this.countrySityCallBack(this.listType,item);
             }
		},

        activated(){

        },
		created(){

		}
	}
</script>
<style media="screen">
    li{
        list-style: none;
    }
    .mint-cell{
        display: inline-block!important;
        height: 36px;
        min-height: 36px;
        margin: 0 2.667%;
        width: 28%;
        border-radius: 4px;
         border: 1px solid #eee;
         box-sizing: border-box;
         background-image:none!important
    }
    .picked{
        border-color: red
    }
    .mint-cell-title, .mint-cell-text{
        height: 100%;
        text-align: center;
    }
    .mint-cell-wrapper{
        background: none;
        background-image:none!important;
    }
    .mint-cell-text{
        font-size: 14px!important;
        vertical-align: top;
    }
    .mint-indexsection-index{
        font-size: 14px;
        text-align: left;
        font-weight: 600;
        color: red;
        padding: 4px .2rem;
        background: #fff;
    }
    .mint-indexsection-index + ul{
        padding: 10px;
        text-align: left;
    }

    .mint-indexlist-nav{
        color: #077fc5;
    }
    .mint-indexlist-navitem{
        font-size: 14px;
        padding: 6px 8px
    }

</style>

<style scoped>

</style>
