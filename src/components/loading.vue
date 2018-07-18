<template>
    <i class="inline-loading"></i>
</template>

<script>
export default {
    // name: 'inline-loading'
}
</script>

<style lang="less" scoped>
    .inline-loading{
        width: 64px;
        height: 64px;
        display: inline-block;
        vertical-align: middle;
        margin: 0 auto;
        animation: Loading 1s steps(12, end) infinite;
        background: transparent url("data:image/png;base64,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") no-repeat;
        background-size: 100%;
    }
    @keyframes Loading{
        0% {
            transform: rotate3d(0, 0, 1, 0deg);
        }
        100% {
            transform: rotate3d(0, 0, 1, 360deg);
        }
    }
</style>
