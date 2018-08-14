let Re={
	getQuery:function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
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
