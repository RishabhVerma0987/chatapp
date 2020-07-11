import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./chat/chat";
import Process from "./process/process";
import "./App.scss";
function App() {
  var socket = io.connect("http://localhost:8000");

  const handleClick = ({ message, name }) => {
    socket.emit("chat", {
      message,
      name,
    });
  };
  useEffect(() => {
    socket.on("chat", (data) => {
      setAns(data);
      setLeft(!left);
    });
  }, [socket]);

  useEffect(() => {
    alert("WORK UNDER CONSTRUCTION !! , THIS DOES NOT REPRESENT FINAL PRODUCT");
  }, []);

  const [ans, setAns] = useState(null);
  const [left, setLeft] = useState(true);
  return (
    <div className="App">
      <div className="right">
        <Chat handleClick={handleClick} data={ans} left={left} />
      </div>
      <div className="left">
        <Process />
      </div>
    </div>
  );
}

export default App;
