import React from 'react';
import Comment from './Comment';

class CommentList extends React.Component {
  render() {
    const commentList = [];
    this.props.list.forEach((item) => {
      commentList.push(<Comment text={item.body} name={item.name}
                                id={item.postId} email={item.email} key={item.id}/>)
    });
    return (
      <ul>
        {commentList}
      </ul>
    )
  }
}

export default CommentList;
