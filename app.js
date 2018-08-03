/**
 * Created by Administrator on 2018/8/3.
 */
var fs = require('fs');
var path = require('path');
var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static');
var koaBody = require('koa-body');
var gzip = require('koa-gzip');
var logger = require('koa-logger');

var app = koa();
app.use(koaBody({
  formidable: {uploadDir: __dirname},
  textLimit: '50mb',
  formLimit: '50mb'
}));
app.use(router.routes())
  .use(router.allowedMethods());

// response
app.use(function *(next){
  // (3) 进入 response 中间件，没有捕获到下一个符合条件的中间件，传递到 upstream
  if (this.request.url === '/') {
    this.body = fs.readFileSync(path.resolve(__dirname, './dist/index.html')).toString();
  } else {
    return yield* next;
  }
});

app.use(logger());
app.use(serve(path.join(__dirname, './')));
app.listen( 3000 );
