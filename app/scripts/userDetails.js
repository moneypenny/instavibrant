'use strict';
var Instagram = require('./instagram'),
    React = require('react'),
    LocalStorage = require('./localStorage');
var UserDetails = React.createClass({
  getInitialState: function() {
    return {user: {}};
  },
  componentDidMount: function() {
    Instagram.getUser().then(function(userData) {
      LocalStorage.set('user', userData.data.username);
      this.setState({user: userData.data});
    }.bind(this), function() {
      console.error('failed to fetch Instagram user details');
    });
  },
  render: function() {
    var url = this.state.user.website ||
              'https://instagram.com/' + this.state.user.username;
    return (
      <ul className="user-details right">
        <li className="instagram-user">
          <a href={url} className="name-and-avatar cyan-text text-darken-2" target="_blank">
            <img src={this.state.user.profile_picture} alt={this.state.user.username} className="avatar"/>
            <span className="name">{this.state.user.full_name}</span>
          </a>
        </li>
        <li className="logout-list-item">
          <a href="/#/logout" className="logout-link cyan-text text-darken-2">Log Out</a>
        </li>
      </ul>
    );
  }
});
module.exports = UserDetails;
