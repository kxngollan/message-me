import PropTypes from "prop-types";
import { useState } from "react";
import "./AddMessage.scss";

const AddMessage = ({ sendMessage, close, error }) => {
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
        <form onSubmit={submit}>
          <h2>Write Message</h2>
          <label htmlFor="user">Name:</label>
          <input
            placeholder="Username..."
            type="text"
            name="user"
            id="user"
            value={post.user}
            onChange={handleChange}
          />
          <label htmlFor="messgae">Message:</label>
          <textarea
            placeholder="Enter message..."
            name="message"
            id="message"
            value={post.message}
            onChange={handleChange}
          />
          <button>Add Message</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

AddMessage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default AddMessage;
