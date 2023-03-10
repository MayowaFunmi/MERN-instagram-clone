import { useState, useEffect } from 'react';
import user2 from '../images/user2.jpg';
import PostDetail from './PostDetail';
import './Profile.css';

const Profile = () => {
  const token = localStorage.getItem('jwt');
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [post, setPost] = useState([]);

  // show and hide comments
  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
      //setItem([]);
    } else {
      setShow(true);
      setPost(posts);
      //console.log('post = ', post);
    }
  };
  useEffect(() => {
    fetch('http://localhost:5000/myposts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result));
  }, [token]);

  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img src={user2} alt="" />
        </div>
        {/* profile data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem('user')).name}</h1>
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
          return (
            <img
              className="item"
              src={x.photo}
              alt=""
              key={x._id}
              onClick={() => {
                toggleDetails(x);
              }}
            />
          );
        })}
      </div>
      {show && <PostDetail item={post} toggleDetails={toggleDetails} />}
    </div>
  );
};

export default Profile;
