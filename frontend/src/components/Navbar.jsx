import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/insta-logo.jpeg';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="" />
      <ul className="nav-menu">
        <Link to="/signup">
          <li>SignUp</li>
        </Link>
        <Link to="/signin">
          <li>Login</li>
        </Link>
        <Link to="/profile">
          <li>Profile</li>
        </Link>
        <Link to="/createPost">
          <li>Create Post</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
