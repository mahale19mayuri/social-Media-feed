import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`)
      .then(response => response.json())
      .then(data => setPosts([...posts, ...data]))
      .catch(error => console.log(error));
  }, [page]);

  const handleLike = postId => {
    setLikes(likes + 1);
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <input type="text" placeholder="Search by title" onChange={handleSearch} />
      <div className="post-list">
        
          {filteredPosts.map(post => (
          <Post key={post.id} post={post} onLike={handleLike} />
        ))}
      </div>
      <button onClick={handleLoadMore} className='btn'>Load More Posts</button>
    </div>
  );
}

function Post({ post, onLike }) {
  return (
    <div className="post mainitembox ">
     
      <img src={`https://picsum.photos/200?random=${post.id}`} alt="Post" className='image'/>
      <div className="post-content">
        <p className='title'><b>User id -</b>{post.userId}</p>
        <p className='title'><b>Title - </b>{post.title}</p>
        <p className='title'><b>Likes -</b>{post.likes || 1}</p>
        <button onClick={() => onLike(post.id)} className ='rebtn'>Like Post</button>
      </div>
    </div>
  );
}

export default App;