import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import "./AddMessage.sass";

const AddMessage = ({ sendMessage, close }) => {
  const [post, setPost] = useState({
    message: "",
    user: "",
  });

  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = (e) => {
    e.preventDefault();
    sendMessage(post);
  };

  return (
    <div className="modal">
      <div className="overflow" onClick={close}></div>
      <div className="modal-content">
        <h2>Write Message</h2>
        <form onSubmit={submit}>
          <label htmlFor="user">Name:</label>
          <input
            type="text"
            name="user"
            id="user"
            value={post.user}
            onChange={handleChange}
          />
          <label htmlFor="messgae">Message:</label>
          <textarea
            name="message"
            id="message"
            value={post.message}
            onChange={handleChange}
          />
          <button>Add Message</button>
        </form>
      </div>
    </div>
  );
};

AddMessage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default AddMessage;
