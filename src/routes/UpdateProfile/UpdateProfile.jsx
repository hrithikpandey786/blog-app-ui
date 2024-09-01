import React from "react";
import "./updateProfile.scss";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function UpdateProfile(){
    const [searchParams] = useSearchParams();
    const [imageUrl, setImageUrl] = React.useState(null);
    const [error, setError] = React.useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const {currentUser, updateUser} = React.useContext(AuthContext);


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


      const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        
        const formData = new FormData(e.target);
        const name = searchParams.get("name");
        const email = searchParams.get("email");
        const password = formData.get("password");
        const avatar = imageUrl;

        try{
            const updatedDetails = await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/update/${id}`,{
                name, email, password, avatar
            })
            
            console.log(updatedDetails.data);
            updateUser(updatedDetails.data);
            navigate(`/profile/${id}`);
        } catch(err){
            console.log(err);
        }
      }

    return(
        <div className="updateProfile-container">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="input">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={searchParams.get('name')} disabled></input>
                </div>

                <div className="input">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" value={searchParams.get('email')} disabled></input>
                </div>

                <div className="input">
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name="password"></input>
                </div>

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

                <div className="submit-btn">
                    <button className="button">Submit</button>
                </div>
            </form>
        </div>
    )
}