var browserify = require('connect-browserify')('./client', {
  debug: true,
  watch: true
});

module.exports = adaptor(browserify);

function adaptor (mw) {
  return function *(next) {
    if (this.url === '/') {
      var self = this;
      var req = {};
      var res = {};
      res.setHeader = this.set.bind(this);
      res.send = function (data) {
        self.body = data;
      };
      res.end = res.send;
      yield mw(req, res, next);
    }
    else {
      yield next;
    }
  };
}