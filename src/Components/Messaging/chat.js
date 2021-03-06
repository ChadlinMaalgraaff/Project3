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
    personId: 1, /* Id of logged in person */
    personId2: 2,
    personName: 'My Name is...', /* Name of logged in person */
    personPP: pp2, /* Profile picture of logged in person */
    activeChat: [], /* Messages of the active chat */
    activeChatName: 'Chadlin Maalgraaff', /* Name of person you're currently chatting to */
    activeChatPP: pp, /* Profile Picture of person you're currently chatting to  */
    activeChatId: '', /* Chat Id of active chat*/
    chats: [], /* Chat history of logged in person */
    people: [], /* People in the network(database) */
    selectedPeople: [], 
    groupChat: false,
    selected: 0,
    selectedId: '',
    showGroup: false,
    showGroupAdmin: false,
    selectedGroup: [],
    removeGroupIds: [],
    groups: [], /* Groups in the network(databse) */
    personSearch: false,
    personSearchInput: '',
    groupSearch: false,
    groupSearchInput: ''
  };

  render() {
    let menuOpen = false;
    const handleClose = () => {this.setState({show:false})};
    const handleCloseGroup = () => {this.setState({showGroup:false})};
    const handleCloseGroupAdmin = () => {this.setState({showGroupAdmin:false})};
    const handleShow = () => {this.setState({show:true})};
    const handleShowGroup = () => {this.setState({showGroup:true})};
    const handleShowGroupAdmin = () => {this.setState({showGroupAdmin:true})};

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
      var today = new Date();
      const message = <Message time={today.getHours() + ":" + today.getMinutes()} personId={this.state.personId} messageId={messageId} text={messageText} />

      this.setState({
        activeChat: [
          ...this.state.activeChat,
          message
        ],
      });

      var chat = this.state.chats.filter(chatObject => chatObject.props.chatId == this.state.activeChatId);

      for (var i = 0; i < this.state.chats.length; i++) {
        if (this.state.chats[i].props["chatId"] != null) {
          if (this.state.chats[i].props["chatId"] == chat[0].props["chatId"]) {
            var updatedChats = this.state.chats;
            updatedChats[i] = <ChatObject chatId={updatedChats[i].props["chatId"]} id={updatedChats[i].props["chatId"]} groupChat={updatedChats[i].props["groupChat"]} people={updatedChats[i].props["people"]} messages={[...updatedChats[i].props["messages"], message]} />
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
      var today = new Date();
      const message = <Message time={today.getHours() + ":" + today.getMinutes()} personId={this.state.personId2} messageId={messageId} text={messageText} />

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
            updatedChats[i] = <ChatObject chatId={updatedChats[i].props["chatId"]} id={updatedChats[i].props["chatId"]} groupChat={updatedChats[i].props["groupChat"]} people={updatedChats[i].props["people"]} messages={[...updatedChats[i].props["messages"], message]} />
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
      const bot= <Person personId={rando} key={rando} personName={'Bot' + rando} personPP={pp} id={rando}/>;

      this.setState({
        people: [...this.state.people, bot]
      });

      console.log('people newchat:');
      console.log(this.state.people);
    }

    const startChat = () => { /* Will be the actual function we use, instead of newchat */
      var chatId = 0;
      const messages = [];
      var members = [...this.state.selectedPeople,
        <Person personId={this.state.personId} key={this.state.personId} personName={this.state.personName} personPP={this.state.personPP}/>
      ];
      for (var j = 0; j < members.length; j++) {
        chatId += members[j].props["personId"];
      }
      console.log('chatId: ');
      console.log(chatId);

      if (this.state.groupChat == true) {
        const groupName = document.getElementById('groupName');
        const groupPP = document.getElementById('groupChat-pp');
        const groupId = Math.random();
        const groupChatObject = <Person personId={groupId} key={groupId} personName={groupName.value} personPP={groupPP.src}/>
        members = [groupChatObject, ...members];
        this.setState({groupChat: false});
        this.setState({
          chats: [...this.state.chats, <ChatObject adminIds={[this.state.personId]} id={chatId} chatId={chatId} key={chatId} people={members} messages={messages} groupChat={true}/>],
          /*groups need to be taken out here, once you can import the groups from the database. Only here so that you can test the join group function*/
          groups: [...this.state.groups, <ChatObject adminIds={[this.state.personId]} id={chatId} chatId={chatId} key={chatId}  people={members} messages={messages} groupChat={true}/>]
        });
        console.log('groups: ');
        console.log(this.state.groups);
      }else {
        var chatIds = [];
        for (var i = 0; i < this.state.chats.length; i++) { chatIds.push(this.state.chats[i].props["chatId"]) };

        if (!chatIds.includes(chatId)) {
          this.setState({
            chats: [...this.state.chats, <ChatObject chatId={chatId} id={chatId} key={chatId}  people={members} messages={messages} groupChat={false}/>]
          });
        }else {
          alert('Chat already open');
        }
      }

      this.setState({ /* The first object in members is used to display the Name and PP */
        activeChat: messages,
        activeChatId: chatId,
        activeChatName: members[0].props["personName"],
        activeChatPP: members[0].props["personPP"],
        selectedId: '',
        selected: 0,
        selectedPeople: [],
        show: false
      });
      console.log('start chats: ');
      console.log(this.state.chats);
    }

    const personSelect = (e) => {
      console.log(e.target.id);

      if (e.target.checked == true) {
        this.setState({
          selectedPeople: [...this.state.selectedPeople, this.state.people.filter(person => person.props["personId"] == e.target.id)[0]],
          selected: 1,
          selectedId: e.target.id
        });
      }else if (e.target.checked == false) {
        this.setState({
          selectedPeople: this.state.selectedPeople.filter(person => person.props["personId"] != e.target.id),
          selected: 0,
          selectedId: ''
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

    const groupSelect = (e) => {
      console.log(e.target.id);

      if (e.target.checked == true) { /* Will need to change the chats to the variable that holds the groups */
        this.setState({
          selectedGroup: this.state.chats.filter(group => group.props["chatId"] == e.target.id)[0],
          selected: 1,
          selectedId: e.target.id
        });
      }else if (e.target.checked == false) {
        this.setState({
          selectedGroup: '',
          selected: 0,
          selectedId: ''
        });
      }
    }

    const joinGroup = () => {
      if (this.state.selectedId != '') {
        const group = this.state.groups.filter(group => group.props['chatId'] == this.state.selectedId)[0];
        const me = <Person personId={this.state.personId} key={this.state.personId} personName={this.state.personName} personPP={this.state.personPP}/>;
        const updatedGroup = <ChatObject chatId={group.props["chatId"]} id={group.props["chatId"]} key={group.props["chatId"]} people={[...group.props["people"], me]} messages={group.props["messages"]} groupChat={true}/>;
        this.setState({
          groups: [...this.state.groups.filter(groupObject => groupObject.props["chatId"] != updatedGroup.props["chatId"]), updatedGroup],
          chats: [...this.state.chats, updatedGroup],
          showGroup: false,
          groupChat: false,
          selected: 0,
          selectedId: ''
        });
        
        console.log('updated group:');
        console.log(updatedGroup);
      }
    }

    const removeGroup = (e) => {
      /**
       * The backend needs to delete this groupchat from the
       * chat histories of everyone that is on this group
       * 
       * Do this before removing the chat from the admin's chat
       */

      this.setState({
        chats: this.state.chats.filter(chat => chat.props['chatId'] != e.target.id),
        groups: this.state.groups.filter(group => group.props['chatId'] != e.target.id)
      });
    }

    const personSearch = () => {
      var searchInput = document.getElementById('chatSearch').value;
      console.log('search input:');
      console.log(searchInput);

      if (searchInput != '') {
        this.setState({
          personSearch: true,
          personSearchInput: searchInput
        });
      }else {
        this.setState({
          personSearch: false,
          personSearchInput: searchInput
        });
      }
    }

    const groupSearch = () => {
      var searchInput = document.getElementById('groupSearch').value;
      console.log('search input:');
      console.log(searchInput);

      if (searchInput != '') {
        this.setState({
          groupSearch: true,
          groupSearchInput: searchInput
        });
      }else {
        this.setState({
          groupSearch: false,
          groupSearchInput: searchInput
        });
      }
    }

    return (
      <Container className='center' style={{minHeight: "100vh"}}>
        <Row className='centerMe chat-panel' style={{width:'100%'}}>
          <Col xs={0} sm={0} md={3} lg={4} xl={4}>
              <div className='toggle'>
                  <div className="menu-btn" id='menu-btn' onClick={toggle}>
                      <div className="menu-btn__burger"></div>
                  </div>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Row className='toggle-content' id='toggle-content' style={{margin:'auto', padding:'0px'}}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className='content-item text-center' id='content-item' style={{margin:'auto', padding:'0px'}}>
                          <Button onClick={GenerateBots} style={{width:'100%'}}>Generate Bots to chat to</Button>
                          <Button variant="dark" onClick={handleShow} style={{width:'100%'}}>
                              New Chat
                          </Button>
                          <Button variant="dark" onClick={handleShowGroup} style={{width:'100%'}}>
                              Join group
                          </Button>
                          <Button variant="dark" onClick={handleShowGroupAdmin} style={{width:'100%'}}>
                              Delete group
                          </Button>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className='content-item chats-panel' id='content-item' style={{margin:'auto', padding:'0px'}}>
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
                        </Col>
                    </Row>
                  </Col>
              </div>
          </Col>
          <Col xs={12} sm={12} md={9} lg={8} xl={8} style={{borderTopRightRadius:'20px', borderBottomRightRadius: '20px'}}>
            <Row style={{borderTopRightRadius:'20px', borderBottomRightRadius: '20px'}}>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{ height: "100px" }}
              >
                <Row
                  className='chatBorder'
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#9CC3D5FF",
                    margin:'0px', 
                    borderTopRightRadius:'20px',
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
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Type a message..."
                          id="my-message2"
                        />
                        <InputGroup.Append>
                          <Button
                            variant="dark"
                            onClick={message2}
                          >
                            <i className="fa fa-paper-plane icon" style={{color:'white', width:'30px'}}></i>
                          </Button>
                        </InputGroup.Append>
                    </InputGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{ height: "430px" }}
              >
                <div
                className='chat-backdrop'
                  style={{
                    height: "100%",
                    width: "100%",
                    overflowY: "scroll"
                  }}
                >
                  {this.state.activeChat.map((message) => (
                    <div
                      className="message"
                      style={{
                        marginLeft:
                          message.props["personId"] == this.state.personId
                            ? "auto"
                            : "5px",
                          backgroundColor:
                          message.props["personId"] == this.state.personId
                          ? '#0063B2FF'
                          : '#9CC3D5FF',
                      }}
                    >
                      {message}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row>
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
                  height: "70px",
                }}
              >
                <div
                  className='chatBorder'
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#9CC3D5FF",
                    borderBottomRightRadius: '20px',
                    padding: '15px'
                  }}
                >
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Type a message..."
                      id="my-message"
                      style={{borderTopLeftRadius:'1.5rem', borderBottomLeftRadius:'1.5rem'}}
                    />
                    <InputGroup.Append>
                      <Button
                        variant="dark"
                        onClick={message}
                        style={{borderTopRightRadius:'1.5rem', borderBottomRightRadius:'1.5rem'}}
                      >
                        <i className="fa fa-paper-plane icon" style={{color:'white', width:'30px'}}></i>
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      {/* Modal used to start a chat */}
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
                  <input style={{width:'100%'}} id='chatSearch' placeholder='search for a person...' onChange={personSearch}></input>
                  {this.state.people.filter(this.state.personSearch == true ? (p => p.props['personName'].toLowerCase().includes(this.state.personSearchInput.toLowerCase())):(p => p == p))
                  .map((person) => (
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Checkbox disabled={person.props["personId"] != this.state.selectedId && this.state.selected == 1 && this.state.groupChat == false} id={person.props["personId"]} onClick={personSelect} aria-label="Checkbox for following text input" />
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
      {/* Modal used to start a chat */}

      {/* Modal used to join group */}
      <Modal show={this.state.showGroup} onHide={handleCloseGroup} centered>
            <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
              Join group
            </Modal.Header>
            <Modal.Body style={{backgroundColor:'#ffffff'}}>
                <div className='icons text-center' style={{height:'400px', overflowY:'scroll'}}>
                  <input style={{width:'100%'}} id='groupSearch' placeholder='search for a person...' onChange={groupSearch}></input>
                  {this.state.groups.filter(this.state.groupSearch == true ? (g => g.props['people'][0].props['personName'].toLowerCase().includes(this.state.groupSearchInput.toLowerCase())):(g => g == g))
                  .map((chat) => (
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Checkbox disabled={chat.props["chatId"] != this.state.selectedId && this.state.selected == 1} id={chat.props["chatId"]} onClick={groupSelect} aria-label="Checkbox for following text input" />
                      </InputGroup.Prepend>
                      {chat}
                    </InputGroup>
                  ))}
                </div>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor:'#faf6ee'}}>
            <Button variant="primary" onClick={joinGroup}>
                Join
            </Button>
            </Modal.Footer>
        </Modal>
      {/* Modal used to join group  */}

      {/* Modal used to delete group */}
      <Modal show={this.state.showGroupAdmin} onHide={handleCloseGroupAdmin} centered>
            <Modal.Header closeButton style={{backgroundColor:'#faf6ee'}}>
              Delete group
            </Modal.Header>
            <Modal.Body style={{backgroundColor:'#ffffff'}}>
                <div className='icons text-center' style={{height:'400px', overflowY:'scroll'}}>
                  {this.state.groups.filter(chat => chat.props['adminIds'].includes(this.state.personId)).map((chat) => (
                      <div key={chat.props['chatId']}>
                        {chat}
                        <Button style={{width:'100%'}} id={chat.props["id"]} onClick={removeGroup}>Delete</Button>
                      </div>
                  ))}
                </div>
            </Modal.Body>
        </Modal>
      {/* Modal used to delete group  */}
      </Container>
    );
  }
}

export default Chat;
