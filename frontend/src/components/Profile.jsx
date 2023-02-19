import { useState, useEffect } from 'react';
import user2 from '../images/user2.jpg';
import './Profile.css';

const Profile = () => {
  const token = localStorage.getItem('jwt');
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/myposts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

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
        {data.map((x) => {
          return <img className="item" src={x.photo} alt="" key={x._id} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
