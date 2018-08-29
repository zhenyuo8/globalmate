<template>
  <div class="previewImage" id='previewImage'>
	  <div class="preview_image_warp">
	  	<img src="" id="preview_image" alt="">
	  </div>
	  <div class="defindloadig" v-if="loadingShow">
        <loading></loading>
      </div>
  </div>
</template>

<script>
import userMix from "../mixins/userInfo";
import loading from "../components/loading.vue";
export default {
  mixins: [userMix],
  components: {
	  loading
  },
  data() {
    return {
		loadingShow:true,
    };
  },
  methods: {


  },
  activated() {
	  let img=new Image();
	  this.loadingShow=true;
	  let showImage=this.$el.querySelector('#preview_image')
	  let _this=this;
	  showImage.src='';
	  img.src=this.$route.query.url;
	  img.onload=function () {
          showImage.src=img.src;
          _this.loadingShow=false;
	  }
  },
  created() {
  }
};
</script>

<style scoped lang='less'>
	#previewImage{
	    position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
		.preview_image_warp{
			width: 100%;
			img{
				max-width: 100%;
				position:absolute;
				top:0;
				bottom:0;
				left:0;
				right:0;
				margin:auto;
			}
		}
	}
</style>
