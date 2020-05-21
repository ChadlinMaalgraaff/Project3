import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import './messaging.css';

class ChatObject extends Component {
  state = {
    people: this.props.people,
    messages: this.props.mesages,
    chatId: this.props.chatId,
    groupChat: this.props.groupChat
  };

  
  render() {
    return (
      <div>
        {this.state.people[0]}
      </div>
    );
  }
}

export default ChatObject;