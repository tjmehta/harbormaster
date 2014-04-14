var path = require('path');
var ReactAsync = require('react-async');
var slice = require('function-proxy').slice;

module.exports = function (App) {
  var urls = extractPaths(App);
  return function *(next) {
    if (~urls.indexOf(this.url)) {
      var app = App({ path: this.url });
      this.body = yield function (cb) {
        ReactAsync.renderComponentToStringWithAsyncState(app, slice(cb, 0, 2));
      };
    }
    else {
      yield next;
    }
  };
};

function extractPaths (App) {
  var template = App.originalSpec.render.toString();
  var urlsRE  = new RegExp(/path:["']([^"']+)["']/g);

  var urls = template.match(urlsRE).map(function (match) {
    return match.replace('path:','').slice(1, -1); // chop 'path:' and quotes
  });

  return urls;
}