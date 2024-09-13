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
    const [numberOfLikes, setNumberOfLikes] = React.useState(post.likes.length);
    const [isDisable, setIsDisable] = React.useState(false);
    const [liked, setLiked] = React.useState((currentUser && post.likes.includes(currentUser.id))?true:false);
    async function handleDelete(){
        setError("");
        setIsDisable(true);

        try{
            const deletedPost = await axios.delete(`${import.meta.env.VITE_API_URL}/api/post/delete/${post.id}`);
            // console.log(deletedPost.data);
            navigate("/");
        } catch(err){
            console.log(err);
            setError(err.response.data);
        }

        setIsDisable(false);
    } 


    const handleLike = async ()=>{
        try{
            if(!currentUser){
                navigate("/login");
            }

            if(liked==true){
                const index = post.likes.indexOf(currentUser.id);
                
                if(index!=-1){
                    post.likes.splice(index, 1);    
                }
                setLiked(false);
            } else{
                post.likes.push(currentUser.id);
                setLiked(true);
            }
            
            const updatedPost = await axios.put(`${import.meta.env.VITE_API_URL}/api/post/update/${post.id}`, {
                    title: post.title,
                    excerpt: post.excerpt,
                    content: post.content,
                    image: post.imageUrl,
                    postedBy: post.postedBy,
                    category: post.category,
                    userId: post.userId,
                    likes: post.likes
                });

                setNumberOfLikes(post.likes.length);
                
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
            <div className="bottom-section">
            <div className='like-section'>
                {liked?<img src="/liked.png" alt="" onClick={handleLike}></img>:<img src="/unliked.png" alt="" onClick={handleLike}></img>}
                {numberOfLikes>1 && <p>{numberOfLikes-1}</p>}
            </div>
            <div className='update-section'>
                {currentUser && (currentUser.id==post.userId) && <div className="buttons">
                    <Link to={`/update/${post.id}?title=${post.title}&content=${post.content}&postedBy=${post.postedBy}&likes=[${post.likes}]&userId=${post.userId}`}><button>Update</button></Link>
                    <button className="delete-btn" onClick={handleDelete} disabled={isDisable}>Delete</button>
                </div>}
            </div>
            </div>
            {error && <span>{error.message}</span>}
        </div>
    )
}