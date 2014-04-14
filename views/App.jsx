/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var Pages = ReactRouter.Pages;
var Page  = ReactRouter.Page;
var Link  = ReactRouter.Link;

var ReactMount = require('react/lib/ReactMount');
ReactMount.allowFullPageRender = true;

var Home = require('./Home.jsx');
var Containers = require('./Containers.jsx');
var Images     = require('./Images.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>Harbormaster: master of the docks</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/css/bootstrap-theme.min.css"/>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/css/bootstrap.min.css"/>
          <link rel="stylesheet" href="/assets/style.css" />
        </head>
        <Pages className="App" path={this.props.path}>
          <Page path="/"           handler={Home} />
          <Page path="/containers" handler={Containers} />
          <Page path="/images"     handler={Images} />
        </Pages>
      </html>
    );
  }
});