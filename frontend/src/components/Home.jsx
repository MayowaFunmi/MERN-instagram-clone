import React, { useEffect, useState } from 'react';
import user1 from '../images/user1.jpg';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/signin');
    }

    // fetching all posts
    fetch('http://localhost:5000/allposts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, [navigate]);
  return (
    <div className="home">
      {/* card */}
      {data.map((post) => {
        return (
          <div className="card" key={post._id}>
            {/* card header */}
            <div className="card-header">
              <div className="card-pic">
                <img src={user1} alt="" />
              </div>
              <h5>{post.postedBy.name}</h5>
            </div>
            {/* card image */}
            <div className="card-image">
              <img src={post.photo} alt="" />
            </div>
            {/* card content */}
            <div className="card-content">
              <span className="material-symbols-outlined">favorite</span>
              <p>1 Like</p>
              <p>{post.body}</p>
            </div>

            {/* comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input type="text" placeholder="Add a comment" />
              <button className="comment">Post</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
