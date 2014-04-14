var App = require('./views/App.jsx');

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  };
}