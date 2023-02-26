import React from 'react';
import './PostDetail.css';
import user1 from '../images/user1.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PostDetail = ({ item, toggleDetails }) => {
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const navigate = useNavigate();

  const removePost = (postId) => {
    fetch(`http://localhost:5000/deletePost/${postId}`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          notifyError(result.error);
        } else {
          navigate('/');
          notifySuccess(result.message);
        }
      });
  };

  return (
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
            <div
              className="deletePost"
              onClick={() => {
                removePost(item._id);
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>
          {/* comment section */}
          <div
            className="comment-section"
            style={{ borderBottom: '1px solid #00000029' }}
          >
            {item.comments.map((comment, index) => {
              return (
                <p className="comm" key={index}>
                  <span className="commenter" style={{ fontWeight: 'bolder' }}>
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
              //   value={comment}
              //   onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="comment"
              //   onClick={() => {
              //     makeComment(comment, item._id);
              //     toggleComment();
              //   }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="close-comment" onClick={() => toggleDetails()}>
        <span className="material-symbols-outlined material-symbols-outlined-comment">
          close
        </span>
      </div>
    </div>
  );
};

export default PostDetail;
