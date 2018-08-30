
const express = require('express')
const http = require('http')
const https = require('https')
const crypto = require('crypto')
var compression = require('compression')
const app = express()
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})
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

function getAccessToken (res, appId, appSecret, callback1, callback2) {
  let options = {
    host: 'api.weixin.qq.com',
    path: `/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
  }
  var req = https.get(options, function (response) {
    var str = '';
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function () {
      let tempt = JSON.parse(str)
      if (tempt["access_token"]) {
        callback1(res, tempt["access_token"], callback2)
      } else {
        res.send('error')
      }
    });
  });
  req.on('error', (e) => {
    console.log(e);
  });
  req.end();
}
function getTicket (res, token, callback) {
  let options = {
    host: 'api.weixin.qq.com',
    path: `/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`
  }
  var req = https.get(options, function (response) {
    var str = '';
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function () {
      let tempt = JSON.parse(str)
      if (tempt && tempt.ticket) {
        callback(tempt.ticket, token)
      } else {
        res.send('error')
      }
    });
  });
  req.on('error', (e) => {
    console.log(e);
  });
  req.end();
}
function generateSign (options, ticket, token) {
  let str = `jsapi_ticket=${ticket}&noncestr=${options.str}&timestamp=${options.timeStamp}&url=${options.url}`
  let sha1 = crypto.createHash('sha1')
  sha1.update(str)
  // options.res.send(JSON.stringify({
  //   sign: sha1.digest('hex'),
  //   token
  // }))
  let sign = sha1.digest('hex');
  options.res.json(JSON.stringify({
    sign: sign,
    token: token
  }))
}
app.get('/getSignature', (request, res) => {
  let str = request.query.str;
  let timeStamp = request.query.timeStamp;
  let url = request.query.url;
  let appId = request.query.appId;
  let appSecret = request.query.appSecret;
  getAccessToken(res, appId, appSecret, getTicket, generateSign.bind(null, {
    res,
    str,
    timeStamp,
    appId,
    appSecret,
    url
  }))
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

