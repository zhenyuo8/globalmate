
const express = require('express')

var compression = require('compression')
const app = express()
app.use(compression({ filter: shouldCompress }))
app.use(express.static('./'))

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // 这里就过滤掉了请求头包含'x-no-compression'
    return false
  }
  return compression.filter(req, res)
}
app.listen(3001);