var last = require('101/last');

module.exports = React.createClass({
  render: function () {
    var image = this.props.image;
    return <tr>
      <td>{ last(image.RepoTags) }</td>
      <td>{ image. }</td>
      <td>{ image. }</td>
      <td>{ image. }</td>
    </tr>;
  }
});