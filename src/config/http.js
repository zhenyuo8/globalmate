import axios from 'axios';
import util from '../util/index'
import CONFIG from './config';

function getTokenUrl(url){
    if(typeof url !== 'string'){
        return '';
    }
    let token = util.getQueryStringByName('token');
    url += url.indexOf('?') < 0 ? '?' : '';
    // url += '&token=' + token;
    return url.replace('?&', '?');
}
axios.defaults.timeout = 5000;
axios.interceptors.request.use(
    config => {
        let url = getTokenUrl(config.url || ''),
            apiHost = CONFIG[NODE_ENV].apiHost || '';
        if (!/[http|https]:\/\//gi.test(url)) {
            if (NODE_ENV === 'development') { //开发环境
                config.url = apiHost + url;
            } else {
                config.url = apiHost + url;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
