module.exports = function (env) {
  var NODE_ENV = process.env.NODE_ENV || 'development';
  return NODE_ENV === env
}