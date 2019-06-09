import React from 'react';
import User from './User';
import CommentList from './CommentList';
import './Post.css';

class Post extends React.Component {
  getAddress(){
    return (
      `${this.props.author.address.city}, ${this.props.author.address.street}, 
    ${this.props.author.address.suite}, ${this.props.author.address.zipcode},`
    )
  }
  render() {
    return (
      <section>
        <h3>{this.props.title}</h3>
        <p>{this.props.text}</p>
        <User name={this.props.author.name} email={this.props.author.email}
              address={this.getAddress()}/>
        <CommentList list={this.props.comments}/>
      </section>

    )
  }
}

export default Post;
