// src/components/NewPost.js
import React, { useState } from 'react';
import "./updatePost.scss";
import axios from "axios";
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const UpdatePost = () => {
  const {id} = useParams();
  const [searchParams] = useSearchParams();
  // const queryParams = new URLSearchParams(url.split('?')[1]);
  const [title, setTitle] = useState(searchParams.get('title'));
  const [content, setContent] = useState(searchParams.get('content'));
  const [postedBy, setPostedBy] = useState(searchParams.get('postedBy'));
  const [userId, setUserId] = useState(searchParams.get('userId'));  
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [isDisable, setIsDisable] = React.useState(false);


  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsDisable(true);
    const stringArray = content.split(' ');
    const extractedString = stringArray.slice(0, 30);
    const excerpt = extractedString.join(' ');

    try{
      const updatedPost = await axios.put(`${import.meta.env.VITE_API_URL}/api/post/update/${id}`, {
        title: title,
        excerpt: excerpt,
        content: content,
        image: imageUrl,
        postedBy: postedBy,
        userId: userId
      })

      navigate("/");    
    } catch(err){
      console.log(err);
    }

    setIsDisable(false);
  };


  const handleOpenWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dqdtivrox', // Replace with your Cloudinary cloud name
        uploadPreset: 'blog-post', // Replace with your upload preset
        sources: ['local', 'url'], // Allows users to upload from local files or via URL
        multiple: false, // Allows only one file to be uploaded
        cropping: true, // Enable cropping functionality
        folder: 'blogs-image', // Optional: to specify a folder in your Cloudinary storage
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  };


  return (
    <form onSubmit={handleUpdate}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div>
        <label>Upload Image:</label>
        <button type="button" onClick={handleOpenWidget} style={{margin: "5px"}} className='btn'>
          Upload
        </button>
      </div>

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" width="100" height="100" />
        </div>
      )}

      <label>Content:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit" className='btn' disabled={isDisable}>Update Post</button>
    </form>
  );
};

export default UpdatePost;
