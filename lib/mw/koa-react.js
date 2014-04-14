var path = require('path');
var ReactAsync = require('react-async');

module.exports = function (App) {
  var urlsRegExps = extractPaths(App);
  return function *(next) {
    if (urlsRegExps.some(matches(this.url))) {
      var app = App({ path: this.url });
      this.body = yield function (cb) {
        ReactAsync.renderComponentToStringWithAsyncState(app, function (err, markup, data) {
          if (err) {
            cb(err);
          }
          else {
            cb(null, ReactAsync.injectIntoMarkup(markup, data, ['/assets/bundle.js']));
          }
        });
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

  var urlsRegExps = template.match(urlsRE)
    .map(function (match) {
      match = match.replace('path:','').slice(1, -1); // chop 'path:' and quotes
      match = match.replace(/\/:[^\/]+/g, '\/[^\/]+'); // replace url params with wildcard re
      return new RegExp(match);
    });

  return urlsRegExps;
}

function matches (str) {
  return function (re) {
    return re.test(str);
  };
}