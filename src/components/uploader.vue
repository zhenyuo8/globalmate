<template>
    <div class="uploader" id='uploader'>
		<div class="uploader_select">
			<p>
				<input type="button" name="" value="图片" @click='selectPhoto'>
				<input type="file" id='uploader_image' accept="image/*">
			</p>
			<p>
				<input type="button" name="" value="拍照" @click='selectCamera'>
				<input type="file" id='uploader_camra' accept="image/*" capture="camera">
			</p>
		</div>
    </div>
</template>

<script>
	import CONFIG from '../config/config'
	export default {
		components:{

		},
		data(){
			return{
				ossMap:{}
			}
		},
		props:{

		},
		methods:{
			selectCamera(){
				this.$el.querySelector('#uploader_camra').click()
			},
			selectPhoto(){
				this.$el.querySelector('#uploader_image').click()
			},


			changeEventBind(){
				let _this=this;
				$('#uploader_image').on('change',function () {
					this
					let file=this.files[0];
					var formData = new FormData($('#uploader_image')[0]);
            		formData.append('file', file);
				})
			}
		},
		activated(){
			this.changeEventBind();
		},
		created(){

		}
	}
</script>

<style>
	#uploader{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		 background: rgba(0, 0, 0, 0.5);
	}
	.uploader_select{
		width: 60%;
		margin: auto;
		background: #fff;
		position: fixed;
	    max-width: 80%;
	    border-radius: 5px;
	    color: #fff;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    text-align: center;
	    z-index: 1000;
	    -webkit-transition: opacity .3s linear;
	    transition: opacity .3s linear;
		left: 50%;
	    top: 50%;
	    -webkit-transform: translate(-50%, -50%);
	    transform: translate(-50%, -50%);
	}
	.uploader_select p{
		height: 48px;
	}
	.uploader_select p:last-child{
		border-top: 1px solid #eee;
	}
	.uploader_select p input{
		font-size: 16px;
		display: inherit;
	    height: 100%;
	    width: 100%;
	    text-align: center;
	}
	#uploader_camra, #uploader_image{
		display: none;
	}
</style>
