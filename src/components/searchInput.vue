<template>
    <!-- 搜索框组件 -->
    <div class="search-box">
        <div class="search_icon">
            <img src="../assets/images/search_icon@2x.png" alt="">
        </div>
        <!-- 虚拟键盘换行  搜索 -->
        <form onsubmit="return false">
            <input type="search" class="search-input"
                   :placeholder="$t('button.search')"
                   :disabled="disabled"
                   v-focus="focusStatus"
                   @keyup.enter ="getChangeVal"
                   v-model='searchVal'/>
        </form>

        <div class="search_delete" @click="cleanVal()" :class="this.searchVal!==''?'':'hide'">
            <img src="../assets/images/search_delete@2x.png" alt="">
        </div>
        <div class="select_icon" @click='showCondition()' v-if="!hideFilter">
            <img src="../assets/images/filter_icon@2x.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg:false,
                searchVal:''
            }
        },
        props: {
            searchCallBack: {
                type: Function,
                default: function () {}
            },
            keyWordsSearch:{
                type:Function,
                default:function () {}
            },
            focusStatus : {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '搜索'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            hideFilter:{
                type: Boolean,
                default: false
            }
        },
        components: {

        },
        computed: {

        },
        methods: {
            //val改变时触发
            getChangeVal(){
                this.keyWordsSearch(this.searchVal)
            },
            //清除内容
            cleanVal(){
                this.searchVal = '';
                this.keyWordsSearch(this.searchVal);
            },
            showCondition(){
                this.searchCallBack(this.msg);
            }
        },
        directives: {
            focus: {
                inserted: function (el, binding) {
                    if (binding.value == "true") {
                        el.focus();
                    }
                }
            }
        },
    }
</script>

<style  lang="less" scoped>
    .search-box{
        position: relative;
        /*width: 315px;*/
        /*height:100%;*/
        line-height: 0;
        background: #eee;
        opacity: 0.82;
        overflow:hidden;
        // margin:0px 0.24rem;
        padding:.16rem;
        .search_icon{
            position:absolute!important;
            height:16px;
            top: 15px;
            left:.3rem;
            img{
                width:15px;
                vertical-align: middle;
            }
        }
        .search-input{
            /*width: 6.3rem;*/
            width: 90%;
            height :30px;
            border: none;
            border-radius: 6px;
            float:left;
            font-size: 13px!important;
            line-height: 20px;
            vertical-align: middle;
            background:#fff;
            padding:5px 0.3rem 5px 0.7rem!important;
            cursor: text;
            outline: none;
            font-weight: 300;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            tap-highlight-color: transparent;
            &::-webkit-input-placeholder {
                color:#BBBBBB;
                line-height: 20px;
                font-size: 15px;
            }
            &:-moz-placeholder {
                color:#BBBBBB;
                line-height: 20px;
                font-size: 15px;
            }
            &::-moz-placeholder {
                color:#BBBBBB;
                line-height: 20px;
                font-size: 15px;
            }
            &:-ms-input-placeholder {
                color:#BBBBBB;
                line-height: 20px;
                font-size: 15px;
            }
        }
        .search_delete{
            position:absolute;
            right:1.1rem;
            height:18px;
            padding:6px 0;
            background: #fff;
            img{
                width: 17px;
                vertical-align: middle;
            }

        }
        .hide{
            display: none;
        }
        .select_icon{
            float:right;
            height:24px;
            padding:3px 0;
            /*display:none;*/
            img{
                width:23px;
                height:23px;
                vertical-align: middle;
            }
        }
        input {
            caret-color: red;
        }
    }
</style>
