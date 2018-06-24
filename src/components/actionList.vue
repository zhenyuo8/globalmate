<style scoped>
.repeat{
    display: flex;
    font-size: 14px;
    color: #9B9B9B;
    margin-top: 17px;
}
.repeat_time{
    width: 14%;
}
.repeat_content{
    width: 78%;
    border: 1px solid rgba(241, 241, 241, 1);
    min-height: 259px;
}
.top {
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid rgba(241, 241, 241, 1);
}
.top .top_left{
    float: left;
    margin-left: .35rem;
}
.top .top_right{
    float: right;
    margin-right: .35rem;
}
.middle{
    height: 146px;
    padding: 12px .4rem;
    display: flex;
    border-bottom: 1px solid rgba(241, 241, 241, 1);
}

.middle .middle_left{
    width: 2.2rem;
    text-align: left;
    overflow: hidden;
}
.middle_left p{
    line-height: 20px;
}
.middle_left .middle_from{
    margin-top: 26px;
}
.middle_decription{
    height: 100px;
    overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
    -webkit-box-orient: vertical;
        -webkit-line-clamp: 10;
}
.middle_right{
    width: 2.8rem;
    height: auto;
}
.middle_right img{
    width: 100%;
    height: 100%;
    display: inline-block;
}
.bottom{
    line-height: 45px;
    text-align: right;
    margin-right: 0.35rem;
}

</style>

<template>

<div class="repeat">
    <div class="repeat_time">
        {{historyActionItem.time}}
    </div>
    <div class="repeat_content">
        <div class="top">
            <span class="top_left">
                {{historyActionItem.data.top.title}}
            </span>
            <span class="top_right">
                {{historyActionItem.data.top.type}}
            </span>
        </div>
        <div class="middle">
            <div class="middle_left">
                <p class="middle_decription">{{historyActionItem.data.decription}}</p>
                <p class="middle_from">{{historyActionItem.data.from}}</p>
            </div>
            <div class="middle_right">
                <img src="../assets/images/history.jpeg" alt="">
                <!-- {{historyActionItem.data.url}} -->
            </div>
        </div>
        <div class="bottom">
            {{historyActionItem.data.rewardContent}}
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
            historyActionItem: {
                type: Object,
                default: {}
            }
        },
        methods: {

        },
        created() {

        }
}

</script>
