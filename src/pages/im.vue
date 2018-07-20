<template>
	<div class="um-win um-page" id="main">
		<div class="um-content p5" id="content">
			<div id="convo">
				<ul class="chat-thread" id="chat-thread">

				</ul>
			</div>
		</div>
		 <div class="um-footer">
			<div class="chat-input-box">
				<img src="../assets/images/speech.png" alt="" class="change-input-type" data-flag='speech'/>

				<div class="show-input">
					<input type="text" class="form-control chat-input" placeholder="" v-model='chartValue'/>
					<button class="btn chat-send" @click='createUserTalk'>
						发送
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data(){
        return{
			chartValue:'',
			index:0
        }
    },
    methods:{
		createUserTalk() {
			if(!this.chartValue) return;
			let headerPath = "../assets/images/icon.png";
			let li=document.createElement('li');
			let img=document.createElement('img');
			let div=document.createElement('div');
			div.className='chat-item-text';
			img.src="../assets/images/icon.png";

			if(this.index%2===0){
				li.className='right-item';
				
			    // let $li = $('<li class="right-item"> <img src="../assets/images/icon.png" alt=""/> <div class="chat-item-text">' + this.chartValue + '</div> </li>');
				//  $('#chat-thread').append($li);
			}else {
				li.className='left-item';
				let $li = $('<li class="left-item"> <img src="'+headerPath+'" alt=""/> <div class="chat-item-text ">'+this.chartValue+'</div> </li>');
				 $('#chat-thread').append($li);
			}
			this.index++;
			this.chartValue=''
		    let top = $('#convo').height();
		    $('#content').animate({
		        scrollTop: top
		    }, 100);
		}
    },
    created(){

    }
}
</script>

<style>
@import "../assets/css/im.css";
#main{
	background-color:#f4f4f4
}
</style>
