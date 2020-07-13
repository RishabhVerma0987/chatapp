import React from "react";
// import io from "socket.io-client";
import Chat from "./chat/chat";
import Process from "./process/process";
import "./App.scss";

function App() {
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
