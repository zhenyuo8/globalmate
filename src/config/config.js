module.exports = {
  version: '1.0',
  development: {
    host: window.location.protocol + '//' + window.location.host, //当前域名
    // apiHost: 'http://13ede50d.ngrok.io', //后端接口域名
    apiHost: 'http://47.94.115.87', //后端接口域名
    // apiHost: 'http://10.4.111.31:9090', //后端接口域名
  },
  test: {
    host: window.location.protocol + '//' + window.location.host, //当前域名
    apiHost: 'http://172.20.8.236:10003',
  },
  prevProduction: {
    host: window.location.protocol + '//' + window.location.host, //当前域名
    apiHost: 'http://47.94.115.87', //后端接口域名
  },
  production: {
    host: window.location.protocol + '//' + window.location.host, //当前域名
    apiHost: 'http://47.94.115.87', //后端接口域名
  }
}
