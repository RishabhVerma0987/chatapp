import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./chat/chat";
import Process from "./process/process";
import "./App.scss";
function App() {
  var socket = io.connect("http://localhost:8000");

  const handleClick = () => {
    emitData("super!!");
  };
  useEffect(() => {
    socket.on("chat", (data) => {
      setAns(data.message);
    });
  }, [socket]);

  const [ans, setAns] = useState("no ans");

  const emitData = (message) => {
    socket.emit("chat", {
      message: message,
    });
  };

  return (
    <div className="App">
      <div className="right">
        <Chat />
      </div>
      <div className="left">
        <Process />
      </div>
    </div>
  );
}

export default App;
