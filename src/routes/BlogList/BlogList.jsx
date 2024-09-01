import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./blogList.scss";
import axios from 'axios';
import Card from '../../components/Card/Card';


const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch('http://localhost:5000/api/posts') // Adjust URL for backend
    //   .then(response => response.json())
    //   .then(data => setPosts(data));

    const fetchPosts = async ()=>{
      try{
        const posts = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/`);
        setPosts(posts.data);
        // console.log(posts);
      } catch(err){
        console.log(err);
      }
    }

    fetchPosts();
  }, []);

  return (
      <div className="bloglist-container">
        <h2 className='bloglist-heading'>Posts</h2>
      {posts.map(post => (
        <Card key={post.id} post={post}>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
