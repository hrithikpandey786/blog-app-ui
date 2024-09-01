import "./profile.scss";
import React from "react";
import Card from "../../components/Card/Card";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile(){
    const [posts, setPosts] = React.useState([]);
    const {currentUser, updateUser} = React.useContext(AuthContext);
    const [user, setUser] = React.useState(currentUser || "");
    const {id} = useParams();
    const navigate = useNavigate();
    const [isDisable, setIsDisable] = React.useState(false);
    const [error, setError] = React.useState("");


    React.useEffect(()=>{
        async function fetchPosts(){
            try{
                const posts = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/profile/${currentUser.id}`);
    
                // console.log(posts);
                setPosts(posts.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchPosts();
    }, [])


    async function handleLogout(){
        setIsDisable(true);
        setError("");

        try{
            const user = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {},{
                withCredentials: true
            });
            // console.log(user.data);
            updateUser(null);
            navigate("/");
        } catch(err){
            console.log(err);
            setError(err.response.data);
        }

        setIsDisable(false);
    }


    return(
        <div className="profile-container">
            <h2>Profile</h2>
            <div className="top-section">
                <div className="name-email">
                    <div className="name">
                        <p>Name:</p>
                        <p>{user.name}</p>
                    </div>  

                    <div className="email">
                        <p>Email:</p>
                        <p>{user.email}</p>
                    </div>

                    <div className="profile-pic">
                        <label>Avatar:</label>
                        <img src={user.avatar || "/no-user.webp"} alt=""></img>
                    </div>
                </div> 

                <div className="pic-button">

                    <div className="buttons">
                        <button><Link to={`/updateprofile/${currentUser.id}?name=${currentUser.name}&email=${currentUser.email}`}>Update Profile</Link></button>
                        <button className="logout-btn" onClick={handleLogout} disabled={isDisable}>Logout</button>
                        {error && <span>{error.message}</span>}
                    </div>
                </div>
            </div>

            <div className="bottom-section">
                <h2 className="posts-heading">Your Posts</h2>
                {/* {fetchPosts} */}
                {
                    posts.map(post=>{
                        return <Card post={post} key={post.id}/>
                    })
                }            
            </div>
        </div>
    )
}