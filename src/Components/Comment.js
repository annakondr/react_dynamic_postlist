import React from 'react';
import User from './User';

function Comment(props) {
  return (
    <li>
      <User name={props.name}email={props.email}/>
      <p>{props.text}</p>
    </li>
  )
}

export default Comment;
