<template>
	<div class="aboutUs">
		<div class="aboutUs_images">
			<img src="../assets/images/5.jpg" alt="">
		</div>
		<div class="aboutUs_images">
			<p class="first">{{$t('aboutUs.first')}}</p>
			<p class="others ">{{$t('aboutUs.second')}}</p>
			<p class="others">{{$t('aboutUs.third')}}</p>
			<p class="others">{{$t('aboutUs.fourth')}}</p>
		</div>
	</div>
</template>

<script>

export default {

  data() {
    return {};
  },
  methods: {

  },
  activated() {

  }
};
</script>

<style lang="less">
	@keyframes lefteaseinAnimate{
		0%{ transform: translateX(-100%); opacity: 0;}
		100%{ transform: translateX(0px); opacity: 1;}
	}
	@-webkit-keyframes lefteaseinAnimate{
	    0%{ -webkit-transform: translateX(-100%); opacity: 0;}
	    100%{ -webkit-transform: translateX(0px); opacity: 1;}
	}
	@-o-keyframes lefteaseinAnimate{
	    0%{ -webkit-transform: translateX(-100%); opacity: 0;}
	    100%{ -webkit-transform: translateX(0px); opacity: 1;}
	}
	@-ms-keyframes lefteaseinAnimate{
	    0%{ -webkit-transform: translateX(-100%); opacity: 0;}
	    100%{ -webkit-transform: translateX(0px); opacity: 1;}
	}
	@-moz-keyframes lefteaseinAnimate{
	    0%{ -webkit-transform: translateX(-100%); opacity: 0;}
	    100%{ -webkit-transform: translateX(0px); opacity: 1;}
	}


		@keyframes righteaseinAnimate{
			0%{ transform: translateX(100%); opacity: 0;}
			100%{ transform: translateX(0px); opacity: 1;}
		}
		@-webkit-keyframes righteaseinAnimate{
		    0%{ -webkit-transform: translateX(100%); opacity: 0;}
		    100%{ -webkit-transform: translateX(0px); opacity: 1;}
		}
		@-o-keyframes righteaseinAnimate{
		    0%{ -webkit-transform: translateX(100%); opacity: 0;}
		    100%{ -webkit-transform: translateX(0px); opacity: 1;}
		}
		@-ms-keyframes righteaseinAnimate{
		    0%{ -webkit-transform: translateX(100%); opacity: 0;}
		    100%{ -webkit-transform: translateX(0px); opacity: 1;}
		}
		@-moz-keyframes righteaseinAnimate{
		    0%{ -webkit-transform: translateX(100%); opacity: 0;}
		    100%{ -webkit-transform: translateX(0px); opacity: 1;}
		}
	.aboutUs_images{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		img{
			width: 100%;
			height: 100%;
		}
		.first{
			font-size: 14px;
			color: #fff;
			width: 80%;
			margin: 20% auto 10%;
			line-height: 24px;
			text-align: left;
			animation: lefteaseinAnimate 1s ease 1;
			-webkit-animation: lefteaseinAnimate 1s ease 1;
		    -ms-animation: lefteaseinAnimate 1s ease 1;
		    -o-animation: lefteaseinAnimate 1s ease 1;
		    -moz-animation: lefteaseinAnimate 1s ease 1;
			 animation-fill-mode:forwards;
		    -webkit-animation-fill-mode: forwards;
		    -o-animation-fill-mode: forwards;
		    -ms-animation-fill-mode: forwards;
		    -moz-animation-fill-mode: forwards;
		}
		.others{
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			width: 80%;
			line-height: 24px;
			text-align: left;
			margin: 4% auto;
			animation: righteaseinAnimate 1s ease 1;
			-webkit-animation: righteaseinAnimate 1s ease 1;
		    -ms-animation: righteaseinAnimate 1s ease 1;
		    -o-animation: righteaseinAnimate 1s ease 1;
		    -moz-animation: righteaseinAnimate 1s ease 1;
			 animation-fill-mode:forwards;
		    -webkit-animation-fill-mode: forwards;
		    -o-animation-fill-mode: forwards;
		    -ms-animation-fill-mode: forwards;
		    -moz-animation-fill-mode: forwards;
		}

	}


</style>
