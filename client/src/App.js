import "./App.css";
import io from "socket.io-client";
import React, { useState } from "react";
import Chat from "./Chat";
import Header from "./Header";
import User from "./User";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [roomid, setRoomid] = useState("");
  const [showChat, setShowChat] = useState(false);

  //valid states
  const [usernamevalid, setUsernameValid] = useState(false);
  const [roomvalid, setRoomValid] = useState(false);
  //blur part
  const [usernametouched, setUsernameTouched] = useState(false);
  const [roomtouched, setRoomTouched] = useState(false);
  function usernameBlurHandler() {
    setUsernameTouched(true);
  }
  function roomBlurhandler() {
    setRoomTouched(true);
  }
  //--------

  function joinRoomHandler() {
    if (usernamevalid === true && roomvalid === true) {
      socket.emit("join_room", roomid);
      setRoomTouched(false);
      setUsernameTouched(false);
      setShowChat(true);
    }
  }

  //value of inputs
  function usernameChangeHandler(event) {
    setUsername(event.target.value);
    setUsernameValid(event.target.value.length >= 6);
    console.log(usernamevalid);
  }
  function roomidChangeHandler(event) {
    setRoomid(event.target.value);
    setRoomValid(event.target.value.length >= 4);
  }

  //going back to homepage
  function leaveButtonHandler() {
    window.location.href = "http://localhost:3000/";
  }

  //error checking
  const usernameInvalid = !usernamevalid && usernametouched;
  const roomInvalid = !roomvalid && roomtouched;

  return (
    <div className="App">
      {!showChat ? (
        <React.Fragment>
          <Header />
          <div className="joinChatContainer">
            <h3 style={{ fontSize: "32.5px" }}>Join A Chat</h3>
            <input
              type="text"
              placeholder="Enter  Username..."
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
            />
            {usernameInvalid && (
              <p style={{ color: "#b40e0e" }}>
                Username must have minimum of 6 characters
              </p>
            )}
            <input
              type="number"
              placeholder="Enter Room ID..."
              onChange={roomidChangeHandler}
              onBlur={roomBlurhandler}
              onKeyPress={(event) => event.key === "Enter" && joinRoomHandler()}
            />
            {roomInvalid && (
              <p style={{ color: "#b40e0e" }}>
                RoomId must have minimum of 4 characters
              </p>
            )}
            <button onClick={joinRoomHandler}>Join Room</button>
          </div>
        </React.Fragment>
      ) : (
        <div>
          <Header room={roomid} username={username} />
          <br />
          <Chat socket={socket} username={username} room={roomid} />
          <div className="footer">
            <User username={username} />
            <button className="leavebutton" onClick={leaveButtonHandler}>
              Leave Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
