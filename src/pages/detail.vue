<style scoped>

.detail {
    margin-top: 10px;
    border-top: 1px solid rgba(241, 241, 241, 1);
    box-sizing: border-box;
    font-size: 14px;
    color: #9B9B9B;
}

.detail_first {
    line-height: 44px;
    display: flex;
    height: 44px;
    overflow: hidden;
    padding: 0 0.36rem;
    border-bottom: 1px solid rgba(241, 241, 241, 1);
}

.detail_first > div {
    flex: 1
}

.detail_first .detail_first_left {
    text-align: left;
}

.detail_first_left img {
    width: 32px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
}

.detail_first_left span {
    display: inline-block;
}

.detail_first .detail_first_right {
    text-align: right;
}


.detail_second {
    height: 45px;
    line-height: 45px;
    padding: 0 0.36rem;
    border-bottom: 1px solid rgba(241, 241, 241, 1);
}
.detail_second .detail_second_left{
    float: left;
}
.detail_second .detail_second_right{
    float: right;
}


.detail_content{
    height: 250px;
    padding: 0 0.36rem;
}
.detail_content_title{
    height: 42px;
    font-size: 16px;
    font-weight: 500;
    line-height: 42px;
    text-align: left;
}
.detail_content_text{
    overflow: hidden;
    height: 83%
}
.detail_content_text p{
    line-height: 20px;
    overflow-y: scroll;
    height: 100%
}
.detail_image, .detail_list, .detail_message{
    padding: 0 0.36rem;
}
.detail_image > div{
    margin-top: 9px;
}
.detail_image > div > img{
    width: 100%;
    height: 100%;
}

.detail_list{
    margin-top: 14px;
}
.detail_list_repeat{
    height: 72px;
    padding: 12px .32rem;
    border-radius: 14px;
    background: #F1F1F1;
    margin-bottom: 9px;
    display: flex;
}
.detail_list_repeat > div{
    flex: 1
}
.detail_list_image > div{
    width: 1.44rem;
    height: 1.44rem;
}
.detail_list_image > div > img{
    width: 100%;
    height: 100%;
}
.detail_list_decription{
    padding: 15px 0;
}
.detail_list_decription span{
    line-height: 20px;
    float: left;
    margin-right: .2rem;
}
.detail_list_price{
    text-align: right;
    font-size: 18px;
    line-height: 72px;
}

.detail_message {
    display: flex;
    flex-direction: row;
    height: 66px;
    line-height: 66px;
    border-top: 1px solid rgba(151, 151, 151, 0.5);
}
.detail_message > div {
    flex: 1;

}
.detail_message_leave{
    text-align: left;
}
.detail_message_chart{
    text-align: right;
}
.detail_message_chart span{
    /*width: 1.32rem;
    height: 26px;*/
    padding: 4px .24rem;
    background: #F1F1F1;
    border: 1px solid rgba(151, 151, 151,1);
}
</style>

<template>

<div class="detail">
    <div class="detail_first">
        <div class="detail_first_left">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529843567270&di=7d4461aad4d2e95deacf7b85c6669387&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F86%2F88%2F55a09df24b97e_1024.jpg" alt="" class="bottom_left_userimage">
            <span class="bottom_left_username">圈圈*</span>
            <span class="bottom_left_time">2018-09-99</span>
        </div>
        <div class="detail_first_right">
            来自 火星
        </div>
    </div>
    <div class="detail_second">
        <span class="detail_second_left">
            !!! 我是标题
        </span>
        <span class="detail_second_right">
            帮代 icon
        </span>
    </div>
    <div class="detail_content">
        <div class="detail_content_title">
            悬赏内容
        </div>
        <div class="detail_content_text">
            <p>司法岛事件结束后，在七水之都休整完的草帽一伙即将出航，大家都在等待乌索普的归队，路飞甚至焦躁不安地要主动去接乌索普，但索隆阻止了他，因为他认为船员擅自离开而又随便归队的话对团队来说是不能接受的。最后，在索隆的坚持下，大家没有去接乌索普，而是登上新船阳光万里号起航。就在船离岸、船上的人望眼欲穿的时候，乌索普终于出现了，他流着泪道歉并表示想归队，这个时候索隆和大家都笑了，而路飞则一把鼻涕一把泪地把手伸得老长，把乌索普一把拉了上船。司法岛事件结束后，在七水之都休整完的草帽一伙即将出航，大家都在等待乌索普的归队，路飞甚至焦躁不安地要主动去接乌索普，但索隆阻止了他，因为他认为船员擅自离开而又随便归队的话对团队来说是不能接受的。最后，在索隆的坚持下，大家没有去接乌索普，而是登上新船阳光万里号起航。就在船离岸、船上的人望眼欲穿的时候，乌索普终于出现了，他流着泪道歉并表示想归队，这个时候索隆和大家都笑了，而路飞则一把鼻涕一把泪地把手伸得老长，把乌索普一把拉了上船。司法岛事件结束后，在七水之都休整完的草帽一伙即将出航，大家都在等待乌索普的归队，路飞甚至焦躁不安地要主动去接乌索普，但索隆阻止了他，因为他认为船员擅自离开而又随便归队的话对团队来说是不能接受的。最后，在索隆的坚持下，大家没有去接乌索普，而是登上新船阳光万里号起航。就在船离岸、船上的人望眼欲穿的时候，乌索普终于出现了，他流着泪道歉并表示想归队，这个时候索隆和大家都笑了，而路飞则一把鼻涕一把泪地把手伸得老长，把乌索普一把拉了上船。</p>
        </div>
    </div>
    <div class="detail_image">
        <div class="">
            <img src="../assets/images/1.jpeg" alt="">
        </div>
        <div class="">
            <img src="../assets/images/2.jpeg" alt="">
        </div>
        <div class="">
            <img src="../assets/images/3.jpg" alt="">
        </div>
    </div>
    <div class="detail_list">
        <div class="detail_list_repeat">
            <div class="detail_list_image">
                <div class="">
                    <img src="../assets/images/1.jpeg" alt="">
                </div>
            </div>
            <div class="detail_list_decription">
                <span class="detail_name">火影忍者佐助</span>
                <span class="detail_type">cool</span>
                <span class="detail_brand">japan</span>
            </div>
            <div class="detail_list_price">
                ¥ 123
            </div>
        </div>
        <div class="detail_list_repeat">
            <div class="detail_list_image">
                <div class="">
                    <img src="../assets/images/2.jpeg" alt="">
                </div>
            </div>
            <div class="detail_list_decription">
                <span class="detail_name">秦时明月</span>
                <span class="detail_type">history</span>
                <span class="detail_brand">台湾</span>
            </div>
            <div class="detail_list_price">
                $ 7890
            </div>
        </div>
        <div class="detail_list_repeat">
            <div class="detail_list_image">
                <div class="">
                    <img src="../assets/images/3.jpg" alt="">
                </div>
            </div>
            <div class="detail_list_decription">
                <span class="detail_name">火影忍者</span>
                <span class="detail_type">v89</span>
                <span class="detail_brand">japan</span>
            </div>
            <div class="detail_list_price">
                ¥ 777
            </div>
        </div>
    </div>
    <div class="detail_message">
        <div class="detail_message_leave">
            留言
        </div>
        <div class="detail_message_chart">
            <span>聊一下</span>

        </div>
    </div>
</div>

</template>

<script>

export default {
    'name': 'detail',
    components: {

    },
    data() {
        return {

        }
    }

}

</script>
