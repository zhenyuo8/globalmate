<template>
    <div class="chart">
        <div class="chart_main">
            <div class="chart_main_content">
                <div class="chart_main_content_image">
                    <div class="">
                        <img src="../assets/images/1.jpeg" alt="">
                    </div>
                </div>
                <div class="chart_main_content_decription">
                    <span class="detail_name">火影忍</span>
                    <span class="detail_type">cool</span>
                    <span class="detail_brand">japan</span>
                </div>
                <div class="chart_main_content_action">
                    <div class="">
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="chart_main_history">

            </div>
        </div>
        <div class="chart_action">
            <div class="chart_action_input">
                <input type="text" name="" value="">
            </div>
        </div>
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
    .chart{
        font-size: 14px;
        color: #9B9B9B;
        position: relative;
    }
    .chart_main{
        padding: 10px .3rem;
    }
    .chart_main_content{
        height: 72px;
        padding: 12px .32rem;
        border-radius: 14px;
        background: #F1F1F1;
        margin-bottom: 9px;
        display: flex;
    }
    .chart_main_content > div{
        flex: 1
    }
    .chart_main_content_image > div{
        width: 1.44rem;
        height: 1.44rem;
    }
    .chart_main_content_image > div > img{
        width: 100%;
        height: 100%;
    }
    .chart_main_content_decription{
        padding: 15px 0;
    }
    .chart_main_content_decription span{
        line-height: 20px;
        float: left;
        margin-right: .2rem;
    }
    .detail_list_price{
        text-align: right;
        font-size: 18px;
        line-height: 72px;
    }

    .chart_action{
        position: fixed;
        height: 44px;
        background: #F1F1F1;
        width: 100%;
        bottom: 0;
    }
    .chart_action_input{
        width: 80%;
        margin: auto;
    }
    .chart_action_input input{
        height: 36px;
        padding: 0 .2rem;
        width: 90%;
        margin-top: 4px;
        outline: none;
        border: 1px solid rgba(151,151,151,0.3);
        border-radius: 4px;
    }
</style>
