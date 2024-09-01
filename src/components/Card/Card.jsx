import './card.scss';
import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../../../context/AuthContext";


export default function Card({post}){
    const [error, setError] = React.useState("");
    const [isImageExist, setIsImageExist] = React.useState(post.image?true:false);
    const navigate = useNavigate();
    const {currentUser} = React.useContext(AuthContext);

    async function handleDelete(){
        setError("");

        try{
            const deletedPost = await axios.delete(`${import.meta.env.VITE_API_URL}/api/post/delete/${post.id}`);

            // console.log(deletedPost.data);
            navigate("/");
        } catch(err){
            console.log(err);
            setError(err.response.data);
        }
    } 

    return(
        <div className="card-container">
            <h2 className='title'>{post.title}</h2>
            <p className="nickname">{post.postedBy}</p>
            <div className="mid-body">
                <div className={`text (isImageExist==true)?'exists':''`}>
                    <p>{post.excerpt}</p>
                    <Link to={`/post/${post.id}`} className="link">Read More</Link>
                </div>
                {isImageExist && <img src={post.image} alt="" className='pic'></img>}
            </div>
            {currentUser && (currentUser.id==post.userId) && <div className="buttons">
                <Link to={`/update/${post.id}?title=${post.title}&content=${post.content}&postedBy=${post.postedBy}&userId=${post.userId}`}><button>Update</button></Link>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>}
            {error && <span>{error.message}</span>}
        </div>
    )
}