/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync = require('react-async');
var ReactRouter = require('react-router-component');
var Link  = ReactRouter.Link;
var docker = require('../lib/docker');
var asyncMap = require('../lib/asyncMap');
var createCount = require('callback-count');
var Nav = require('./Nav.jsx');

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
  };
};


module.exports = React.createClass({
  mixins: [ReactAsync.Mixin],

  getContainers: function(cb) {
    docker.listContainers(putArgs('containers', cb));
  },

  componentWillReceiveProps: function(nextProps) {
    debugger;
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
    var containers = this.state.containers;
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
                <th>Actions</th>
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
    var shortId = container.Id.slice(0, 12);
    return <tr key={ container.Id }>
        <td>{ shortId }</td>
        <td>{ container.Image }</td>
        <td>{ container.Command }</td>
        <td>{ container.Created }</td>
        <td>{ container.Status }</td>
        <td>{ JSON.stringify(container.Ports) }</td>
        <td>
          <span onClick={ this.openContainerModal.bind(this, shortId) }>Inspect</span>
        </td>
    </tr>
  },

  componentDidMount: function () {

  },

  openContainerModal: function (shortId) {

  }
});