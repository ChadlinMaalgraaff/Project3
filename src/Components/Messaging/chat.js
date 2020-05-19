import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";

class Chat extends Component {
  render() {
    return (
    <Container style={{position:'relative', minHeight:'100vh'}}>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{height:'10vh'}}
          >
            <div style={{height:'100%', width:'100%', backgroundColor:'green'}}>
              Top
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
            style={{height:'80vh'}}
          >
            <div style={{height:'100%', width:'100%', backgroundColor:'yellow'}}>
              Middle
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
            style={{position:'absolute', bottom: '0px', width:'100%', height:'10vh'}}
          >
            <div style={{height:'100%', width:'100%', backgroundColor:'red'}}>
              Bottom
            </div>
          </Col>
        </Row>
    </Container>
    );
  }
}

export default Chat;
