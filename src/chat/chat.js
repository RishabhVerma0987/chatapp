import React, { useState } from "react";
import "./chat.scss";
function Chat() {
  const [message, setMessage] = useState("");

  console.log(message);
  return (
    <div className="chat">
      <div className="user-name">
        <h2>Rishabh Verma</h2>
      </div>
      <div className="chat-message">
        <div className="message">
          <p>This is rishabh</p>
          <span>Rishabh Verma</span>
        </div>

        <div className="message mess-right">
          <p>Heelo my name is rishabh verma </p>
          <span>Rishabh Verma</span>
        </div>
      </div>
      <div className="send">
        <input
          placeholder="enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button>Send</button>
      </div>
    </div>
  );
}
export default Chat;
