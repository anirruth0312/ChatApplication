import React from "react";
import "./App.css";
function Header(props) {
  if (props.room) {
    return <h2 className="header">Room ID: {props.room}</h2>;
  } else {
    return <h1 className="header">Welcome to the Chat Room</h1>;
  }
}

export default Header;
