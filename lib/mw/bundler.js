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
      thenext = function (err) {
        console.error(err);
        self.status = 500;
        self.body = err.stack;
      };
      yield mw(req, res, thenext);
    }
    else {
      yield next;
    }
  };
}