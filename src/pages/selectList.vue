<style scoped>

</style>
<style media="screen">
	.mint-radiolist{
		font-size: 14px!important;

	}
	input[type="radio"]{appearance: none; -webkit-appearance: none;outline: none;display:none}
	input[type="radio"] {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width: 1em;
    height: 1em;
    margin-right: .4em;
    border-radius: 50%;
    border: 1px solid #999;
    text-indent: .15em;
    line-height: 1;
}
.mint-cell{
	display: block;
	height: 44px;
}
.mint-radio{
	line-height: 44px;
}
.mint-radiolist-label{
	display: flex;
	padding: 0 .2rem;
	border-bottom: none!important;
}
.mint-radio-label{
	line-height: 44px;
}
input[type="radio"]:checked {
    background-color: #26a2ff;
	border: 1px solid #26a2ff;
    background-clip: content-box;
    padding: .2em;
}
</style>
<template>
<Radio
v-model="value"
:options="options">
</Radio>
</template>

<script>
import { Radio } from 'mint-ui';
export default {
	components:{
		Radio
	},
    data() {
		return{
			value:'',
			options:['选项A', '选项B', '选项C']
		}
	},
	props: {

	},
	methods: {

	},
	created(){

		// this.options=['紧急','一般','普通','加急']
		this.options=['中国','俄罗斯','美国','加拿大','英国','德国','法国','瑞士','韩国','日本']
	}
}


</script>
