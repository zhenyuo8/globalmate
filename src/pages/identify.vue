<style scoped>


</style>

<template>

<div class="identify">
    <div class="identify_body">

    </div>
</div>

</template>

<script>
import CONFIG from '../config/config'
export default {
    'name': 'mine',
    data() {
        return {
            title:'',
        }
    },
    components: {

    },
    computed:{

    },
    methods: {

        clickCallBack(item) {


        },
        goEditMineInfo(){

        },
        loadData(){

        }

    },
    activated(){

    },
    watch:{
        'title':function (val,old) {
            document.title=val
        }
    },
    created(){
        this.loadData();
        this.title=this.$route.query.title;
    }
}

</script>
