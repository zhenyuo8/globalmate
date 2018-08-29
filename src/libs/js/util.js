let pinyin = require("pinyin");
let Re={
	 getQueryStringByName: function(name){
     	var result = window.location.href.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
     	if(result == null || result.length < 1){
     		return "";
     	}
     	return result[1];
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
	},
	getFirstLetter:function(str) {
      return pinyin(str)[0][0].charAt(0).toUpperCase();
    },
	buildLetter:function() {
      let letter = [];
      for (let i = 0; i < 26; i++) {
        let obj = {};
        obj.letter = String.fromCharCode(65 + i);
        obj.citylist = [];
        letter.push(obj);
      }
      return letter;
    },
}
module.exports=Re
