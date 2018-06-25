<template>
    <div class="mineInformationEdit">
        <div class="" v-for="item in listRepeat">
            <List :itemRepeat='item'></List>
        </div>
    </div>
</template>

<script>
import List from '../components/list.vue'
export default {
    data(){
        return{
            listRepeat: [{
                title: '头像',
                text: '陪玩／通宵达旦',
                arrow: true,
                header:true,
                mintType:'mine_mage',
                url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529843567270&di=7d4461aad4d2e95deacf7b85c6669387&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F86%2F88%2F55a09df24b97e_1024.jpg'
            }, {
                title: '昵称',
                text: '圈圈*',
                arrow: true
            }, {
                title: '常住地',
                text: '北京',
                arrow: true
            },{
                title: '认证状态',
                text: '认证icon',
                arrow: true
            }],
        }
    },
    components:{
        List
    }
}
</script>

<style scoped>
    .mineInformationEdit{
        margin-top: 32px;
        border-bottom: 1px solid rgba(241, 241, 241, 1);
    }
</style>
