import React from 'react';
import user1 from '../images/user1.jpg';
import user2 from '../images/user2.jpg';
import './Home.css';

const Home = () => {
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
          <span class="material-symbols-outlined">favorite</span>
          <p>1 Like</p>
          <p>This is amazing</p>
        </div>

        {/* comment */}
        <div className="add-comment">
          <span class="material-symbols-outlined">mood</span>
          <input type="text" placeholder="Add a comment" />
          <button className="comment">Post</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
