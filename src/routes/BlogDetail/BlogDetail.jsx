import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./blogDetail.scss";
import axios from "axios";


const BlogDetail = () => {
  const [isImageExist, setIsImageExist] = useState(true);
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // fetch(`http://localhost:5000/api/posts/${id}`)
    //   .then(response => response.json())
    //   .then(data => setPost(data));

    const fetchPost = async ()=>{
      const fetchedPost = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/${id}`);
      
      setPost(fetchedPost.data);
      // console.log(post);
    }

    fetchPost();
  }, []);

  return (
    post && (
      <div className="blogDetail-container">
        <h1>{post.title}</h1>
        <div className="body">
          <p>{post.content}</p>
          {isImageExist && <img src={post.image} alt=""></img>}
        </div>
      </div>
    )
  );
};

export default BlogDetail;
