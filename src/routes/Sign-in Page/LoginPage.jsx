import React from "react";
import "./loginPage.scss";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router";

export default function LoginPage(){
    const [imageUrl, setImageUrl] = React.useState(null);
    const [error, setError] = React.useState("");
    const {updateUser} = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [isDisable, setIsDisable] = React.useState(false);


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
      setError("");
      setIsDisable(true);

      const formData = new FormData(e.target);

      const email = formData.get("email");
      const password = formData.get("password");

      try{
        const user = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          email: email,
          password: password
        }, {withCredentials: true})

        updateUser(user.data);
        navigate("/");
        console.log(user.data);
      } catch(err){
        console.log(err);
        setError(err.response.data);
      }

      setIsDisable(false);
    }


    return(
        <div className="loginpage-container">
             <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>

                <div className="input">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email"></input>
                </div>

                <div className="input">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"></input>
                </div>

                <div className="submit-btn">
                <button type="submit" className="btn" disabled={isDisable}>Login</button>
                </div>
                {error && <span>{error.message}</span>}
            </form>
        </div>
    )
}
