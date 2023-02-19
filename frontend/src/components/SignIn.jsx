import React, { useState, useContext } from 'react';
import './SignIn.css';
import logo from '../images/insta-logo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';

const SignIn = () => {
  //const { setUserLogin } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    // validating email
    if (!emailRegex.test(email)) {
      notifyError('Email is invalid!!!');
      return;
    } else if (!passwordRegex.test(password)) {
      notifyError(
        'Password must contain at least 8 characters including one number, one uppercase letter, one lower case letter and a special character!'
      );
      return;
    }
    // sending data to server
    fetch('http://localhost:5000/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyError(data.error);
        } else {
          notifySuccess(data.message);
          //console.log(data.token);
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          //setUserLogin(true);
          navigate('/');
        }
      });
  };

  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            id="login-btn"
            value="LogIn"
            onClick={() => {
              postData();
            }}
          />
        </div>
        <div className="loginForm2">
          Don't have an account?
          <Link to="/signup">
            <span style={{ color: 'blue', cursor: 'pointer' }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
