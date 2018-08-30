
const express = require('express')
const http = require('http')
var compression = require('compression')
const app = express()
app.use(compression({ filter: shouldCompress }))

app.get('/dist/static/login.*', function (request, res) {
  let router=  request.query.router
  let options = {
    host: '39.96.134.227',
    path: '/globalmate/rest/wechat/oauth/oauthUrl?redirect=http://glmate.cuibq.com/dist/index.html' + (router ? '?router=' + router : '')
  }
  var req = http.get(options, function (response) {
    var str = '';
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function () {
      let tempt = JSON.parse(str)
      res.redirect(tempt.data);
    });
  });
  req.on('error', (e) => {
    console.log(e);
  });
  req.end();
})

app.use(express.static('./'))

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // 这里就过滤掉了请求头包含'x-no-compression'
    return false
  }
  return compression.filter(req, res)
}
app.listen(3000);

