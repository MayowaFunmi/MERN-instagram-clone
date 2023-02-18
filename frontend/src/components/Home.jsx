import React, { useEffect } from 'react';
import user1 from '../images/user1.jpg';
import user2 from '../images/user2.jpg';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);
  return (
    <div className="home">
      {/* card */}
      <div className="card">
        {/* card header */}
        <div className="card-header">
          <div className="card-pic">
            <img src={user1} alt="" />
          </div>
          <h5>User 1</h5>
        </div>
        {/* card image */}
        <div className="card-image">
          <img src={user2} alt="" />
        </div>
        {/* card content */}
        <div className="card-content">
          <span className="material-symbols-outlined">favorite</span>
          <p>1 Like</p>
          <p>This is amazing</p>
        </div>

        {/* comment */}
        <div className="add-comment">
          <span className="material-symbols-outlined">mood</span>
          <input type="text" placeholder="Add a comment" />
          <button className="comment">Post</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
