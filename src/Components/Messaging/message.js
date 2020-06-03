import React, { Component } from "react";
import './messaging.css';

class Message extends Component {
  state = {
    time: this.props.time,
    text: this.props.text,
    personId: this.props.personId
  };

  render() {
    return (
      <div className='message-inner'>
        <p className="message-text text-white">{this.state.text}</p>
        <p className="message-time text-white">{this.state.time}</p>
      </div>
    );
  }
}

export default Message;
