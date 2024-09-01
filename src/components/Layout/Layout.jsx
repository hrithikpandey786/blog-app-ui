// src/App.js
import React from 'react';
// import Header from './components/Header';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { AuthContext } from '../../../context/AuthContext';
import "./layout.scss";
import { useNavigate, Outlet, Navigate } from 'react-router';

export function Layout() {
  return (
    <div className="App">
      <Header />
      <Outlet/>
      <Footer />
    </div>
  );
}

export function RequireAuthLayout() {
  const {currentUser} = React.useContext(AuthContext);
  const navigate = useNavigate();

  if(!currentUser){
    return <Navigate to="/login"/>
  }

  return (
    <div className="App">
      <Header />
      <Outlet/>
      <Footer />
    </div>
  );
}
