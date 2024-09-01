import React from 'react';
import "./header.scss";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext.jsx';


const Header = () => {
  const {currentUser, updateUser} = React.useContext(AuthContext);
  const [isLogin, setIsLogin] = React.useState(currentUser?true:false);
  
  
  React.useEffect(()=>{
      setIsLogin(prev=>!prev);
  },[], [currentUser])
  
  
  return (<header>
    <nav className='navbar'>
      <div className='options'>
        <h1>My Blog</h1>
        <p><Link to={"/"}>Home</Link></p>
        <p><Link to={"/newBlog"}>Add Post</Link></p>      
      </div>
      <div className="user-section">
        {currentUser?
        <div className='profile-section'>
          <p>Howdy, {currentUser && currentUser.name.split(" ")[0]}</p>          
          <Link to={`/profile/${currentUser.id}`}><img src={currentUser.avatar || "/no-user.webp"} alt=""></img></Link>
        </div>:
        <div className='sign-in-options'>
          <p><Link to="/login">Sign In</Link></p>
          <p><Link to="/signup">Sign Up</Link></p>          
        </div>
        }
      </div>      
    </nav>
  </header>
  )
};

export default Header;