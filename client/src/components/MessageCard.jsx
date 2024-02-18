import "./MessageCard.scss";
import PropTypes from "prop-types";

const messageCard = ({ message }) => {
  return (
    <div>
      <h2>{message.user}</h2>
      <h4>{message.date}</h4>
      <p>{message.message}</p>
    </div>
  );
};

messageCard.propTypes = {
  message: PropTypes.object.isRequired,
};

export default messageCard;
