import React, { Component } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Message from "./message";
import "./messaging.css";
import '../sidepanel/style.css';

class Chat extends Component {
  state = {
    personId: 1,
    personId2: 2,
    messages: [],
    time: "eh-time",
    i: 0,
  };

  render() {
    const message = () => {
      const messageText = document.getElementById("my-message").value;
      const messageId = Math.random();

      this.setState({
        messages: [
          ...this.state.messages,
          <Message
            time={this.state.time}
            personId={this.state.personId}
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

    let menuOpen = false;

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

    return (
      <Container fluid style={{ position: "relative", minHeight: "100vh", margin:'0px', padding:'0px' }}>
        <Row style={{margin:'0px', padding:'0px'}}>
          <Col xs={0} sm={0} md={6} lg={6} xl={6} style={{margin:'0px', padding:'0px'}}>
            <div className='toggle'>
                <div className="menu-btn" id='menu-btn' onClick={toggle}>
                    <div className="menu-btn__burger"></div>
                </div>
                <div className='toggle-content' id='toggle-content'>
                    <div className='content-item' id='content-item'>
                        Content item
                    </div>
                </div>
            </div>
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
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "green",
                  }}
                >
                  <h3>Other Person: </h3>
                  <br />
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
                  {this.state.messages.map((message) => (
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
