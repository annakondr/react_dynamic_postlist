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
    this.filterChanged = this.filterChanged.bind(this);
    this.listChanged = this.listChanged.bind(this);
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
          const data = [];
          this.state.posts.forEach((post) => {
            post.author = this.state.authors.find(author => author.id === post.userId);
            post.comments = this.state.comments.filter(comment => comment.postId === post.id);
            data.push(<Post title={post.title} text={post.body} id={post.id}
                                                author={post.author}
                                                comments={post.comments} key={post.id}/>)
          });
          this.setState({
            completedData: data
          });
        });
        xhrComments.send();
      });
      xhrAuthors.send();
    });
    xhrPosts.send();
  }

  filterChanged(event) {
    this.setState({
      filter: event.target.value
    })
  }

  listChanged(event) {
    if (event.key === 'Enter' && this.state.filter.trim() !== '') {
      const filtredPosts = [];
      for (const post of this.state.completedData) {
        if (post.props.text.includes(this.state.filter) || post.props.title.includes(this.state.filter)) {
          filtredPosts.push(post)
        }
      }
      this.setState({
        completedData: filtredPosts
      });
    }
  }

  render() {
    if (!this.state.requested) {
      return <button onClick={this.loadData} className='request'>Show the list!</button>
    } else if (this.state.loaded) {
      return (
        <div>
          <input type='text' placeholder="Search" onChange={this.filterChanged}
                 onKeyDown={this.listChanged} className='filter' key={1} />
          {this.state.completedData }

        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default PostList;
