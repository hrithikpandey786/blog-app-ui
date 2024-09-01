// src/components/NewPost.js
import React, { useState } from 'react';
import "./newPost.scss";
import axios from "axios";
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';


const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [selectedImage, setSelectedImage] = React.useState("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const {currentUser} = React.useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stringArray = content.split(' ');
    const extractedString = stringArray.slice(0, 30);
    const excerpt = extractedString.join(' ');
    console.log(imageUrl);

    try{
      const newPost = await axios.post(`${import.meta.env.VITE_API_URL}/api/post/add`, {
        title: title,
        excerpt: excerpt,
        content: content,
        userId: currentUser.id,
        postedBy: currentUser.name,
        image: imageUrl || ""
      })

      console.log(newPost.data); 
      navigate("/");   
    } catch(err){
      console.log(err);
    }
  };

  // function handleImageChange(e){
  //   setSelectedImage(URL.createObjectURL(e.target.files[0]));
  // }
  
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
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
       {/* <div>
        <label>Upload Image:</label>
        <input type="file" onChange={handleImageChange} />
      </div> */}

      {/* {selectedImage && (
        <div>
          <img src={selectedImage} alt="Preview" width="100" height="100" />
        </div>
      )} */}

      <div>
        <label>Upload Image(Optional):</label>
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
      <button type="submit" className='btn'>Add Post</button>
    </form>
  );
};

export default NewPost;
