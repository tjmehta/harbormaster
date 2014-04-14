module.exports = function () {
  return function *(next) {
    var normalized =
      sliceTrailingSlash(
        this.url.toLowerCase()
      );
    if (normalized !== this.url) {
      this.redirect(normalized);
    }
    else {
      yield next;
    }
  };
}

function sliceTrailingSlash (url) {
  if (url[url.length - 1]==='/') {
    url = url.slice(0, -1);
  }
  return url;
}