<template>
    <div class="index">
        聊天室
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{

    },
    created(){
        YYIMChat.initSDK({
        app: '', //appId应用id
        etp: '', //etpId企业id
        wsurl: '', //websocket Url
        wsport: 5227, //websocket port 5227/5222/5225
        servlet: '', //rest Url
        hbport: 7075, //httpbind  port 7075/7070
        flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
        logEnable: true, //client log
        clientMark: 'web', //client mark 'web' or 'pc'
        apiKey: ''
    });
        console.log(YYIMChat);
    }
}
</script>

<style>

</style>
