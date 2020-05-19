import React, { Component } from "react";

class Message extends Component {
  state = {
    time: this.props.time,
    text: this.props.text,
    id: this.props.id
  };

  render() {
    return (
      <div>
        <p className="message-text">{this.state.text}</p>
        <p className="message-time">{this.state.time}</p>
      </div>
    );
  }
}

export default Message;
