import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './components/CreatePost';
import { LoginContext } from './context/LoginContext';
import Modal from './components/Modal';

function App() {
  const [userLogin, setUserLogin] = useState(false);
  return (
    <Router>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
          <ToastContainer theme="dark" />
          <Modal></Modal>
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;
