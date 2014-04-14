/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var Link  = ReactRouter.Link;
var Nav  = require('./Nav.jsx');

module.exports = React.createClass({

  render: function() {
    return (
      <div className="MainPage">
        <h1>Hello, anonymous!</h1>
        <p><Link href="/users/doe">Login</Link></p>
      </div>
    );
  }
});