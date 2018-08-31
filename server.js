
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
      console.log(str)
      let tempt = JSON.parse(str)
      res.redirect(tempt.data);
    });
  });
  req.on('error', (e) => {
    console.log(e);
  });
  req.end();
})

function getAccessToken (appId, appSecret) {
  return new Promise((resolve, reject) => {
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
          resolve(tempt["access_token"])
        } else {
          reject('error1')
        }
      });
    });
    req.on('error', (e) => {
      console.log(e);
    });
    req.end();
  })
}
function getTicket (token) {
  return new Promise((resolve, reject) => {
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
          resolve({ticket: tempt.ticket, token})
        } else {
          reject('error2')
        }
      });
    });
    req.on('error', (e) => {
      console.log(e);
    });
    req.end();
  })
}
function generateSign (ticket, token, noncestr, timeStamp, url) {
  return new Promise((resolve, reject) => {
    let str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timeStamp}&url=${url}`
    let sha1 = crypto.createHash('sha1')
    sha1.update(str)
    let sign = sha1.digest('hex');
    resolve(JSON.stringify({
      sign: sign,
      token: token,
      ticket: ticket
    }))
  })
}
app.get('/getSignature', (request, res) => {
  let str = request.query.str;
  let timeStamp = request.query.timeStamp;
  let url = request.query.url;
  let appId = request.query.appId;
  let appSecret = request.query.appSecret;
  getAccessToken(appId, appSecret).then(token => {
    return getTicket(token)
  }).then(({ticket, token}) => {
    return generateSign(ticket, token, str, timeStamp, url)
  }).then(sign => {
    res.json(sign)
  }).catch(msg => {
    res.send(JSON.stringify(msg))
  })
})
app.get('getCode', (req, res) => {
  console.log(req.query.code)
  res.send()
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

