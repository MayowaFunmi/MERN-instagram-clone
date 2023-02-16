import React, { useState } from 'react';
import user3 from '../images/user3.jpg';
import './CreatePost.css';
import imageIcon from '../images/image_icon.png';

const CreatePost = () => {
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');

  const postDetails = () => {
    console.log(body, image);
  };
  const loadfile = (event) => {
    let output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <div className="createPost">
      {/* header */}
      <div className="post-header">
        <h4 style={{ margin: '3px auto' }}>Create New Post</h4>
        <button
          id="post-btn"
          onClick={() => {
            postDetails();
          }}
        >
          Share
        </button>
      </div>

      {/* image preview */}

      <div className="main-div">
        <img src={imageIcon} alt="" id="output" />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src={user3} alt="" id="output" />
          </div>
          <h5>Adewale Adetona</h5>
        </div>
        <textarea
          placeholder="Write a caption"
          name=""
          id=""
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default CreatePost;
