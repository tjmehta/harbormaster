var App = require('./views/App.jsx');
var React = require('react');

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  };
  window.require = function (name) {
    if (name === 'react') {
      return React;
    }
  }
}