/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync = require('react-async');
var ReactRouter = require('react-router-component');
var Link  = ReactRouter.Link;
var docker = require('docker');
var createCount = require('callback-count');
var last = require('101/last');
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

  getImages: function(cb) {
    docker.listImages(putArgs('images', cb));
  },

  getInitialStateAsync: function(cb) {
    var self = this;
    this.getImages(cb);
  },

  componentWillReceiveProps: function(nextProps) {
    this.getImages(function (err, results) {
      if (err) {
        throw err;
      }
      else {
        this.setState(results);
      }
    });
  },

  render: function () {
    var images = this.props.asyncState.images;
    return (
      <div>
        <Nav></Nav>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Images</h3>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Repository</th>
                <th>Tag</th>
                <th>Id</th>
                <th>Created</th>
                <th>Virtual Size</th>
              </tr>
            </thead>
            <tbody>
              { images.map(this.imageRow) }
            </tbody>
          </table>
        </div>
      </div>
    );
  },

  imageRow: function (image) {
    var repoSplit = last(image.RepoTags).split(':');
    var repo = repoSplit[0];
    var tag  = repoSplit[1];
    return <tr key={ image.Id }>
      <td>{ repo }</td>
      <td>{ tag }</td>
      <td>{ image.Id.slice(0, 12) }</td>
      <td>{ image.Created }</td>
      <td>{ image.VirtualSize }</td>
    </tr>;
  }
});