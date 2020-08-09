### How to Build a Real-Time Chat web app using Node + Reactjs + Socket.io having
E2E Encryption(Symmetric)

![](https://cdn-images-1.medium.com/max/1000/1*bdgFPaX32TdddeJixF1ecg.gif)
<span class="figcaption_hack">[https://bit.ly/30sqUpJ](https://bit.ly/30sqUpJ)</span>

> [Here is the example of the chat app we are going to build
> ✌](https://bit.ly/30sqUpJ)

**Please give it a star if you gain something from it**




So you might be wondering how WhatsApp, telegram type application says that
their user's data is “Encrypted” all across the network,  that means all the
messages stored in their database are encrypted and even if some “**third
party**” try to “**tap”** the messages while they are on there way to reach
there destination the intercepted message will be in encrypted form.

> In this article I am going to show you that how to build a Simple E2E (which is
> not going to be as secure as whatsapp uses but still it is better  than having
nothing) . We will be using a single secret  key to encrypt and decrypt our
messages thus having a symmetric encryption architecture . 

> **Note** , whatsapp uses diffie-helman technique to achieve Asymmetrical
> encryption , it is one of those technique which can be used to produce most
secure chat applications if you want to learn more about this … please refer
this [link](https://youtu.be/JnZQMUL8GcQ) 

### This is how it works, 

![](https://cdn-images-1.medium.com/max/1000/1*da2tLNgZgzPC3ByPd79lkw.png)

As shown in the above photo, we will create a secret key which will be stored in
frontend (*For now I am storing it in the frontend file itself but for
production, you have to save it in the .ENV variables of your server where you
have deployed your front-end*), whenever a user sends the message we have to
encrypt it using [aes256](https://www.npmjs.com/package/aes256) npm package with
your* *secret key and will repeat the process after receiving the encrypted
message but this time it will be decrypted using the same secret key.

### Code

#### Backend (Node, Express, Socket.io)

*Folder Structure*

    Backend
     |- dummyuser.js
     |- server.js
     |- package.json

*Dependencies to install*

    npm i 
     

    npm i 
     -d

#### Go to dummyuser.js

    const users = [];

    // 

    function 
    (id, username, room) {
      const user = { id, username, room };
      
    .push(user);
      
     user;
    }

    //

    function 
    (id) {
      
    .
    ((user) =>
    .id === id);
    }

    //

    function 
    (id) {
      const index =
    .
    ((user) =>
    .id === id);
      if (index !== -1) {
        
    .splice(index, 1)[0];
      }
    }

    // Exporting functions

    module.exports = {userJoin, getCurrentUser, userLeave,};

Here we are creating 3 functions that will take care of the user, The
**userjoin() **function will **add **a user to the empty array **users**.

> The **User** Object consists of 3 keys - id, username, and room name, the room
> name is basically like a “WhatsApp group” which will tell the user belongs to
this particular room.

**getcurrentuser(), **will take the id of a particular user and returns its user
object

And whenever a user leaves chat (*Disconnect*) we will be calling** userLeave()
**which accept a user id and will **delete** that user object from the array
**users**

<br> 

#### *Go to server.js*

*Import packages and initial setup*

    const express = 
    ("express");
    const app = 
    ();
    const socket = 
    ("socket.io");
    const {getCurrentUser, userLeave, userJoin}=
    ("./dummyuser");

    const port = 8000;

    var server =
    .
    (port,console.log(`Server is running in development mode on port ${port}`));

    const io = 
    (server);

Here we are just importing modules, functions from** dummyuser.js**, listening
on port 8000, and initializing the socket.

*The Main part, *

    //* 

    .
    ("connection", (socket) => {

    //* 

    .
    ("joinRoom", ({ username, roomname }) => {


      //

      const user = 
    (
    .id, username, roomname);
      
    .
    (
    .room);


      //

    .
    ("message", {
        userId:
    .id,
        username:
    .username,
        text: `Welcome ${
    .username}`,
      });


      //

    .broadcast.
    (
    .room).
    ("message", {
        userId:
    .id,
        username:
    .username,
        text: `${
    .username} has joined the chat`,
      });
    });


    //* 
    .
    ("chat", (text) => {
      
      //
    const user = 
    (
    .id);
      
    .
    (
    .room).
    ("message", {
        userId:
    .id,
        username:
    .username,
        text: text,
       });
      });
      
      //
    .
    ("disconnect", () => {
         
         //
    //
    const user = 
    (
    .id);
         if (user) {
           
    .
    (
    .room).
    ("message", {
           userId:
    .id, 
           username:
    .username, 
           text: `${
    .username} has left the chat`,
         });
      }});

    });

After initializing the socket, everything related to sockets will go into
io.on(connection , () => “everything will go here”) this callback. Here we have
two functions, socket.on(“*joinRoom*”), socket.on(“chat”). The* joinRoom
*function will only run whenever a new user joins the room, here we will be
**emitting **a welcome message to him/her and **broadcasting** a message (*user
has joined* ) to all the users (except him/her).

socket.on(“*chat*”) will handle the back and forth message sending part.

Also whenever a user *disconnects* we will be sending “*user has left the chat*”
message to all the people in the room.

*****

#### Frontend (React, Redux, Socket.io-client, aes256)

*Folder Structure*

![](https://cdn-images-1.medium.com/max/1000/1*yO4qzfV82fEbWU1TDk44DA.png)

*Dependencies to install*

    npm i node-sass react-lottie react-redux react-router-dom redux 
     

#### Initial setup

**index.js**

     React 
     "react";

     ReactDOM 
     "react-dom";

     App 
     "./App";

     { createStore } 
     "redux";

     { Provider } 
     "react-redux";

     rootReducers 
     "./store/reducer/index";

    const store = 
    (rootReducers);

    ReactDOM.
    ( 
     <Provider 
    ={store}><App /></Provider>, document.
    ("root"));


**/store/action/index.js**

     const process = (encrypt, text, cypher) => {

     {
      type: "PROCESS", 
      payload: {
        encrypt,
        text,
        cypher,
       },
     };
    };

**/store/reducer/index.js**

     { combineReducers } 
     "redux";

     { ProcessReducer } 
     "./process";

    const rootReducers = 
    ({
      ProcessReducer: ProcessReducer,
    });

     
     rootReducers;

**/store/reducer/process.js**

     const 
     = (state = {}, action) => {

     switch (
    .type) {
      case "PROCESS":
        
     { ...action.payload };
      default:
        
     state;
     }
    };

In the above files, we are adding redux into our React App and creating an
action called ‘*process’* which will be responsible for sending messages (both
incoming and outgoing) to ‘*aes.js’ *(which is responsible for encryption and
decryption) and getting data from ‘*aes.js*’ back to our components.

### Go to App.js

     React 
     "react";
     Chat 
     "./chat/chat";
     Process 
     "./process/process";
     "./App.scss";
     { BrowserRouter 
     Router, Switch, Route } 
     "react-router-dom";
     Home 
     "./home/home";
     io 
     "socket.io-client";

    const socket = 
    ("http://localhost:8000");

    function 
    (props) {

     (
        <React.Fragment>
         <div 
    ="right">
           <Chat
             
    ={
    .match.params.username}
             
    ={
    .match.params.roomname}
             
    ={socket}
           />
         </div>
         <div 
    ="left">
           <Process />
         </div>
       </React.Fragment>
     );
    }

    function 
    () {
     
     (
      <Router>
       <div 
    ="App">
        <Switch>
         <Route 
    ="/" 
    >
          <Home 
    ={socket} />
         </Route>
         <Route 
    ="/chat/:roomname/:username" 
         
    ={Appmain} />          
        </Switch>
       </div>
      </Router>
    );
    }

     
     App;

Here we added routes and importing components, 

*Routes*, on-base URL we are rendering home components that are responsible for
getting user name and room name. On path “/chat/roomname/username” we are
rendering a component AppMain which returns two div one is the chatbox and the
other tells us the process where the encrypted incoming message and the
decrypted message is shown.

*Add the required styling for App.js,*

**App.scss**

    @
     "./globals";

    .
     {

    width: 100%;

    height: 100vh;

    background-color: $backgroundColor;

    display: flex;

    justify-content: center;

    align-items: center;

    .
     {

    flex: 2;

    }

    .
     {

    flex: 1;

    }

    }

**_globals.scss**

    @
     url("https://fonts.googleapis.com/css2?family=Muli:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

    * {
    margin: 0 auto;

    padding: 0;

    box-sizing: border-box;

    color: white;

    font-family: "Muli", sans-serif;

    }

    $backgroundColor: #282b34;

    $greyColor: #2d343e;

    $redColor: #ff1e56;

    $yellowColor: #ffac41;


### Go to /home/home.js

     React, { useState } 
     "react";
     "./home.scss";
     { Link } 
     "react-router-dom";

    function 
    ({ socket }) {
      const [username, setusername] = 
    ("");
      const [roomname, setroomname] = 
    ("");
      const 
     = () => {
         if (username !== "" && roomname !== "") 
           
    .
    ("joinRoom", { username, roomname });
         } else {
           
    ("username and roomname are must !");
         }
      };
     (
      <div 
    ="homepage">
        <h1>Welcome 🙏</h1>
        <input
          
    ="Enter your username"
          
    ={username}
          
    ={(e) => 
    (
    .target.value)}
        ></input>
        <input
          
    ="Enter room name"
          
    ={roomname}
          
    ={(e) => 
    (
    .target.value)}
        ></input>
        <Link 
    ={`/chat/${roomname}/${username}`}>
          <button 
    ={sendData}>Join</button>
        </Link>
      </div>
    );
    }

     
     Homepage;

Here we are taking input from the user (user and room name) and calling
socket.emit(“*joinRoom*”) passing the username and room name this will activate
the“* joinRoom*” in our backend which will add the user to the room and
emit/broadcast message as discussed above in our backend section.

*Add styling to home.js,*

**home.scss**

    @
     "../globals";

    .
     {

    width: 400px;

    height: 400px;

    background-color: $greyColor;

    display: flex;

    flex-direction: column;

    padding: 2rem;

    justify-content: space-evenly;

    border-radius: 5px;

    input {

    height: 50px;

    width: 80%;

    text-decoration: none;

    background-color: #404450;

    border: none;

    padding-left: 1rem;

    border-radius: 5px;

    &:
     {

    outline: none;
    }

    }

    button {

    font-size: 1rem;

    padding: 0.5rem 1rem 0.5rem 1rem;

    width: 100px;

    border: none;

    background-color: $yellowColor;

    border-radius: 5px;

    color: black;

    &:
     {
    cursor: pointer;
    }}}

### Go to /chat/chat.js

     React, { useState, useEffect, useRef } 
     "react";

     "./chat.scss";

     { DoDecrypt, DoEncrypt } 
     "../aes.js";

     { useDispatch } 
     "react-redux";

     { process } 
     "../store/action/index";


    function 
    ({ username, roomname, socket }) {

       const [text, setText] = 
    (""); 
       const [messages, setMessages] = 
    ([]);
       const dispatch = 
    ();
       const 
     = (encrypt, msg, cipher) => {      

    (process(encrypt, msg, cipher));

      };

    (() => { 
         
    .
    ("message", (data) => {
         //
    const ans = 
    (
    .text,
    .username);
         
    (false, ans,
    .text);
         let temp = messages;
         
    .push({
           userId:
    .userId,
           username:
    .username,
           text: ans,
         });
         
    ([...temp]);
       });
      }, [socket]);


      const 
     = () => {
        if (text !== "") {
        //
    const ans = 
    (text);
        
    .
    ("chat", ans);
        
    ("");
      }
    };

    const messagesEndRef = 
    (null);

    const 
     = () => {

    .current.
    ({ behavior: "smooth" });

    };

    (scrollToBottom, [messages]);

     (

       <div 
    ="chat">
         <div 
    ="user-name">
        <h2>{username} <span 
    ={{ fontSize: "0.7rem" }}>
         in {roomname}</span></h2>
       </div>
       <div 
    ="chat-message">
        {
    .
    ((i) => {
          if (
    .username === username) {
           
     (
             <div 
    ="message">
              <p>{
    .text}</p>
              <span>{
    .username}</span>
            </div>
           );
        } else {
          
     (
             <div 
    ="message mess-right">
               <p>{
    .text} </p>
               <span>{
    .username}</span>
             </div>
         );
       }
    })}

    <div 
    ={messagesEndRef} /></div>
    <div 
    ="send">
    <input
      
    ="enter your message"
      
    ={text}
      
    ={(e) => 
    (
    .target.value)}
      
    ={(e) => {
       if (
    .key === "Enter") {
        
    ();
       }
     }}></input>

       <button 
    ={sendData}>Send</button>
    </div></div>
    );
    }

     
     Chat;

Here we are taking input from the user and passing the data to process action
which will pass it to the aes function for encryption and then emit the same to
socket.on(“chat”), whenever a message is received we are passing that again to
aes function but this time for decryption.

*apply style for chat*

#### chat.scss

    @
     "../globals";

    @
     
    (

    $size,

    $foreground-color,

    $background-color: mix($foreground-color, white, 50%)

    ) {

    //

    &::
     {

    width: $size;

    height: $size;

    }


    &::
     {


    background: $foreground-color;

    border-radius: 10px;

    }


    &::
     {


    background: $background-color;

    border-radius: 10px;

    }


    //


    & {

    scrollbar-face-color: $foreground-color;

    scrollbar-track-color: $background-color;

    }

    }

    .
     {

    width: 400px;

    height: 600px;

    background-color: $greyColor;

    padding: 1rem;

    display: flex;

    flex-direction: column;

    justify-content: space-between;

    .
     {

    text-align: start;

    width: 100%;

    h2 {

    font-weight: 300;

    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    padding-bottom: 1rem;

    }

    }

    .
     {

    height: 70%;

    overflow-y: auto;

    @
     
    (5px, $backgroundColor, $yellowColor);

    display: flex;

    flex-direction: column;

    width: 100%;

    align-content: flex-start;


    .
     {


    margin-left: 0px;

    max-width: 220px;

    padding-left: 0.5rem;


    p {


    font-size: 1rem;

    background-color: #343841;

    padding: 1rem;

    border-radius: 0px 10px 10px 10px;

    font-weight: 300;

    color: #b4b6be;

    }


    span {


    font-size: 0.6rem;

    font-weight: 200;

    color: #b4b6be;

    padding-left: 0.5rem;

    }

    }

    .
     {

    margin-left: auto;

    margin-right: 0px;

    display: flex;

    flex-direction: column;

    max-width: 220px;

    padding-right: 0.5rem;

    p {

    text-align: end;

    border-radius: 10px 0px 10px 10px;

    background-color: $redColor;

    color: white;

    }

    span {

    width: 100%;

    text-align: end;

    padding-left: 0rem;

    padding-right: 0.5rem;

    }

    }

    }


    .
     {


    width: 100%;

    height: 50px;

    display: flex;

    input {

    width: 80%;

    text-decoration: none;

    background-color: #404450;

    border: none;

    padding-left: 1rem;

    border-radius: 5px 0px 0px 5px;

    &:
     {

    outline: none;

    }

    }

    button {

    width: 20%;

    border: none;

    background-color: $yellowColor;

    border-radius: 0px 5px 5px 0px;

    &:
     {

    cursor: pointer;

    }

    }

    }

    }


### Go to aes.js

    var aes256 = 
    ("aes256");

    var key = "obvwoqcbv21801f19d0zibcoavwpnq";

     const 
     = (text) => {

    var encrypted =
    .
    (key, text);

     encrypted;

    };

     const 
     = (cipher, username) => {

       if (
    .
    ("Welcome")) {

     cipher;

       }

       if (
    .
    (username)) {

     cipher;

       }

       var decrypted =
    .
    (key, cipher);

     decrypted;

    };

### **Go to process.js**

     React, { useState } 
     "react";

     Lottie 
     "react-lottie";

     animationData 
     "../loading.json";

     { useSelector } 
     "react-redux";

     "./process.scss";

    function 
    () {

    const [play, setPlay] = 
    (false);


    const state = 
    ((state) =>
    .ProcessReducer);

    const defaultOptions = {

    loop: true,

    autoplay: true,

    animationData: animationData,

    rendererSettings: {

    preserveAspectRatio: "xMidYMid slice",

    },

    };

     (

    <div 
    ="process">

    <h5>

    Seceret Key : <span>"obvwoqcbv21801f19d0zibcoavwpnq"</span>

    </h5>

    <div 
    ="incomming">

    <h4>Incomming Data</h4>

    <p>{
    .cypher}</p>

    </div>

    <Lottie

    ={defaultOptions}

    ={150}

    ={150}

    ={play}

    />

    <div 
    ="crypt">

    <h4>Decypted Data</h4>

    <p>{
    .text}</p>

    </div>

    </div>

    );

    }

     
     Process;

*add styling *

    @
     "../globals";

    .
     {

    width: 500px;

    min-height: 550px;

    margin-right: 10rem;

    display: flex;

    flex-direction: column;

    justify-content: space-evenly;

    align-items: center;

    padding: 2rem;

    h5 {

    margin-bottom: 2rem;

    font-weight: 300;

    color: rgba(255, 255, 255, 0.4);

    span {

    color: yellow;

    }

    }

    .
     {

    width: 100%;

    h4 {

    color: rgba(255, 255, 255, 0.4);

    font-weight: 300;

    }

    p {

    margin-top: 0.5rem;

    background-color: rgba(0, 0, 0, 0.4);

    padding: 1.2rem;

    font-size: 1rem;

    border-radius: 5px;

    overflow: hidden;

    white-space: nowrap;

    text-overflow: ellipsis;

    }

    }

    .
     {

    width: 100%;

    h4 {

    color: rgba(255, 255, 255, 0.4);

    font-weight: 300;

    }

    p {

    margin-top: 0.5rem;

    background-color: rgba(0, 0, 0, 0.4);

    padding: 1.2rem;

    font-size: 1rem;

    border-radius: 5px;

    }

    }

    }


Basically process.js is responsible for showing the incoming encryted and
decrypted messages.

That's It !, we have finally made chat E2E app 
Medium acticle -> 


