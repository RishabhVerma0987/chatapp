import React, { useState } from "react";
import "./chat.scss";
function Chat() {
  const [text, setText] = useState("");

  const sendData = () => {};

  return (
    <div className="chat">
      <div className="user-name">
        <h2>Chat Now</h2>
      </div>
      <div className="chat-message">
        <div className="message">
          <p>
            Qui aliqua sunt nisi id laborum amet veniam enim eiusmod consequat.
          </p>
          <span>Rishabh</span>
        </div>
        <div className="message mess-right">
          <p>something is not right </p>
          <span>sanchit</span>
        </div>
      </div>
      <div className="send">
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
