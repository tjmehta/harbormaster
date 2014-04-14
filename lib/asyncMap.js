var createCount = require('callback-count');

module.exports = function asyncMap (arr, fn, cb) {
  if (!Array.isArray(arr)) {
    throw new Error('asyncMap expects an array.');
  }
  if (arr.length === 0) {
    return cb(null, []);
  }
  var count = createCount(arr.length, cb);
  arr.forEach(function (item) {
    fn(item, count.next);
  });
};