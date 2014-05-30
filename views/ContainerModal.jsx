/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync = require('react-async');
var ReactRouter = require('react-router-component');
var Link  = ReactRouter.Link;
var docker = require('../lib/docker');

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
  getContainerInfo: function (cb) {
    docker.getContainer(this.props.container.Id)
      .inspect(putArgs('containerInfo', cb));
  },
  getContainerStreams: function (cb) {

  },
  getContainer: function (cb) {
    this.getContainerInfo(cb);
  },
  getInitialStateAsync: function (cb) {
    this.getContainer(function (err, state) {
      console.log(state);
      cb(err, state);
    });
  },
  componentWillReceiveProps: function (nextProps) {
    debugger;
    if (this.props.container.Id !== nextProps.container.Id) {
      this.getContainer(function (err, state) {
        if (err) {
          throw err;
        }
        this.setState(state);
      }.bind(this));
    }
  },
  componentDidMount: function () {
    this.show();
  },
  show: function () {
    $(this.getDOMNode()).modal('show');
  },
  render: function () {
    var containerInfo = this.state.containerInfo;
    console.log(this.state);
    return (
      <div className="modal fade" style={{display:'block'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title" id="myModalLabel">Container</h4>
            </div>
            <div className="modal-body">
              {JSON.stringify(containerInfo)}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Stop</button>
              <button type="button" className="btn btn-primary">Start</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});