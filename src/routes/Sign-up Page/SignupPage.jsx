import React from "react";
import "./signupPage.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function SignUpPage(){
    const [error, setError] = React.useState("");
    const [isDisable, setIsDisable] = React.useState(false);
    const navigate = useNavigate();


    // const handleOpenWidget = () => {
    //     window.cloudinary.openUploadWidget(
    //       {
    //         cloudName: 'dqdtivrox', // Replace with your Cloudinary cloud name
    //         uploadPreset: 'blog-post', // Replace with your upload preset
    //         sources: ['local', 'url'], // Allows users to upload from local files or via URL
    //         multiple: false, // Allows only one file to be uploaded
    //         cropping: true, // Enable cropping functionality
    //         folder: 'blogs-image', // Optional: to specify a folder in your Cloudinary storage
    //       },
    //       (error, result) => {
    //         if (!error && result && result.event === 'success') {
    //           setImageUrl(result.info.secure_url);
    //         }
    //       }
    //     );
    //   };


      async function handleSubmit(e){
        e.preventDefault();
        setError('');
        setIsDisable(true);
        
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const name = formData.get("name");
        const password = formData.get("password");

        try{
        const newUser = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            name: name,
            email: email,
            password: password                                      
        })

        navigate("/login"); 
        } catch(err){
          console.log(err);
            setError(err.response.data);
        }
        
        setIsDisable(false);
      }


    return(
        <div className="signupPage-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="input">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name"></input>
                </div>

                <div className="input">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email"></input>
                </div>

                <div className="input">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"></input>
                </div>

                {/* <div className="input-image">
                    <label>Upload Image:</label>
                    <button type="button" onClick={handleOpenWidget} style={{margin: "3px"}}>
                    Upload
                    </button>
                </div>

                {imageUrl && (
                    <div>
                    <img src={imageUrl} alt="Uploaded" width="100" height="100" />
                    </div>
                )} */}

                <div className="submit-btn">
                <button type="submit" className="btn" disabled={isDisable}>Register</button>
                </div>

                <span className="link"><Link to="/login">Do you have an account?</Link></span>
                {error && <span>{error.message}</span>}
            </form>
        </div>
    )
}