import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/insta-logo.jpeg';
import './Navbar.css';

const Navbar = ({ login }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/signin');
  };

  const loginStatus = () => {
    const token = localStorage.getItem('jwt');
    if (login || token) {
      return [
        <>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">
            <li>Create Post</li>
          </Link>
          <Link to="/">
            <li
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </li>
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
