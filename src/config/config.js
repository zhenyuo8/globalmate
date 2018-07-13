module.exports = {
  version: '1.0',
  development: {
    host: window.location.protocol + '//' + window.location.host, //当前域名
    apiHost: 'http://ys.chaoke.com:91', //后端接口域名
    // apiHost: 'http://10.4.111.23:9090/globalmate/index.jsp', //后端接口域名
  },
  test: {
    host: window.location.protocol + '//' + window.location.host, //当前域名
    apiHost: 'http://ys.chaoke.com:91',
    // apiHost: 'http://123.103.9.190:81',
  },
  prevProduction: {
    host: window.location.protocol + '//' + window.location.host, //当前域名
    apiHost: 'https://ys.esn.ren', //后端接口域名
  },
  distProduction: {
    host: window.location.protocol + '//' + window.location.host, //当前域名
    apiHost: 'https://ys.yyuap.com', //后端接口域名
  }
}
