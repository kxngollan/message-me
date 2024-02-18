import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import MessageCard from "./components/MessageCard";
import AddMessage from "./components/AddMessage";
import "./App.scss";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(async () => {
    setLoading("Loading...");
    try {
      const res = await fetch("https://message-me-pkox.onrender.com");
      const data = await res.json();

      setMessages(data);
      setLoading(null);
    } catch (err) {
      console.log(err.message);
      setLoading(null);
      setError("Failed to retrieve messages");
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async (message) => {
    setLoading("Sending...");
    setError(null);
    try {
      const res = await fetch("https://message-me-pkox.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      const data = await res.json();
      setMessages(data);
      setLoading(null);
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setLoading(null);
      setError("Failed to send message");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <button onClick={() => setShowModal(true)}>New Message</button>
        {loading ? <p className="">{loading}</p> : ""}
        {error ? <p className="error">{error}</p> : ""}
        {showModal ? (
          <AddMessage
            sendMessage={sendMessage}
            close={() => setShowModal(false)}
            error={error}
          />
        ) : (
          ""
        )}

        {messages.length > 0 ? (
          messages.map((message, index) => {
            return <MessageCard key={index} message={message} />;
          })
        ) : (
          <p>No Messages</p>
        )}
      </div>
    </div>
  );
};

export default App;
