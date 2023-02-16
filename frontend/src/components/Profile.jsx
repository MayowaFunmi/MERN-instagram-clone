import React from 'react';
import user2 from '../images/user2.jpg';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img src={user2} alt="" />
        </div>
        {/* profile data */}
        <div className="profile-data">
          <h1>Akinade Mayowa</h1>
          <div className="profile-info" style={{ display: 'flex' }}>
            <p>40 posts</p>
            <p>50 followers</p>
            <p>20 following</p>
          </div>
        </div>
      </div>
      <hr style={{ width: '90%', margin: '25px auto', opacity: '0.8' }} />
      {/* Gallery */}
      <div className="gallery">
        <img src={user2} alt="" />
        <img src={user2} alt="" />
        <img src={user2} alt="" />
        <img src={user2} alt="" />
        <img src={user2} alt="" />
        <img src={user2} alt="" />
        <img src={user2} alt="" />
      </div>
    </div>
  );
};

export default Profile;
