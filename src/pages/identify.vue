<style scoped>
  #identify{
      font-size: 14px;
      width: 6.7rem;
      height: 13.34rem;
      background: #eee;
      padding: 0.4rem;
  }
  .identify_body{
      width: 80%;
      margin: auto;
  }
  .identify_body>div{
      height: 120px;
      /*line-height: 140px;*/
      background: #fff;
      margin-top: 20px;
      border-radius: 4px;
      padding: 10px 0;
      border: 2px solid #02b2bb;
      border-radius: 4px;
  }
  .icon-drivers-license-o{
      font-size: 86px;
      display: inherit;
  }

</style>

<template>

<div class="identify" id="identify">
    <div class="identify_body">
        <div class="identify_face_page">
            <span class=""></span>
            <span>身份证正面</span>

        </div>
        <div class="identify_opposite_page">
          身份证反面
        </div>
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
