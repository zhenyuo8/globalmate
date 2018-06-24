<style scoped>

.header {
    display: flex;
    height: 33px;
    box-shadow: 0 0.5px 0 #ddd;
}

.header div {
    flex: 1;
    line-height: 33px;
    font-size: 16px;
}

.icon-header_back {
    color: #007aff
}

.header_title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.header_left {
    text-align: left;
    padding-left: .17rem
}

.header_right {
    text-align: right;
    color: #007aff;
    padding-right: .17rem;
}

</style>

<template>

<div class="header">
    <div class="header_left icon-header_back" @click='backFunction'>
    </div>
    <div class="header_title">
        {{hearderParas.title}}
    </div>
    <div class="header_right" @click='publishFunction'>
        {{hearderParas.right.text}}
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
            hearderParas: {
                type: Object,
                default: {}
            }
        },
        methods: {
            backFunction: function() {
                window.history.back()
            },
            publishFunction: function() {
                alert('调用发布接口')
            }
        },
        created() {
            // this.hearderParas={};
        }

}

</script>
