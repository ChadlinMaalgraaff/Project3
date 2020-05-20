import React, { Component } from "react";
import { Container, Col, Row, Button, Form, Image } from "react-bootstrap";
import Message from "./message";
import "./messaging.css";
import '../sidepanel/style.css';
import pp from '../../Images/pp1.jpg';
import pp2 from '../../Images/pp2.jpg';
import Person from './person';
import ChatObject from './chatObject';

class Chat extends Component {
  state = {
    personId: 1,
    personId2: 2,
    personName: 'My Name is...',
    personPP: pp2,
    time: "eh-time",
    i: 0,
    activeChat: [],
    activeChatName: 'Chadlin Maalgraaff',
    activeChatPP: pp,
    activeChatId: '',
    chats: []
  };

  render() {
    let menuOpen = false;
    let chats = [];
    let activeChat = [];
    let activeChatName = '';
    let activeChatPP = '';

    const toggle = () => {
        const content = document.getElementById('toggle-content');
        const items = content.getElementsByClassName('content-item');
        const menuBtn = document.getElementById('menu-btn');

        if(!menuOpen) {
            menuBtn.classList.add('open');
            menuOpen = true;
          } else {
            menuBtn.classList.remove('open');
            menuOpen = false;
        } 

        content.classList.toggle("open");
        for (var i = 0; i < items.length; i++) {
            items[i].classList.toggle("fade");
        }
    }

    const message = () => {
      const messageText = document.getElementById("my-message").value;
      const messageId = Math.random();
      const message = <Message time={this.state.time} personId={this.state.personId} messageId={messageId} text={messageText} />

      this.setState({
        activeChat: [
          ...this.state.activeChat,
          message
        ],
      });

      var chat = this.state.chats.filter(chatObject => chatObject.props.chatId == this.state.activeChatId);

      for (var i = 0; i < this.state.chats.length; i++) {
        if (this.state.chats[i].props["chatId"] != null) {
          if (this.state.chats[i].props["chatId"] == chat[0].props.chatId) {
            var updatedChats = this.state.chats;
            updatedChats[i] = <ChatObject chatId={updatedChats[i].props["chatId"]} people={updatedChats[i].props["people"]} messages={[...updatedChats[i].props["messages"], message]} />
            this.setState({chats: updatedChats});
            i = this.state.chats.length;
          }
        } 
      }
    };

    const message2 = () => {
      const messageText = document.getElementById("my-message2").value;
      const messageId = Math.random();

      this.setState({
        messages: [
          ...this.state.messages,
          <Message
            time={this.state.time}
            personId={this.state.personId2}
            messageId={messageId}
            text={messageText}
          />,
        ],
      });

      if (this.state.messages.length > 0) {
        console.log(this.state.messages[this.state.i]);
        this.setState({
          i: this.state.i + 1,
        });
      }
    };

    const setActive = (e) => {
      const chatId = e.target.id;
      const chat = this.state.chats.filter(chatObject => chatObject.props.chatId == chatId);
      console.log(chat);

      this.setState({
        activeChat: chat[0].props["messages"],
        activeChatId: chat[0].props["chatId"],
        activeChatName: chat[0].props["people"][0].props["personName"],
        activeChatPP: chat[0].props["people"][0].props["personPP"]
      });

    }

    const newChat = () => {
      const chatId = Math.random();
      const rando = Math.random();
      const messages = [];
      const people = [
        <Person personId={rando} personName={'Bot' + rando} personPP={pp} id={chatId}/>,
        <Person personId={this.state.personId} personName={this.state.personName} personPP={this.state.personPP}/>
      ];

      this.setState({
        chats: [...this.state.chats, <ChatObject chatId={chatId} people={people} messages={messages}/>],
        activeChat: messages,
        activeChatId: chatId,
        activeChatName: people[0].props.personName,
        activeChatPP: people[0].props.personPP
      });
    }

    return (
      <Container fluid style={{ position: "relative", minHeight: "100vh", margin:'0px', padding:'0px' }}>
        <Row style={{margin:'0px', padding:'0px'}}>
          <Col xs={0} sm={0} md={6} lg={6} xl={6} style={{margin:'0px', padding:'0px'}}>
            <Row style={{margin:'0px', padding:'0px'}}>
              <div className='toggle'>
                  <div className="menu-btn" id='menu-btn' onClick={toggle}>
                      <div className="menu-btn__burger"></div>
                  </div>

                  <div className='toggle-content' id='toggle-content'>
                      <div className='content-item' id='content-item'>
                          <Button onClick={newChat}>New Chat</Button>
                      </div>
                      <div className='content-item' id='content-item'>
                        {this.state.chats.map(chat => (
                            <div id={chat.props["chatId"]} onClick={setActive} style={{zIndex:'100'}}>
                              <Container fluid id={chat.props["chatId"]}>
                                <Row className='person' id={chat.props["chatId"]}>
                                    <Col
                                        xs={3}
                                        sm={3}
                                        md={1}
                                        lg={1}
                                        xl={1}
                                        id={chat.props["chatId"]}
                                    >
                                        <Image id={chat.props["chatId"]} src={chat.props["people"][0].props["personPP"]} className='message-pp'></Image>
                                    </Col>
                                    <Col
                                        xs={9}
                                        sm={9}
                                        md={11}
                                        lg={11}
                                        xl={11}
                                        id={chat.props["chatId"]}
                                    >
                                        <div style={{display:'inline-block'}} id={chat.props["chatId"]}>
                                        <p
                                            style={{marginBottom:'0px', fontSize:'20px', marginLeft:'0px'}}
                                            id={chat.props["chatId"]}
                                        >
                                          {chat.props["people"][0].props["personName"]}
                                        </p>
                                        </div>
                                    </Col>
                                </Row>
                              </Container>
                            </div>
                        ))}
                      </div>
                  </div>

              </div>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{margin:'0px', padding:'0px'}}>
            <Row style={{margin:'0px', padding:'0px'}}>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{ height: "20vh" }}
              >
                <Row
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "green",
                    margin:'0px'
                  }}
                >
                  <Col
                      xs={3}
                      sm={3}
                      md={1}
                      lg={1}
                      xl={1}
                  >
                      <Image src={this.state.activeChatPP} className='message-pp'></Image>
                  </Col>
                  <Col
                      xs={9}
                      sm={9}
                      md={11}
                      lg={11}
                      xl={11}
                  >
                      <div style={{display:'inline-block'}}>
                      <p
                          style={{marginBottom:'0px', fontSize:'20px', marginLeft:'0px'}}
                      >
                        {this.state.activeChatName}
                      </p>
                      </div>
                  </Col>

                  <Form.Control
                    type="text"
                    placeholder="Type a message..."
                    id="my-message2"
                  />
                  <Button
                    variant="dark"
                    style={{ marginTop: "5px" }}
                    onClick={message2}
                  >
                    send
                  </Button>
                </Row>
              </Col>
            </Row>
            <Row style={{margin:'0px', padding:'0px'}}>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{ height: "60vh" }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "yellow",
                    overflowY: "scroll",
                  }}
                >
                  {this.state.activeChat.map((message) => (
                    <div
                      className="message"
                      style={{
                        marginLeft:
                          message.props["personId"] == this.state.personId
                            ? "auto"
                            : "0px",
                      }}
                    >
                      {message}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row style={{margin:'0px', padding:'0px'}}>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  position: "absolute",
                  bottom: "0px",
                  width: "100%",
                  height: "20vh",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "red",
                  }}
                >
                  <h3>Me: </h3>
                  <br />
                  <Form.Control
                    type="text"
                    placeholder="Type a message..."
                    id="my-message"
                  />
                  <Button
                    variant="dark"
                    style={{ marginTop: "5px" }}
                    onClick={message}
                  >
                    send
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Chat;
