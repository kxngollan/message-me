import React from "react";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import MessageCard from "./components/MessageCard";
import AddMessage from "./components/AddMessage";
import "./App.scss";

const api = import.meta.env.API;

const App = () => {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      console.log(data);
      setMessages("messages ", data);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async (message) => {
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <button onClick={() => setShowModal(true)}>New Message</button>
        {showModal ? (
          <AddMessage
            sendMessage={sendMessage}
            close={() => setShowModal(false)}
          />
        ) : (
          ""
        )}
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard key={index} message={message} />
          ))
        ) : (
          <p>No Messages</p>
        )}
      </div>
    </div>
  );
};

export default App;
