/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var Link  = ReactRouter.Link;

module.exports = React.createClass({

  render: function() {
    return (
      <nav className="navbar navbar-inverse" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-9">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" href="#">
              <span className="glyphicon glyphicons boat"></span> Harbormaster</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
            <ul className="nav navbar-nav">
              <li>
                <Link href="#"><span className="glyphicon glyphicon-cloud"></span> Hosts</Link>
              </li>
              <li>
                <Link href="/images"><span className="glyphicon glyphicon-hdd"></span> Images</Link>
              </li>
              <li>
                <Link href="/containers">
                  <span className="glyphicon glyphicon-th-large"></span> Containers</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});