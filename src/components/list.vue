<style scoped>

.repeat {
    font-size: 14px;
    display: flex;
    color: #4A4A4A;
    position: relative;
    padding: 0 .2rem;
    font-family: 'PingFangSC-Regular'
}

.repeat::before {
    content: '';
    clear: both;
    position: absolute;
    left: 0;
    right: 0;
    /*bottom: 0;*/
    border-bottom: 2px solid #F1F1F1;
    color: #e9e9e9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}

.repeat div {
    flex: 1;
    height: 44px;
    line-height: 44px;
}

.repeat .repeat_title {
    text-align: left;
}

.repeat .repeat_content {
    text-align: right;
    position: relative;
}

.repeate_content_text span {
    margin-right: .4rem;
    color: #9B9B9B;
}

input {
    outline: none;
    border: none;
    height: 90%;
}

.icon-arrow_right_samll::before {
    font-size: 22px;
    color: #54698D;
    position: absolute;
    right: 0;
}

</style>

<template>

<div class="repeat" @click='clickBack(itemRepeat)'>
    <div class="repeat_title">
        {{itemRepeat.title}}
    </div>
    <div class="repeat_content" v-if="!itemRepeat.type">
        <div class="repeate_content_text" :class="itemRepeat.arrow?'icon-arrow_right_samll':''">
            <span>{{itemRepeat.text}}</span>
        </div>
    </div>
    <div class="repeat_content" v-if="itemRepeat.type&&itemRepeat.type=='input'">
        <div class="repeate_content_input">
            <input type="text" name="" value="" placeholder='请输入'>
        </div>
    </div>
</div>

</template>

<script>

export default {
    data() {
            return {

            }
        },
        props: {
            itemRepeat: {
                type: Object,
                default: {}
            },
            clickCallBack: {
                type: Function,
                default: function() {

                }
            }
        },
        methods: {
            clickBack(item) {
                this.clickCallBack(item)
            }
        }
}

</script>
