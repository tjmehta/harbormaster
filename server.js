var path        = require('path');
var url         = require('url');
var koa         = require('koa');
var nodejsx     = require('node-jsx').install({ harmony: true, extension:'.jsx' });

var development = process.env.NODE_ENV !== 'production';

// koa
var koa      = require('koa');
var compress = require('koa-compress');
var time     = require('koa-response-time');
var mount    = require('koa-mount');
var serve    = require('koa-static');
var env      = require('./lib/env');
var bundler  = require('./lib/mw/bundler');
var render   = require('./lib/mw/koa-react');
var normalize= require('./lib/mw/normalize');
var App      = require('./views/App');
// var livereload = require('koa-livereload');

var app = module.exports = koa();

app.use(time());
app.use(compress());
if (env('development')) {
  app.use(mount('/assets/bundle.js', bundler));
}
app.use(mount('/assets', serve('./assets')));
app.use(normalize());
app.use(mount('/api', require('./lib/api')));
app.use(render(App));

app.listen(process.env.PORT || 3000, function() {
  console.log('Point your browser at http://localhost:3000');
});

// docker proxy
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({ ws: true });

require('http').createServer(function(req, res) {
  res.setHeader('access-control-allow-origin', 'http://localhost:3000');
  res.setHeader('access-control-allow-credentials', 'true');
  proxy.web(req, res, { target: 'http://localhost:4243' });
}).listen(4244);