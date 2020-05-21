import React, { Component } from "react";
import { Container, Col, Row, Button, Form, Image, Modal, InputGroup } from "react-bootstrap";
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
    activeChat: [],
    activeChatName: 'Chadlin Maalgraaff',
    activeChatPP: pp,
    activeChatId: '',
    chats: [],
    people: [],
    selectedPeople: [],
    groupChat: false
  };

  render() {
    let menuOpen = false;
    const handleClose = () => {this.setState({show:false})};
    const handleShow = () => {this.setState({show:true})};

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

      console.log('active chat state:');
      console.log(this.state.activeChat);
      console.log('chats:');
      console.log(this.state.chats);
    };

    const message2 = () => {
      const messageText = document.getElementById("my-message2").value;
      const messageId = Math.random();
      const message = <Message time={this.state.time} personId={this.state.personId2} messageId={messageId} text={messageText} />

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

    const setActive = (e) => {
      const chatId = e.target.id;
      const chat = this.state.chats.filter(chatObject => chatObject.props.chatId == chatId)[0];

      this.setState({
        activeChat: chat.props["messages"],
        activeChatId: chat.props["chatId"],
        activeChatName: chat.props["people"][0].props["personName"],
        activeChatPP: chat.props["people"][0].props["personPP"]
      });
    }

    const GenerateBots = () => { /* Generates a random bot and populates the people array with it */
      const rando = Math.random();
      const bot= <Person personId={rando} personName={'Bot' + rando} personPP={pp} id={rando}/>;

      this.setState({
        people: [...this.state.people, bot]
      });

      console.log('people newchat:');
      console.log(this.state.people);
    }

    const startChat = () => { /* Will be the actual function we use, instead of newchat */
      const chatId = Math.random();
      const messages = [];
      var members = [...this.state.selectedPeople,
        <Person personId={this.state.personId} personName={this.state.personName} personPP={this.state.personPP}/>
      ];

      if (this.state.groupChat == true) {
        const groupName = document.getElementById('groupName');
        const groupPP = document.getElementById('groupChat-pp');
        const groupId = Math.random();
        const groupChatObject = <Person personId={groupId} personName={groupName.value} personPP={groupPP.src}/>
        members = [groupChatObject, ...members];
        this.setState({groupChat: false});
      }

      this.setState({ /* The first object in members is used to display the Name and PP */
        chats: [...this.state.chats, <ChatObject chatId={chatId} people={members} messages={messages}/>],
        activeChat: messages,
        activeChatId: chatId,
        activeChatName: members[0].props["personName"],
        activeChatPP: members[0].props["personPP"]
      });

      console.log('start chat members: ');
      console.log(members);
    }

    const personSelect = (e) => {
      console.log(e.target.id);

      if (e.target.checked == true) {
        this.setState({
          selectedPeople: [...this.state.selectedPeople, this.state.people.filter(person => person.props["personId"] == e.target.id)[0]]
        });
      }else if (e.target.checked == false) {
        this.setState({
          selectedPeople: this.state.selectedPeople.filter(person => person.props["personId"] != e.target.id)
        });
      }
      console.log('selected people:');
      console.log(this.state.selectedPeople);
    }

    const group = () => {
      if (this.state.groupChat == false) {
        this.setState({
          groupChat: true
        });
      }else {
        this.setState({
          groupChat: false
        });
      }
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
                        <Button onClick={GenerateBots}>Generate Bots to chat to</Button>
                        <Button variant="dark" onClick={handleShow} style={{padding:'0px', margin:'0px', width:'100%'}}>
                            New Chat
                        </Button>
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
      {/* Modal used to type post */}
        <Modal show={this.state.show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
              <div className='groupChat'>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Checkbox id={'groupChat-check'} onClick={group} aria-label="Checkbox for following text input" />
                  </InputGroup.Prepend>
                  <Form.Label>Group chat</Form.Label>
                </InputGroup>
                <Form.Label>Group Name:</Form.Label>
                <Form.Control type="text" id='groupName' placeholder="Group name..." />
                <Form.Label>Group Display picture:</Form.Label>
                <Image src={pp2} id='groupChat-pp' className='message-pp'></Image>
              </div>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:'#ffffff'}}>
                <div className='icons text-center' style={{height:'400px', overflowY:'scroll'}}>
                  {this.state.people.map((person) => (
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Checkbox id={person.props["personId"]} onClick={personSelect} aria-label="Checkbox for following text input" />
                      </InputGroup.Prepend>
                      {person}
                    </InputGroup>
                  ))}
                </div>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor:'#faf6ee'}}>
            <Button variant="primary" onClick={startChat}>
                start chat
            </Button>
            </Modal.Footer>
        </Modal>
      {/* Modal used to type post */}
      </Container>
    );
  }
}

export default Chat;
