import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./blogList.scss";
import axios from 'axios';
import Card from '../../components/Card/Card';


const BlogList = () => {
  const [posts, setPosts] = useState([]);


  const handleChange = async (e)=>{
    e.preventDefault();
    
    try{
      const posts = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/category/posts?category=${e.target.value}`);
      // console.log(posts);
      setPosts(posts.data);
    } catch(err){
      console.log(err);
    }
  }



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
        <div className='category-dropdown'>
          {/* <label for="dropdown">Select: </label> */}
          <select id="dropdown" name="options" onChange={handleChange}>
          <option value="" disabled selected>Category</option>
            <option value="Personal Blogs">Personal Blogs</option>
            <option value="Business/Corporate Blogs"> Business/Corporate Blogs</option>
            <option value="Fashion Blogs">Fashion Blogs</option>
            <option value="Blog Newsletters">Blog Newsletters</option>
            <option value="Lifestyle Blogs">Lifestyle Blogs</option>
            <option value="Travel Blogs">Travel Blogs</option>
            <option value="Food Blogs">Food Blogs</option>
            <option value="Affiliate/Review Blogs">Affiliate/Review Blogs</option>
            <option value="Other">Other</option>
          </select>
        </div>

      {posts.map(post => (
        <Card key={post.id} post={post}>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
