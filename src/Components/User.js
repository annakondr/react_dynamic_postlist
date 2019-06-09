import React from 'react';
import CommentList from './CommentList';

class User extends React.Component {
  render() {
    return (
      <address><a href={"mailto:" + this.props.email}>{this.props.name}</a><br/>
        <span>{this.props.address}</span></address>
    )
  }
}
export default User;
