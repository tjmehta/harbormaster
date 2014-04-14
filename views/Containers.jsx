/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync = require('react-async');
var ReactRouter = require('react-router-component');
var Link  = ReactRouter.Link;
var docker = require('docker');
var asyncMap = require('asyncMap');
var createCount = require('callback-count');
var Nav = require('./Nav');

var asyncMap = require('asyncMap');
var put = function (key) {
  return function (val) {
    var obj = {};
    obj[key] = val;
    return obj;
  };
};
var putArgs = function (key, cb) {
  return function (err, val) {
    cb(err, put(key)(val));
  }
};


module.exports = React.createClass({
  mixins: [ReactAsync.Mixin],

  getContainers: function(cb) {
    docker.listContainers(putArgs('containers', cb));
  },

  getInitialStateAsync: function(cb) {
    this.getContainers(cb);
  },

  componentWillReceiveProps: function(nextProps) {
    this.getContainers(function (err, results) {
      if (err) {
        throw err;
      }
      else {
        this.setState(results);
      }
    });
  },

  render: function() {
    var containers = this.props.asyncState.containers;
    return (
      <div>
        <Nav></Nav>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Containers</h3>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Command</th>
                <th>Created</th>
                <th>Status</th>
                <th>Ports</th>
              </tr>
            </thead>
            <tbody>
              { containers.map(this.containerRow) }
            </tbody>
          </table>
        </div>
      </div>
    );
  },

  containerRow: function (container) {
    return <tr key={ container.Id}>
      <td>{ container.Id.slice(0, 12) }</td>
      <td>{ container.Image }</td>
      <td>{ container.Command }</td>
      <td>{ container.Created }</td>
      <td>{ container.Status }</td>
      <td>{ JSON.stringify(container.Ports) }</td>
    </tr>
  }
});