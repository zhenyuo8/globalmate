export default {
    /*
     * 获取URL中某个queryString的值
    */
    getQueryStringByName: function(name){
    	var result = window.location.href.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    	if(result == null || result.length < 1){
    		return "";
    	}
    	return result[1];
    },
    /*
     * 拼接URL
    */
    getUrl : function(url, params){
        let tmp = [];
        if(typeof url !== 'string'){
            return '';
        }
        for(let item in params) {
            tmp.push([item, params[item]].join('='));
        }
        if(tmp.length){
            url += url.indexOf('?') > 0 ? '' : '?';
            url += tmp.join('&');
            url = url.replace('?&', '?');
        }
        return url;
    }
}
