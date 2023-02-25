import React, { useEffect, useState } from 'react';
import user1 from '../images/user1.jpg';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

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

  // show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
      //setItem([]);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

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

  // function to make comment
  const makeComment = (text, id) => {
    fetch('http://localhost:5000/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
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
              <p
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => toggleComment(post)}
              >
                View all comments
              </p>
            </div>

            {/* comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="comment"
                onClick={() => makeComment(comment, post._id)}
              >
                Post
              </button>
            </div>
          </div>
        );
      })}

      {/* show comments */}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              {/* card header */}
              <div
                className="card-header"
                style={{ borderBottom: '1px solid #00000029' }}
              >
                <div className="card-pic">
                  <img src={user1} alt="" />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>
              {/* comment section */}
              <div
                className="comment-section"
                style={{ borderBottom: '1px solid #00000029' }}
              >
                {item.comments.map((comment, index) => {
                  return (
                    <p className="comm" key={index}>
                      <span
                        className="commenter"
                        style={{ fontWeight: 'bolder' }}
                      >
                        {comment.postedBy.name}{' '}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>

              {/* card content */}
              <div className="card-content">
                {item.likes.length === 1 ? (
                  <p>{item.likes.length} Like</p>
                ) : (
                  <p>{item.likes.length} Likes</p>
                )}

                <p>{item.body}</p>
              </div>
              {/* comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="comment"
                  //onClick={() => makeComment(comment, post._id)}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className="close-comment" onClick={() => toggleComment()}>
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
