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
    /*margin-right: .4rem;*/
    color: #9B9B9B;
}

input {
    outline: none;
    border: none;
    height: 80%;
    font-size: 14px;
}

.icon-arrow_right_samll::before {
    font-size: 24px;
    color: #54698D;
}
.repeate_content_text_item{
    width: 84%;
    float: left;
}
.repeate_content_text_image{
    width: .64rem;
    height: .64rem;
    padding: 6px 0;
    margin-left: 2.2rem;

}
.repeate_content_text_image img{
    width: 100%;
    height: 100%;
    border-radius: 50%
}
</style>

<template>

<div class="repeat" @click='clickBack(itemRepeat)'>
    <div class="repeat_title">
        {{itemRepeat.title}}
    </div>
    <div class="repeat_content" v-if="!itemRepeat.type">
        <div class="repeate_content_text">
            <div class="repeate_content_text_item" v-if="!itemRepeat.mintType">
                <span>{{itemRepeat.text}}</span>

            </div>
            <div class="repeate_content_text_item" v-if="itemRepeat.mintType">
                <div class="repeate_content_text_image" style="width:32px;height:32px">
                    <img src="" :src="itemRepeat.url" alt="">
                </div>

                <!-- {{itemRepeat.text}} -->
            </div>
            <div class="" :class="itemRepeat.arrow?'icon-arrow_right_samll':''">
            </div>
        </div>
    </div>
    <div class="repeat_content" v-if="itemRepeat.type&&itemRepeat.type=='input'">
         <input type="text" name="" value="" placeholder='请输入'>
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
            },
            getConfig: {
                type: Function,
                default: function() {

                }
            }
        },
        methods: {
            clickBack(item) {
                // this.getConfig(item)
                this.clickCallBack(item)
            }
        }
}

</script>
