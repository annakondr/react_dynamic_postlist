import React from 'react';

import Post from './Post.js';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
      loaded: false,
      completedData: [],
      authors: [],
      posts: [],
      comments: [],
      filter: ''
    };
    this.loadData = this.loadData.bind(this);
   this.createCompletedData = this.createCompletedData.bind(this);
    this.filterChanged = this.filterChanged.bind(this);
  }
  loadData() {
    this.setState({
      requested: true
    });

    const xhrPosts = new XMLHttpRequest();
    xhrPosts.open('GET',  'https://jsonplaceholder.typicode.com/posts');
    xhrPosts.addEventListener('load',() => {
      const xhrAuthors = new XMLHttpRequest();
      xhrAuthors.open('GET',  'https://jsonplaceholder.typicode.com/users');
      xhrAuthors.addEventListener('load',() => {
        const xhrComments = new XMLHttpRequest();
        xhrComments.open('GET',  'https://jsonplaceholder.typicode.com/comments');
        xhrComments.addEventListener('load',() => {
          this.setState({
            loaded: true,
            authors: JSON.parse(xhrAuthors.response),
            posts: JSON.parse(xhrPosts.response),
            comments: JSON.parse(xhrComments.response)
          });
        });
        xhrComments.send();
      });
      xhrAuthors.send();
    });
    xhrPosts.send();
  }

  createCompletedData() {
    this.state.posts.forEach((post) => {
      post.author = this.state.authors.find(author => author.id === post.userId);
      post.comments = this.state.comments.filter(comment => comment.postId === post.id);
      return this.state.completedData.push(<Post title={post.title} text={post.body}
                                                 author={post.author}
                                                 comments={post.comments} key={post.id}/>)
    })
  }

  filterChanged(event) {
    this.setState({
      filter:  event.target.value.trim()
    })
  }

  render() {
    if (!this.state.requested) {
      return <button onClick={this.loadData} className='request'>Show the list!</button>
    } else if (this.state.loaded) {
      this.createCompletedData();
      //console.log (this.state.completedData)
      //   this.state.completedData.forEach(post => {
      //   if(post.props.text.includes(this.state.filter)) {
      //     this.createCompletedData()
      //   }
      // })
      return (
        <div>
          <input type='text' placeholder="Search" onChange={this.filterChanged} key={1}/>
          {this.state.completedData}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default PostList;
