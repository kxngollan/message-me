import "./MessageCard.scss";
import PropTypes from "prop-types";

const messageCard = ({ message }) => {
  const date = new Date(message.date).toLocaleString();

  return (
    <div className="messageCard">
      <h2>
        {message.user} | <span className="date">{date}</span>
      </h2>
      <div className="message">
        <p>{message.message}</p>
      </div>
    </div>
  );
};

messageCard.propTypes = {
  message: PropTypes.object.isRequired,
};

export default messageCard;
