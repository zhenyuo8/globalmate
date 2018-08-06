let Re={
	getQuery:function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	},
	timestampToTime:function (time) {
		let date = new Date(time);
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		let D = date.getDate() + '';
		let h = date.getHours() + ':';
		let m = date.getMinutes() + ':';
		let s = date.getSeconds();
		return Y+M+D;
	},
	setCookie:function (name, value, times) {
		let date = new Date();
    	date.setTime(date.getTime() + times);
    	document.cookie = name + '=' + value + ';expires=' + date;
	},
	getCookie:function (name) {
		let arr;
        let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
         return unescape(arr[2]);
       else
         return null;
	}
}
module.exports=Re
