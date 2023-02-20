import React, { useEffect, useState } from 'react';
import user1 from '../images/user1.jpg';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const user = localStorage.getItem('user');

    if (!token && !user) {
      navigate('/signin');
    }

    // fetching all posts
    fetch('http://localhost:5000/allposts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, [navigate]);

  const likePost = (id) => {
    fetch('http://localhost:5000/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  const unLikePost = (id) => {
    fetch('http://localhost:5000/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
        //console.log(result);
      });
  };

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
              {post.likes.includes(
                JSON.parse(localStorage.getItem('user'))._id
              ) ? (
                <span
                  className="material-symbols-outlined red"
                  onClick={() => {
                    unLikePost(post._id);
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    likePost(post._id);
                  }}
                >
                  favorite
                </span>
              )}
              <p>{post.likes.length} Likes</p>
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
