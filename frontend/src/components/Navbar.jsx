import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/insta-logo.jpeg';
import './Navbar.css';

const Navbar = ({ login }) => {
  const loginStatus = () => {
    const token = localStorage.getItem('jwt');
    if (login || token) {
      return [
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">
            <li>Create Post</li>
          </Link>
          <Link to="/">
            <li>Logout</li>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>Login</li>
          </Link>
        </>,
      ];
    }
  };
  return (
    <div className="navbar">
      <img src={logo} alt="" />
      <ul className="nav-menu">{loginStatus()}</ul>
    </div>
  );
};

export default Navbar;
