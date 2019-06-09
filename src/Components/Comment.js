import React from 'react';
import User from './User';

class Comment extends React.Component {
  render() {
    return (
      <li>
        <User name={this.props.name}email={this.props.email}/>
        <p>{this.props.text}</p>
      </li>
    )
  }
}
export default Comment;
