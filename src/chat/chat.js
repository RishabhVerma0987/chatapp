import React, { useState } from "react";
import "./chat.scss";
function Chat({ handleClick, data, left }) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const sendData = () => {
    handleClick({
      message,
      name,
    });
  };

  console.log("data=", data);
  return (
    <div className="chat">
      <div className="user-name">
        <h2>Chat Now</h2>
      </div>
      <div className="chat-message">
        {left ? (
          <div className="message">
            <p>{data?.message}</p>
            <span>{data?.name}</span>
          </div>
        ) : (
          <div className="message mess-right">
            <p>{data?.message} </p>
            <span>{data?.name}</span>
          </div>
        )}
      </div>
      <div className="send name">
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="send">
        <input
          placeholder="enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
