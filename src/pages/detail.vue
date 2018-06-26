<style scoped>
.bottom{
    line-height: 45px;
    display: flex;
    height: 45px;
    overflow: hidden;
}
.bottom > div {
    flex: 1
}
.bottom .bottom_left{
     text-align: left;
     margin-left: 0.35rem;
}
.bottom_left img{
        width: 32px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
}
.bottom_left span{
    display: inline-block;
}
.bottom .bottom_right{
     text-align: right;
     margin-right: 0.35rem;
}
</style>

<template>

<div class="detail">
    <div class="bottom">
        <div class="bottom_left">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529843567270&di=7d4461aad4d2e95deacf7b85c6669387&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F86%2F88%2F55a09df24b97e_1024.jpg" alt="" class="bottom_left_userimage">
            <span class="bottom_left_username">圈圈*</span>
            <span class="bottom_left_time">2018-09-99</span>
        </div>
        <div class="bottom_right">

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
